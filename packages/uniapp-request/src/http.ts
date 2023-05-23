import { loading, useConfig, interceptor } from './utils';
// import qs from 'qs';
import type { Config, RequestOptions, DownloadParams, UploadParams, DownloadSuccessResultCallback, UploadAliossOptions } from './types';
import UploadAlioss from './utils/alioss';

interface MultiOptions extends Config { };
interface MultiOptions extends RequestOptions { };

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
 * 对象转query string的参数字符串
 * @param obj 需要转化的对象参数
 */
const objToQueryString = (obj: object): string => {
    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj)
            .map((key) => `${key}=${encodeURIComponent((obj as any)[key])}`)
            .join('&');
    }

    return obj;
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
        abort: () => { },
        onHeadersReceived: () => { },
        offHeadersReceived: () => { }
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
     * 全局配置信息
     */
    private globalConfig: Config = {
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
        errorHandleByCode: (code: number, errMsg?: string) => { },
        /**
         * API错误拦截处理程序，请根据业务实际情况灵活设置
         * @param data 
         */
        apiErrorInterception: (data: any) => { },
    };

    /**
     * 请求配置信息
     */
    private reqConfig: RequestOptions = {};

    constructor(config: Config) {
        this.globalConfig = {
            ...useConfig(config),
        };

        this.reqConfig = {
            task_id: '',
            domain: '',
            ...this.globalConfig
        };

        if (!this.globalConfig.retry) {
            this.retryCount = 0;
        } else {
            if (this.globalConfig.retryCountAutoOffRetry) {
                this.retryMaximum = (this.globalConfig.retryMaximum as number) * 1000;
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
        this.globalConfig.errorHandleByCode && this.globalConfig.errorHandleByCode(code, message);
    }

    /**
     * 刷新token处理
     */
    private refreshToken() {
        if (this.globalConfig.refreshTokenHandle) {
            this.globalConfig.refreshTokenHandle()
                .then(() => {
                    // 重新执行业务请求
                    uni.getStorageSync('LWU-REQUEST-CALLBACK')((callback: () => void) => {
                        callback();
                    })
                })
                .catch(() => {
                    // token失效
                    this.handleError(this.globalConfig.tokenExpiredCode as number);
                });
        }
    }

    private beforeRequest(data: any = {}, options?: MultiOptions) {
        // 判断该请求队列是否存在，如果存在则中断请求
        const requestTasks = uni.getStorageSync(this.requestTasksName);

        if (options?.task_id && requestTasks[options?.task_id]) {
            if (this.globalConfig.debug) {
                console.warn(`【LwuRequest Debug】请求ID${options.task_id}有重复项已自动过滤`);
            }

            requestTasks[options?.task_id]?.abort();
        }

        return new Promise(async (resolve, reject) => {
            // 判断是否存在token，如果存在则在请求头统一添加token，token获取从config配置获取
            let token = uni.getStorageSync(this.globalConfig.tokenStorageKeyName as string);

            const setToken = () => {
                return new Promise((resolve, _) => {
                    token && resolve(token);

                    if (this.globalConfig.tokenValue) {
                        this.globalConfig.tokenValue().then(res => {
                            res && resolve(res);
                            resolve(false);
                        })
                    } else {
                        resolve('');
                    }
                });
            }

            setToken().then(getToken => {
                if (getToken && options) {
                    if (this.globalConfig.takeTokenMethod === 'header') {
                        options.header = options.header ?? {};
                        (options.header as any)[this.globalConfig?.takenTokenKeyName as string] = getToken;
                    }

                    if (this.globalConfig.takeTokenMethod === 'body') {
                        data[this.globalConfig.takenTokenKeyName as string] = getToken;
                    }
                }

                resolve(true);
            });
        });
    }

    public request(url: string, data: any = {}, options: RequestOptions) {
        const multiOptions = {
            ...this.reqConfig,
            ...options
        };
        console.log(multiOptions, '合并请求配置');

        return new Promise((resolve, reject) => {
            this.beforeRequest(data, {
                ...multiOptions,
                baseUrl: {
                    dev: this.globalConfig.baseUrl.dev,
                    pro: this.globalConfig.baseUrl.pro
                }
            }).then(() => {
                // 拦截器
                const chain = interceptor({
                    request: (options: any) => {
                        url = options.url;
                        return options;
                    },
                    response: (response: any) => {
                        return response;
                    }
                }, {
                    url: url,
                    ...options
                }, this.globalConfig);
                chain.request({
                    header: {
                        contentType: '',
                        ...options?.header
                    },
                    method: options?.method ?? 'GET',
                    data,
                    url
                });

                // 发起请求
                this.currentRequestTask = uni.request({
                    url: url,
                    data: data,
                    // header: reqHeader.header,
                    header: {
                        ...multiOptions.header
                    },
                    method: multiOptions.method as any,
                    timeout: multiOptions.timeout,
                    dataType: multiOptions.dataType,
                    responseType: multiOptions.responseType,
                    sslVerify: multiOptions.sslVerify,
                    withCredentials: multiOptions.withCredentials,
                    firstIpv4: multiOptions.firstIpv4,
                    success: (res: UniApp.RequestSuccessCallbackResult) => {
                        chain.response(res);

                        if (typeof this.globalConfig.xhrCode === 'undefined') {
                            this.globalConfig.apiErrorInterception && this.globalConfig.apiErrorInterception(res.data, res);
                        } else {
                            if (this.globalConfig.xhrCodeName && (res.data as any)[this.globalConfig.xhrCodeName] && (res.data as any)[this.globalConfig.xhrCodeName] !== this.globalConfig.xhrCode) {
                                this.globalConfig.apiErrorInterception && this.globalConfig.apiErrorInterception(res.data, res);
                                reject(res);
                            }
                        }

                        if (res.statusCode !== this.globalConfig.tokenExpiredCode) {
                            resolve(res.data);
                        } else {
                            // 刷新token
                            this.refreshToken();
                            uni.setStorageSync('LWU-REQUEST-CALLBACK', () => {
                                resolve(this.request(url, data, multiOptions));
                            });
                        }
                    },
                    fail: (err: UniApp.GeneralCallbackResult) => {
                        chain.fail(err);
                        this.retryCount = multiOptions.retryCount ?? 3;

                        if (this.retryCount === 0) {
                            reject(err);
                        } else {
                            if (this.globalConfig.debug) {
                                console.warn(`【LwuRequest Debug】自动重试次数：${this.retryCount}`);
                            }
                            this.retryCount--;
                            setTimeout(this.request, this.retryTimeout.shift());
                            // 网络异常或者断网处理
                            this.globalConfig.networkExceptionHandle && this.globalConfig.networkExceptionHandle();
                        }
                    },
                    complete: (res: UniApp.GeneralCallbackResult) => {
                        chain.complete(res);
                        // uni.removeInterceptor('request');
                    }
                });

                // 判断是否设置请求队列ID
                if (multiOptions?.task_id) {
                    // 当前请求存入缓存
                    let tasks: UniApp.RequestTask[] = [];
                    tasks[multiOptions?.task_id as any] = this.currentRequestTask;
                    uni.setStorageSync(this.requestTasksName, tasks);
                }
            });
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
     * 设置请求配置信息，方便链式调用
     * @param options 
     */
    public config(options: RequestOptions = {}) {
        this.reqConfig = {
            ...this.reqConfig,
            ...options
        };

        return this;
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

    /**
     * 文件下载
     * @param params 
     */
    public download(params: DownloadParams) {
        const multiOptions = {
            ...this.reqConfig,
            ...params,
            method: 'DOWNLOAD' as any
        };
        // 拦截器
        const chain = interceptor({
            request: (options: any) => {
                params.url = options.url;
                return options;
            },
            response: (response: any) => {
                return response;
            }
        }, {
            ...multiOptions
        }, this.globalConfig);
        const header = {
            contentType: '',
            ...multiOptions?.header
        };
        chain.request({
            header: header,
            method: 'DOWNLOAD',
            data: '',
            url: params.url
        });
        return uni.downloadFile({
            url: params.url,
            header: header,
            timeout: multiOptions.timeout ?? 60000,
            filePath: multiOptions.filePath,
            success: (res: DownloadSuccessResultCallback) => {
                chain.response({
                    ...res,
                    data: '',
                    header: {},
                    cookies: []
                });
                params.success && params.success(res);
            },
            fail: (fail: UniApp.GeneralCallbackResult) => {
                chain.fail(fail);
                params.fail && params.fail(fail);
            },
            complete: (res: UniApp.GeneralCallbackResult) => {
                chain.complete(res);
                params.complete && params.complete(res);
            }
        });
    }

    /**
     * 普通文件上传
     * @param params 
     */
    public upload(params: UploadParams) {
        const multiOptions = {
            ...this.reqConfig,
            ...params,
            method: 'UPLOAD' as any
        };
        // 拦截器
        const chain = interceptor({
            request: (options: any) => {
                params.url = options.url;
                return options;
            },
            response: (response: any) => {
                return response;
            }
        }, {
            ...multiOptions
        }, this.globalConfig);
        const header = {
            contentType: '',
            ...multiOptions?.header
        };
        chain.request({
            header: header,
            method: 'DOWNLOAD',
            data: '',
            url: params.url
        });

        return uni.uploadFile({
            url: params.url,
            files: params.files,
            fileType: params.fileType,
            file: params.file,
            filePath: params.filePath,
            name: params.name,
            header: params.header,
            timeout: params.timeout,
            formData: params.formData,
            success: (res: UniApp.UploadFileSuccessCallbackResult) => {
                chain.response({
                    ...res,
                    data: '',
                    header: {},
                    cookies: []
                });
                params.success && params.success(res);
            },
            fail: (fail: UniApp.GeneralCallbackResult) => {
                chain.fail(fail);
                params.fail && params.fail(fail);
            },
            complete: (res: UniApp.GeneralCallbackResult) => {
                chain.complete(res);
                params.complete && params.complete(res);
            }
        });
    }

    /**
     * 阿里云OSS直传，同步上传
     * @param options 
     */
    public async uploadAliossSync(options: UploadAliossOptions) {

        const aliyunOSSUploader = new UploadAlioss({
            filePath: options.filePath,
            uploadDir: options.uploadDir,
            maxSize: options.maxSize,
            uploadImageUrl: options.uploadImageUrl,
            getOSSBySTS: options.getOSSBySTS,
            getPolicyBase64: options.getPolicyBase64,
            getSignature: options.getSignature
        });

        await aliyunOSSUploader.getOSSBySTSInfo();

        return await aliyunOSSUploader.uploadFile(options.filePath, options.uploadDir);
    }

    /**
     * 阿里云OSS直传，异步上传
     * @param options 
     */
    public uploadAlioss(options: UploadAliossOptions) {
        const aliyunOSSUploader = new UploadAlioss({
            filePath: options.filePath,
            uploadDir: options.uploadDir,
            maxSize: options.maxSize,
            uploadImageUrl: options.uploadImageUrl,
            getOSSBySTS: options.getOSSBySTS,
            getPolicyBase64: options.getPolicyBase64,
            getSignature: options.getSignature
        });

        aliyunOSSUploader.getOSSBySTSInfo().then(() => {
            return aliyunOSSUploader.uploadFile(options.filePath, options.uploadDir);
        });
    }
}

/**
 * 导出请求配置参数类型
 */
export * from './types';