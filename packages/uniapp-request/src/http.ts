import { loading } from './utils/prompt';
import qs from 'qs';
import type { Config } from './types/config';
import { useConfig } from './utils/config';
import type { RequestOptions } from './types/request';

/**
 * @param {number} times 重试次数
 * @param {number} maximum_offretry 最大等待秒数
 * @returns {number}
 * 指数退避算法简介：
 * 为了解决如何设置适当的重传等待时间而存在的算法，基本流程如下：
 * - 1.客户端发起请求
 * - 2.请求失败，等待1 + random_number_milliseconds秒后重试请求。
 * - 3.请求失败，等待2 + random_number_milliseconds秒后重试请求。
 * - 4.请求失败，等待4 + random_number_milliseconds秒后重试请求。
 * - 5.以此类推，直至达到设置的等待时间上限为止结束请求，具体算法公式如下：
 *  Math.min((2 ** n + ranom_number_milliseconds), maxium_backoff)  
 * 上述的random_number_milliseconds为1到1000的随机毫秒数
 */
const makeRetryTimeout = (times: number, maximum_offretry: number): number => {
	const random_number_milliseconds = Math.floor(Math.random() * 1000);
	return Math.min(Math.pow(2, times) * 1000 + random_number_milliseconds, maximum_offretry);
}

/**
 * 网络请求库封装
 * @public
 */
export class Http {
    /**
     * 当前请求任务
     */
    private currentRequestTask: UniApp.RequestTask = {
        abort: () => {},
        onHeadersReceived: () => {},
        offHeadersReceived: () => {}
    };
    private requestTasksName = 'LWU-REQUEST-TASKS';
    /**
     * 请求锁
     */
    private lock: boolean = true;
    /**
     * 请求列表
     */
    private pending: Function[] = [];
    /**
     * 请求失败自动重试次数
     */
    private retryCount: number = 3;
    /**
     * 请求失败用来生成重试时间上限（指数退避算法需要），单位秒
     */
    private retryMaximum: number = 64;
    /**
     * 重试等待时间列表
     */
    private retryTimeout: (number | undefined)[] = [];
    /**
     * 重试等待时间上限
     */
    private retryDeadline: number = 10000;
    /**
     * 配置信息
     */
    private config: Config = {
        baseUrl: {
            pro: '',
            dev: ''
        },
        /**
         * 业务错误代码拦截处理程序，请根据业务实际情况灵活设置
         * @param code 
         * @param errMsg 
         * @returns 
         */
        errorHandleByCode: (code: number, errMsg?: string) => {}
    };

    constructor(config: Config) {
        this.config = {
            ...useConfig(config),
        };

        if (!this.config.retry) {
            this.retryCount = 0;
        } else {
            if (this.config.retryCountAutoOffRetry) {
                this.retryMaximum = (this.config.retryMaximum as number) * 1000;
                this.retryTimeout = [];
                this.retryDeadline = config.retryDeadline as number;
                
                for (let i = 0; i < this.retryCount; i++) {
                    if (this.retryDeadline < 0) {
                        break;
                    }
                    const timeout = makeRetryTimeout(i, this.retryMaximum);
                    this.retryDeadline -= timeout;
                    this.retryTimeout.push(timeout);
                }

                this.retryCount = this.retryTimeout.length;
            }
        }
    }

    /**
     * 请求失败的错误统一处理
     * @param code - 错误码
     * @param message - 自定义错误信息 
     */
    private handleError(code: number, message: string = ''): void {
        // 调用错误状态码处理程序
        this.config.errorHandleByCode(code, message);
    }

    private interceptor(url: string, before: Function | undefined, after: Function | undefined) {
        uni.addInterceptor('request', {
            invoke: (args) => {
                // 请求前拦截处理
                if (this.config.debug) {
                    console.warn(`【LwuRequest Debug:请求拦截】${JSON.stringify(args)}`);
                }

                if (this.config.loading) {
                    loading({ title: this.config.loadingText ?? '请求中...' });
                }

                if (args?.header?.contentType) {
                    args.header['content-type'] = args.header.contentType;
                    delete args.header.contentType;
                }

                // 拼接baseURI
                let baseURI: string = '';
                let debug: boolean = false;
                if (process.env.NODE_ENV === 'development') {
                    baseURI = this.config.baseUrl.dev;
                    debug = this.config.debug as boolean;
                } else {
                    baseURI = this.config.baseUrl.pro;
                }

                let reqUrl = `${baseURI}${url}`;
                if (args.method === 'GET') {
                    args.data = qs.stringify(args.data);
                    args.url = `${reqUrl}?${args.data}`;
                } else {
                    args.url = reqUrl;
                }

                // 判断是否存在token，如果存在则在请求头统一添加token，token获取从config配置获取
                const token = uni.getStorageSync(this.config.tokenStorageKeyName as string);

                if (token) {
                    if (this.config.takeTokenMethod === 'header') {
                        args.header[this.config.takenTokenKeyName as string] = token;
                    }

                    if (this,this.config.takeTokenMethod === 'body') {
                        args.data[this.config.takenTokenKeyName as string] = token;
                    }
                }

                // 请求前自定义拦截
                if (before) {
                    before();
                }
            },
            // 响应拦截
            success: (args: UniApp.RequestSuccessCallbackResult) => {
                this.handleError(args.statusCode, (args.data as AnyObject)[this.config.requestSuccessResponseMsgName as string]);

                if (this.config.debug) {
                    console.warn(`【LwuRequest Debug:响应拦截】${JSON.stringify(args)}`);
                }   

                if (after) {
                    after();
                }
            },
            fail: (err: UniApp.GeneralCallbackResult) => {
                if (this.config.debug) {
                    console.warn(`【LwuRequest Debug:请求拦截失败】${JSON.stringify(err)}`);
                }
            },
            complete: (res: UniApp.GeneralCallbackResult) => {
                uni.hideLoading();
                if (this.config.debug) {
                    console.warn(`【LwuRequest Debug:请求拦截完成】${JSON.stringify(res)}`);
                }
            }
        });
    }

