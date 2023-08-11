type Method = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";

export interface RequestOptions {
    /**
     * 请求任务ID，一般在过滤重复请求，中止请求时使用
     */
    task_id?: string;
    /**
     * 自定义请求前拦截
     */
    before?: Function;
    /**
     * 自定义请求后拦截
     */
    after?: Function;
    /**
     * 自定义请求头
     */
    header?: object;
    /**
     * 请求方式
     */
    method?: Method;
    /**
     * 请求超时时间
     */
    timeout?: number;
    /**
     * 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse
     */
    dataType?: string | 'json' | '其他';
    /**
     * 设置响应的数据类型。合法值：`text`、`arraybuffer`
     */
    responseType?: string | 'text' | 'arraybuffer';
    /**
     * 验证 ssl 证书
     */
    sslVerify?: boolean;
    /**
     * 跨域请求时是否携带凭证（cookies）
     */
    withCredentials?: boolean;
    /**
     * DNS解析时优先使用ipv4
     */
    firstIpv4?: boolean;
    /**
     * 请求失败自动重试次数
     */
    retryCount?: number;
    /**
     * 请求过程是否显示loading
     * + `1.3.0` 及以上版本支持
     */
    loading?: boolean;
    /**
     * 请求中loading弹窗的提示文本
     * + `1.3.0` 及以上版本支持
     */
    loadingText?: string;
    /**
     * 自定义请求域名，用于设置单次请求的域名地址，常用于上传下载场景。
     * + `1.4.10` 及以上版本支持
     */
    domain?: string;
    /**
     * 是否自动携带token，默认为 `true`
     * + `1.6.3` 及以上版本支持
     */
    autoTakeToken?: boolean;
    /**
     * 是否返回请求原始响应内容，默认为 `false`
     * + 为 `true` 时，返回的响应内容为平台请求API返回的原始响应内容，包含响应头、响应状态码等信息
     * + `1.8.0` 及以上版本支持
     */
    originalResponse?: boolean;
};

/**
 * 请求前回调
 */
export interface BeforeRequestCallbackResult {
    data?: any;
    header?: any;
    method?: Method;
    url?: string;
};

/**
 * 请求后回调
 */
export interface AfterRequestCallbackResult {
    data?: any;
    cookie?: any;
    errMsg?: string;
    header?: any;
    statusCode?: number;
}

/**
 * 请求成功回调
 * + `1.7.0` 及以上版本支持
 */
export interface RequestSuccessCallbackResult {
    data: string | AnyObject | ArrayBuffer;
    cookies: string [];
    header: any;
    statusCode: number;
}

/**
 * 请求失败回调或者请求完成回调
 * + `1.7.0` 及以上版本支持
 */
export interface GeneralCallbackResult {
    errMsg: string;
}

/**
 * 请求任务
 * + `1.7.0` 及以上版本支持
 */
export interface RequestTask {
    /**
     * 中断请求任务
     * @example
     * ```javascript
     * const task = request({
     *   url: 'https://test.com',
     *  success: (response) => {
     *    console.log(response);
     * }
     * });
     * task.abort();
     * ```
     */
    abort: () => void;
    /**
     * 监听 HTTP Response Header 事件 
     * @param callback - 回调函数
     * @returns
     * + `1.7.0` 及以上版本支持
     * + 仅 `微信小程序` 平台支持，[文档](https://developers.weixin.qq.com/miniprogram/dev/api/RequestTask.onHeadersReceived.html)
     * @example
     * ```javascript
     * request({
     *    url: 'https://test.com',
     *   success: (response) => {
     *      console.log(response);
     *  }
     * }).onHeadersReceived((response) => {
     *   console.log(response);
     * });
     * ```
     */
    onHeadersReceived?: (callback: (result: GeneralCallbackResult) => void) => void;
    /**
     * 取消监听 HTTP Response Header 事件 
     * @param callback - 回调函数
     * @returns
     * + `1.7.0` 及以上版本支持 
     * + 仅 `微信小程序` 平台支持，[文档](https://developers.weixin.qq.com/miniprogram/dev/api/RequestTask.offHeadersReceived.html)
     * @example
     * ```javascript
     * request({
     *   url: 'https://test.com',
     *  success: (response) => {
     *    console.log(response);
     * }
     * }).onHeadersReceived((response) => {
     *  console.log(response);
     * }).offHeadersReceived((response) => {
     * console.log(response);
     * });
     * ```
     */
    offHeadersReceived?: (callback: (result: GeneralCallbackResult) => void) => void;
}