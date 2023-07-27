import { RequestMethod, RequestSuccessCallbackResult, GeneralCallbackResult } from '../types';
import { Config } from '../types/config';

/**
 * 请求任务
 */
class RequestTask {
    private _task: any;
    constructor(task: any) {
        this._task = task;
    }

    abort() {
        if (!this._task) return;
        this._task.abort();
        this._task = null;
    }
}

/**
 * 解析响应头字符串
 */
function parseHeaders(headers: string) {
    const parsed: {
        [key: string]: string | string[];
    } = {};
    let key: string | number;
    let val: string;
    let i: number;

    if (!headers) return parsed;

    headers.split('\n').forEach((line: string) => {
        i = line.indexOf(':');
        key = line.substr(0, i).trim().toLowerCase();
        val = line.substr(i + 1).trim();

        if (key) {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
    });

    return parsed;
}

interface RequestOptions {
    url: string;
    data?: any;
    header?: any;
    method?: RequestMethod;
    dataType?: 'json' | '其他';
    responseType?: 'text' | 'arraybuffer';
    success?: (response: RequestSuccessCallbackResult) => void;
    fail?: (error: GeneralCallbackResult) => void;
    complete?: (result: GeneralCallbackResult) => void;
    timeout?: number;
    withCredentials?: boolean;
    sslVerify?: boolean;
    firstIpv4?: boolean;
}

/**
 * 发起网络请求 
 * @param options - 请求参数
 * @param options.url - 请求地址
 * @param env - 运行环境
 * @returns RequestTask
 * 
 * **示例代码**
 * 
 * ```typescript
 * request({
 *  url: 'https://www.example.com',
 *  data: {
 *      name: 'uniapp-request'
 *  },
 *  header: {
 *     'content-type': 'application/json'
 *  },
 *  method: 'POST',
 *  dataType: 'json',
 *  responseType: 'text',
 *  success: (response) => {
 *    console.log(response);
 *  },
 *  fail: (error) => {
 *   console.log(error);
 *  },
 *  complete: (result) => {
 *   console.log(result);
 *  },
 *  timeout: 0,
 *  withCredentials: false,
 *  sslVerify: true,
 *  firstIpv4: false
 * });
 * ```
 */
function request(options: RequestOptions = {
    url: '',
    data: {},
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: () => { },
    fail: () => { },
    complete: () => { },
    timeout: 0,
    withCredentials: false,
}): RequestTask {
    console.log('当前 h5 运行环境');
    let contentType = 'application/json';
    // 根据请求头设置 contentType
    if (options.header) {
        Object.keys(options.header).forEach((name: string) => {
            if (name.toLowerCase() === 'content-type') {
                contentType = options.header[name];
                if (contentType.indexOf('application/json') === 0) {
                    contentType = 'json';
                } else if (contentType.indexOf('application/x-www-form-urlencoded') === 0) {
                    contentType = 'urlencoded';
                } else {
                    contentType = 'string';
                }
            }
        });
    }

    // 根据请求方法和 contentType 确定是否需要序列化 data
    const needSerialize = options.method !== 'GET' && contentType !== 'json';
    if (needSerialize) {
        if (contentType === 'urlencoded') {
            options.data = Object.keys(options.data).map((key: string) => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`;
            }).join('&');
        } else if (contentType === 'string') {
            options.data = options.data.toString();
        }
    }

    let xhr = new XMLHttpRequest();
    const task = new RequestTask(xhr);

    xhr.open(options.method as string, options.url, true);

    // 设置请求头
    if (options.header) {
        Object.keys(options.header).forEach((name: string) => {
            xhr?.setRequestHeader(name, options.header[name]);
        });
    }

    let timer: string | number | NodeJS.Timeout | undefined;
    // 通过定时器设置超时
    if (options.timeout) {
        timer = setTimeout(() => {
            xhr.onabort = null;
            // 超时后中断请求
            task.abort();
            const error = {
                errMsg: 'request:fail timeout'
            };
            options.fail && options.fail(error);
        }, options.timeout);
    }

    // 设置响应头类型
    xhr.responseType = options.dataType as XMLHttpRequestResponseType || 'text';

    const complete = {
        errMsg: 'request:ok'
    };

    // 请求成功回调
    xhr.onload = () => {
        if (timer) clearTimeout(timer);
        if (xhr?.status === 200) {
            let responseData = xhr.response;
            // 判断是否需要对响应数据进行 JSON.parse
            if (options.dataType === 'json' && typeof xhr.response === 'string') {
                try {
                    responseData = JSON.parse(xhr.response);
                } catch (e) { }
            }
            const response = {
                data: responseData,
                statusCode: xhr.status,
                header: parseHeaders(xhr.getAllResponseHeaders()),
                errMsg: 'request:ok',
                cookies: []
            };
            options.success && options.success(response);
        } else {
            const error = {
                errMsg: `request:fail ${xhr?.status}`
            };
            options.fail && options.fail(error);
        }
        options.complete && options.complete(complete);
    };

    // 请求被中断
    xhr.onabort = () => {
        if (timer) clearTimeout(timer);
        const error = {
            errMsg: 'request:fail abort'
        };
        options.fail && options.fail(error);
        options.complete && options.complete(complete);
    }

    // 请求失败回调
    xhr.onerror = () => {
        if (timer) clearTimeout(timer);
        const error = {
            errMsg: 'request:fail'
        };
        options.fail && options.fail(error);
        options.complete && options.complete(complete);
    };

    // 请求结束回调
    xhr.onloadend = () => {
        options.complete && options.complete(complete);
    }

    // 设置 是否跨域携带 cookie
    xhr.withCredentials = options.withCredentials || false;

    // 发送请求
    xhr.send(options.data);

    return task;
}

/**
 * 创建请求 
 * @param options - 请求参数
 * @param env - 运行环境 
 * @returns RequestTask
 */
function createRequest(options: RequestOptions, env: Config['env'] = 'uniapp') {
    if (env === 'h5') {
        return request(options);
    } else if (env === 'mp-weixin') {
        return wx.request(options);
    }

    return uni.request(options);
}

export default createRequest;
