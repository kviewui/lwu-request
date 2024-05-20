import path from 'path';
import type { Config, RequestOptions } from '../types';
import { loading } from '../utils/prompt';
import { CONNECT_ERROR_CODE, NETWORK_TIMEOUT_CODE, URL_NOT_FOUND_CODE, NETWORK_FAILURE_CODE } from './constant';

/**
 * 对象转query string的参数字符串
 * @param obj 需要转化的对象参数
 */
export const objToQueryString = (obj: object): string => {
    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj)
            .map((key) => `${key}=${encodeURIComponent((obj as any)[key])}`)
            .join('&');
    }

    return obj;
}

interface Params extends RequestOptions {
    url?: string;
    [key: string]: any;
};

export function interceptor(chain: any, params: Params, config: Config) {
    let timer: string | number | NodeJS.Timeout | undefined;

    /**
     * 请求失败的错误统一处理
     * @param code - 错误码
     * @param message - 自定义错误信息
     */
    const handleError = (code: number, message: string = '', reject?: (reason?: any) => void): void => {
        /**
         * 调用错误状态码处理程序
         */
        config.errorHandleByCode && config.errorHandleByCode(code, message, reject);
        // if (code === CONNECT_ERROR_CODE) {
        //     // 客户端断网处理
        //     if (config.networkExceptionHandle) {
        //         console.log('断网自定义处理1111');
        //         config.networkExceptionHandle(code);
        //     }
        // } else {
        //     config.errorHandleByCode && config.errorHandleByCode(code, message);
        // }
    }

    const invoke = (options: {
        // method: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
        method: string;
        data: any;
        header: any;
        customData: any;
        url: string
    }, reject?: (reason?: any) => void) => {
        // 请求前拦截处理
        if (config.debug) {
            console.warn(`【LwuRequest Debug】请求拦截:${JSON.stringify(options)}`);
        }

        const isLoading = params.loading ?? config.loading;
        const loadingText = params.loadingText ?? config.loadingText;

        if (isLoading) {
            timer = setTimeout(() => {
                loading({ title: loadingText ?? '请求中...' });
            }, config.loadingStartTime);
        }

        if (options?.header?.contentType) {
            options.header['content-type'] = options.header.contentType;
            delete options.header.contentType;
        }

        // 拼接baseURI
        let baseURI: string = '';
        if (process.env.NODE_ENV === 'development') {
            baseURI = config.baseUrl.dev;
            // debug = this.config.debug as boolean;
        } else {
            baseURI = config.baseUrl.pro;
        }

        // if (params.domain) {
        //     baseURI = params.domain;
        // }
        let reqUrl = `${baseURI}${params.url}`;
        if (params.url && (params.url?.indexOf('http://') > -1 || params.url?.indexOf('https://') > -1)) {
            reqUrl = params.url;
        }
        if (options.method === 'GET') {
            options.data = config.buildQueryString && config.buildQueryString(options.data as object)
                ? config.buildQueryString(options.data as object)
                // : new URLSearchParams(Object.entries(args.data)).toString();
                : objToQueryString(options.data as object);
            options.url = `${reqUrl}${options.data ? `?${options.data}` : ''}`;
        } else {
            options.url = reqUrl;
        }

        // 请求前自定义拦截
        // params.before && params.before();
        if (params.before && params.before(options)) {
            options = params.before(options, reject);
        }

        return chain.request(options);
    };

    const success = (response: UniApp.RequestSuccessCallbackResult, reject?: (reason?: any) => void) => {
        if (timer) {
            clearTimeout(timer as number);
        }
        handleError(response.statusCode, (response.data as AnyObject)[config.requestSuccessResponseMsgName as string]);

        // config.apiErrorInterception && config.apiErrorInterception(response.data, response);

        if (config.debug) {
            console.warn(`【LwuRequest Debug】响应拦截:${JSON.stringify(response)}`);
        }

        if (params.after) {
            response = params.after(response, reject);
        }

        return response;
    };

    const fail = (err: UniApp.GeneralCallbackResult) => {
        if (timer) {
            clearTimeout(timer as number);
        }
        if (err.errMsg === 'request:fail') {
            // 获取网络状态
            uni.getNetworkType({
                success: (res) => {
                    if (res.networkType === 'none') {
                        handleError(CONNECT_ERROR_CODE, err.errMsg);
                    } else {
                        handleError(NETWORK_FAILURE_CODE, JSON.stringify(err));
                    }
                },
                fail: () => {
                    handleError(NETWORK_FAILURE_CODE, JSON.stringify(err));
                }
            })
        } else if (err.errMsg === 'request:fail timeout') {
            // 请求超时
            handleError(NETWORK_TIMEOUT_CODE, err.errMsg);
        } else {
            handleError(URL_NOT_FOUND_CODE, err.errMsg);
        }
        if (config.debug) {
            console.warn(`【LwuRequest Debug】请求拦截失败:${JSON.stringify(err)}`);
        }
        return err;
    };

    const complete = (res: UniApp.GeneralCallbackResult) => {
        if (timer) {
            clearTimeout(timer as number);
        }

        const isLoading = params.loading ?? config.loading;
        if (isLoading) {
            uni.hideLoading();
        }

        if (res.errMsg === 'request:fail') {
            config.networkExceptionHandle && config.networkExceptionHandle();
        }
        if (config.debug) {
            console.warn(`【LwuRequest Debug】请求拦截完成:${JSON.stringify(res)}`);
        }

    };

    return {
        request: invoke,
        response: success,
        fail: fail,
        complete: complete
    }
};