    /**
     * 刷新token处理
     */
    private refreshToken() {
        if (this.config.refreshTokenHandle) {
            this.config.refreshTokenHandle()
                .then(() => {
                    // 重新执行业务请求
                    uni.getStorageSync('LWU-REQUEST-CALLBACK')((callback: () => void) => {
                        callback();
                    })
                })
                .catch(() => {
                    // token失效
                    this.handleError(this.config.tokenExpiredCode as number);
                });
        }
    }

    public request(url: string, data: object = {}, options: RequestOptions = {
        header: {},
        method: this.config.method,
        timeout: this.config.timeout,
        dataType: this.config.dataType,
        responseType: this.config.responseType,
        sslVerify: this.config.sslVerify,
        withCredentials: this.config.withCredentials,
        firstIpv4: this.config.firstIpv4,
        retryCount: this.config.retryCount
    }) {
        // 判断该请求队列是否存在，如果存在则中断请求
        const requestTasks = uni.getStorageSync(this.requestTasksName);

        if (options?.task_id && requestTasks[options?.task_id]) {
            if (this.config.debug) {
                console.warn(`【LwuRequest Debug】请求ID${options.task_id}有重复项已自动过滤`);
            }

            requestTasks[options?.task_id]?.abort();
        }

        return new Promise((resolve, reject) => {
            // 拦截器
            this.interceptor(url, options.before, options.after);
            // 发起请求
            this.currentRequestTask = uni.request({
                url: url,
                data: data,
                header: options.header,
                method: options.method,
                timeout: options.timeout,
                dataType: options.dataType,
                responseType: options.responseType,
                sslVerify: options.sslVerify,
                withCredentials: options.withCredentials,
                firstIpv4: options.firstIpv4,
                success: (res: UniApp.RequestSuccessCallbackResult) => {
                    if (res.statusCode !== this.config.tokenExpiredCode) {
                        resolve(res.data);
                    } else {
                        // 刷新token
                        this.refreshToken();
                        uni.setStorageSync('LWU-REQUEST-CALLBACK', () => {
                            resolve(this.request(url, data, options));
                        });
                    }
                },
                fail: (err: UniApp.GeneralCallbackResult) => {
                    this.retryCount = options.retryCount ?? 3;

                    if (this.retryCount === 0) {
                        reject(err);
                    } else {
                        if (this.config.debug) {
                            console.warn(`【LwuRequest Debug】自动重试次数：${this.retryCount}`);
                        }
                        this.retryCount--;
                        setTimeout(this.request, this.retryTimeout.shift());
                        // 网络异常或者断网处理
                        this.config.networkExceptionHandle && this.config.networkExceptionHandle();
                    }
                }
            });

            // 判断是否设置请求队列ID
            if (options?.task_id) {
                // 当前请求存入缓存
                let tasks: UniApp.RequestTask[] = [];
                tasks[options?.task_id as any] = this.currentRequestTask;
                uni.setStorageSync(this.requestTasksName, tasks);
            }
        });
    }

    public get(url: string, data: object = {}, options: RequestOptions = {}) {
        return this.request(url, data, {
            method: 'GET',
            ...options
        });
    }

    public post(url: string, data: object = {}, options: RequestOptions = {}) {
        return this.request(url, data, {
            method: 'POST',
            ...options
        });
    }

    public put(url: string, data: object = {}, options: RequestOptions = {}) {
        return this.request(url, data, {
            method: 'POST',
            ...options
        });
    }

    public delete(url: string, data: object = {}, options: RequestOptions = {}) {
        return this.request(url, data, {
            method: 'DELETE',
            ...options
        });
    }

    /**
     * 中断请求，不传 `task_id` 时默认中断当前任务
     * @param task_id 
     */
    public abort(task_id: string = '') {
        const requestTask = uni.getStorageSync(this.requestTasksName);

        if (requestTask[task_id]) {
            requestTask[task_id].abort();
        } else {
            this.currentRequestTask.abort();
        }
    }
}