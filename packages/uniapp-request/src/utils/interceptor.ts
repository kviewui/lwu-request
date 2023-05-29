import type { Config, RequestOptions } from '../types';
import { loading } from '../utils/prompt';

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
    /**
     * 请求失败的错误统一处理
     * @param code - 错误码
     * @param message - 自定义错误信息 
     */
    const handleError = (code: number, message: string = ''): void => {
        // 调用错误状态码处理程序
        config.errorHandleByCode && config.errorHandleByCode(code, message);
    }

    const invoke = (options: { header: { [x: string]: any; contentType: any; }; method: string; data: string | object; url: string; }) => {
        // 请求前拦截处理
        if (config.debug) {
            console.warn(`【LwuRequest Debug:请求拦截】${JSON.stringify(options)}`);
        }

        const isLoading = params.loading ?? config.loading;
        const loadingText = params.loadingText ?? config.loadingText;

        if (isLoading) {
            loading({ title: loadingText ?? '请求中...' });
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
        if (options.method === 'GET') {
            options.data = config.buildQueryString && config.buildQueryString(options.data as object)
                ? config.buildQueryString(options.data as object)
                // : new URLSearchParams(Object.entries(args.data)).toString();
                : objToQueryString(options.data as object);
            options.url = `${reqUrl}?${options.data}`;
        } else {
            options.url = reqUrl;
        }

        // 请求前自定义拦截
        params.before && params.before();

        return chain.request(options);
    };

    const success = (response: UniApp.RequestSuccessCallbackResult) => {
        handleError(response.statusCode, (response.data as AnyObject)[config.requestSuccessResponseMsgName as string]);

        // config.apiErrorInterception && config.apiErrorInterception(response.data, response);

        if (config.debug) {
            console.warn(`【LwuRequest Debug:响应拦截】${JSON.stringify(response)}`);
        }

        if (params.after) {
            params.after();
        }

        return response;
    };

    const fail = (err: UniApp.GeneralCallbackResult) => {
        handleError(404, err.errMsg);
        if (config.debug) {
            console.warn(`【LwuRequest Debug:请求拦截失败】${JSON.stringify(err)}`);
        }
        return err;
    };

    const complete = (res: UniApp.GeneralCallbackResult) => {
        uni.hideLoading();
        if (config.debug) {
            console.warn(`【LwuRequest Debug:请求拦截完成】${JSON.stringify(res)}`);
        }

    };

    return {
        request: invoke,
        response: success,
        fail: fail,
        complete: complete
    }
};