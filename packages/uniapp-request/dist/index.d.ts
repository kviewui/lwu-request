interface Config {
    baseUrl: {
        /**
         * 开发环境域名
         */
        dev: string;
        /**
         * 生产环境域名
         */
        pro: string;
    };
    /**
     * 调试模式，开启后控制台会显示内部调试打印信息
     */
    debug?: boolean;
    /**
     * 运行环境，有效值：`'h5'`、`'uniapp'`、`'mp-weixin'`，默认为 `'uniapp'`
     * + `h5`: 运行在浏览器环境，使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 发送请求
     * + `uniapp`: 运行在uniapp环境，使用 [`uni.request`](https://uniapp.dcloud.net.cn/api/request/request.html) 发送请求
     * + `mp-weixin`: 运行在微信小程序环境，使用 [`wx.request`](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html) 发送请求
     * + `1.7.0` 及以上版本支持
     */
    env?: 'h5' | 'uniapp' | 'mp-weixin';
    /**
     * 请求过程是否显示loading
     */
    loading?: boolean;
    /**
     * 请求中loading弹窗的提示文本，默认为 `'请求中...'`
     */
    loadingText?: string;
    /**
     * 自定义请求前拦截
     * + `1.3.12` 及以上版本支持。
     * + reject 参数需要 `v1.8.2` 及以后版本支持
     */
    before?: Function;
    /**
     * 自定义请求后拦截
     * + `1.3.12` 及以上版本支持。
     * + reject 参数需要 `v1.8.2` 及以后版本支持
     */
    after?: Function;
    /**
     * 自定义请求头信息
     * + `1.3.12` 及以上版本支持。
     */
    header?: object;
    /**
     * 请求超时时间，单位ms
     */
    timeout?: number;
    /**
     * 请求方式，有效值：`'GET'`、`'POST'`、`'PUT'`、`'DELETE'`、`'CONNECT'`、`'HEAD'`、`'OPTIONS'`、`'TRACE'`
     */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE';
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
     * 网络错误代码拦截处理程序，请根据业务实际情况灵活设置
     * + reject 参数需要 `v1.8.2` 及以后版本支持
     *
     * @param code http网络状态码，其中 `404` 为请求地址未找到、`408` 为请求超时、`1009` 为客户端网络不可用
     * @param errMsg
     * @returns
     */
    errorHandleByCode?: (code: number, errMsg?: string, reject?: (reason?: any) => void) => void;
    /**
     * API错误拦截处理程序，请根据业务实际情况灵活设置
     * + reject 参数需要 `v1.8.2` 及以后版本支持
     * @param data API返回内容
     * @param args uniapp请求API回调结果
     */
    apiErrorInterception?: (data: any, args?: UniApp.RequestSuccessCallbackResult, reject?: (reason?: any) => void) => void;
    /**
     * API成功状态码
     * + `1.2.0` 及以上版本支持
     * + 设置该参数后，API业务失败时将直接抛出异常，开发者需要在 `catch` 中捕获API返回的错误信息，或者在 `apiErrorInterception` 中统一捕获API返回的错误信息
     */
    xhrCode?: number | string;
    /**
     * 语义化接口响应状态码字段名称，一般为 `code`
     * + `1.2.0` 及以上版本支持
     */
    xhrCodeName?: string;
    /**
     * 网络异常或者断网处理程序，建议更新缓存中是否断网或者网络繁忙的标识以便前端页面展示没有网络或者断网的通用异常页面
     * + 保留参数，`v1.6.1` 版本开始断网判断通过 `errorHandleByCode` 处理，见[如何自定义断网场景](https://lwur.fdproxy.cn/advanced.html#如何自定义断网场景)
     * @returns
     */
    networkExceptionHandle?: (code?: number) => void;
    /**
     * 请求成功时接口响应描述信息字段名称，默认为 `'msg'`
     */
    requestSuccessResponseMsgName?: string;
    /**
     * 缓存中token字段名称，方便请求库从缓存获取token完成自动填充token
     */
    tokenStorageKeyName?: string;
    /**
     * 自定义获取task_id处理程序，通过promise返回最新task_id值即可
     * + `1.5.11` 及以上版本支持
     * @returns
     */
    taskIdValue?: (data: any, options?: object) => Promise<unknown>;
    /**
     * 自定义获取token处理程序，通过promise返回最新token值即可
     * + `1.0.2` 及以上版本支持
     * @returns
     */
    tokenValue?: () => Promise<unknown>;
    /**
     * 自定义构建URL参数方式，即用什么方式把请求的params对象数据转为`a=1&b=2`的格式，默认使用NodeJS内置对象 `URLSearchParams` 转化，可以自定义通过 `qs` 插件的方式转化
     * + `1.0.2` 及以上版本支持
     *
     * @example
     * ```ts
     * // qs 插件转化示例
     * import qs from 'qs';
     *
     * return qs.stringify(obj);
     * ```
     */
    buildQueryString?: (obj: object) => string;
    /**
     * 请求携带token的方式，有效值：`header`、`body`
     */
    takeTokenMethod?: 'header' | 'body';
    /**
     * 请求携带token的字段名称，header方式默认为 `Authorization`
     */
    takenTokenKeyName?: string;
    /**
     * 是否自动刷新token
     */
    autoRefreshToken?: boolean;
    /**
     * 自动刷新token程序，返回promise，`autoRefreshToken` 为 `true`时生效
     * + `refreshToken` 为旧的token返回
     */
    refreshTokenHandle?: (refreshToken?: string) => Promise<string>;
    /**
     * 自定义token失效的错误代码，便于请求库内部做自动刷新token判断
     */
    tokenExpiredCode?: number | string;
    /**
     * token失效错误代码类型，支持 `httpStatusCode` 和 `apiResponseCode`，默认为 `httpStatusCode`
     * + `httpStatusCode`: 原生http请求状态码
     * + `apiResponseCode`: 接口响应错误码
     *
     * + `1.5.11` 及以上版本支持
     */
    tokenExpiredCodeType?: 'httpStatusCode' | 'apiResponseCode';
    /**
     * 请求失败是否自动重试
     */
    retry?: boolean;
    /**
     * 请求失败自动重试次数
     */
    retryCount?: number;
    /**
     * 请求失败重试次数是否自动计算，失败重试次数上限依然是设置的retryCount值
     */
    retryCountAutoOffRetry?: boolean;
    /**
     * 请求失败用来生成重试时间上限（指数退避算法需要），单位秒
     */
    retryMaximum?: number;
    /**
     * 请求失败执行重试时间上限（指数退避算法需要），达到上限后不再重试
     */
    retryDeadline?: number;
    /**
     * `loading` 动画请求多久后开始展示，单位毫秒
     * + 仅支持请求库默认动画
     * + `1.7.0` 及以上版本支持
     */
    loadingStartTime?: number;
}

type Method = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
interface RequestOptions {
    /**
     * 请求任务ID，一般在过滤重复请求，中止请求时使用
     */
    task_id?: string;
    /**
     * 自定义请求前拦截
     * + reject 参数需要 `v1.8.2` 及以后版本支持
     */
    before?: Function;
    /**
     * 自定义请求后拦截
     * + reject 参数需要 `v1.8.2` 及以后版本支持
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
    /**
     * 发起请求时的自定义参数，一般在拦截器里面使用
     * + `v1.8.3` 及以上版本支持
     */
    customData?: any;
}
/**
 * 请求前回调
 */
interface BeforeRequestCallbackResult {
    data?: any;
    header?: any;
    method?: Method;
    url?: string;
}
/**
 * 请求后回调
 */
interface AfterRequestCallbackResult {
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
interface RequestSuccessCallbackResult {
    data: string | AnyObject | ArrayBuffer;
    cookies: string[];
    header: any;
    statusCode: number;
}
/**
 * 请求失败回调或者请求完成回调
 * + `1.7.0` 及以上版本支持
 */
interface GeneralCallbackResult {
    errMsg: string;
}
/**
 * 请求任务
 * + `1.7.0` 及以上版本支持
 */
interface RequestTask {
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

/**
 * 下载成功返回结果类型
 */
interface DownloadSuccessResultCallback extends UniApp.DownloadSuccessData {
    /**
     * 下载文件保存的路径（本地临时文件）。入参未指定 filePath 的情况下可用
     */
    apFilePath?: string;
    /**
     * 文件内容
     */
    fileContent?: Buffer;
}
/**
 * 下载参数类型
 */
interface DownloadParams {
    /**
     * 下载资源的 url
     */
    url: string;
    /**
     * HTTP 请求 Header, header 中不能设置 Referer。
     */
    header?: object;
    /**
     * 超时时间，单位 ms
     */
    timeout?: number;
    /**
     * 指定文件下载后存储的路径 (本地路径)
     */
    filePath?: string;
    /**
     * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
     */
    success?: (result: DownloadSuccessResultCallback) => void;
    /**
     * 接口调用失败的回调函数
     */
    fail?: (result: UniApp.GeneralCallbackResult) => void;
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (result: UniApp.GeneralCallbackResult) => void;
    /**
     * 自定义请求域名
     * + 设置该参数后，本次请求时全局配置的 `baseUrl` 将失效
     */
    domain?: string;
}

interface Files {
    name?: string;
    file?: File;
    uri: string;
}
interface UploadParams {
    /**
     * 开发者服务器 url
     */
    url: string;
    /**
     * 需要上传的文件列表。**使用 files 时，filePath 和 name 不生效**。
     */
    files: Files[];
    /**
     * 文件类型，image/video/audio
     */
    fileType?: 'image' | 'video' | 'audio';
    /**
     * 要上传的文件对象。
     */
    file?: File;
    /**
     * 要上传文件资源的路径。
     */
    filePath?: string;
    /**
     * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
     */
    name: string;
    /**
     * HTTP 请求 Header, header 中不能设置 Referer。
     */
    header?: object;
    /**
     * 超时时间，单位 ms
     */
    timeout?: number;
    /**
     * HTTP 请求中其他额外的 form data
     */
    formData?: Object;
    /**
     * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
     */
    success?: (result: UniApp.UploadFileSuccessCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    fail?: (result: UniApp.GeneralCallbackResult) => void;
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (result: UniApp.GeneralCallbackResult) => void;
    /**
     * 自定义请求域名
     * + 设置该参数后，本次请求时全局配置的 `baseUrl` 将失效
     */
    domain?: string;
}

/**
 * 后端STS临时授权返回类型
 */
interface GetOSSBySTSSuccessCallback {
    /**
     * STS临时授权的访问密钥AccessKey ID
     */
    access_key_id: string;
    /**
     * STS临时授权的访问密钥AccessKey Secret
     */
    access_key_secret: string;
    /**
     * STS临时授权的过期时间
     */
    expiration: string;
    /**
     * STS临时授权的安全令牌SecurityToken
     */
    security_token: string;
    [key: string]: any;
}
interface UploadAliossOptions {
    /**
     * 要上传文件资源的路径
     */
    filePath: string;
    /**
     * 文件上传的存储目录
     */
    uploadDir: string;
    /**
     * 限制上传文件的大小，单位为MB
     * + 默认值为 `15`
     */
    maxSize?: number;
    /**
     * 限制参数的生效时间，单位小时
     * + 默认值为 `1`
     */
    timeout?: number;
    /**
     * 上传的阿里云OSS地址
     * + 小程序后台需要同步添加上传合法域名
     */
    uploadImageUrl: string;
    /**
     * HTTP 请求中其他额外的 form data
     */
    formData?: object;
    /**
     * 获取OSS临时授权访问凭证信息
     */
    getOSSBySTS: () => Promise<GetOSSBySTSSuccessCallback>;
    /**
     * 获取签名的base64字符串
     */
    getPolicyBase64: () => string;
    /**
     * 获取OSS签名
     */
    getSignature: (policyBase64: string, accessKeySecret: string) => Promise<string>;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT';

/**
 * 网络请求库封装
 * @public
 */
declare class Http {
    /**
     * 当前请求任务
     */
    private currentRequestTask;
    private requestTasksName;
    /**
     * 请求锁
     */
    private lock;
    /**
     * 请求列表
     */
    private pending;
    /**
     * 请求失败自动重试次数
     */
    private retryCount;
    /**
     * 请求失败用来生成重试时间上限（指数退避算法需要），单位秒
     */
    private retryMaximum;
    /**
     * 重试等待时间列表
     */
    private retryTimeout;
    /**
     * 重试等待时间上限
     */
    private retryDeadline;
    /**
     * 全局配置信息
     */
    private globalConfig;
    /**
     * 请求配置信息
     */
    private reqConfig;
    constructor(config: Config);
    /**
     * 请求失败的错误统一处理
     * @param code - 错误码
     * @param message - 自定义错误信息
     */
    private handleError;
    /**
     * 刷新token处理
     */
    private refreshToken;
    private beforeRequest;
    request(url: string, data: any, options: RequestOptions, callback?: any): Promise<unknown>;
    get(url: string, data?: object, options?: RequestOptions): Promise<unknown>;
    post(url: string, data?: object, options?: RequestOptions): Promise<unknown>;
    put(url: string, data?: object, options?: RequestOptions): Promise<unknown>;
    delete(url: string, data?: object, options?: RequestOptions): Promise<unknown>;
    /**
     * 设置请求配置信息，方便链式调用
     * @param options
     */
    config(options?: RequestOptions): this;
    /**
     * 获取请求域名
     */
    uri(): string;
    /**
     * 设置请求头信息，方便链式调用
     * @param header
     */
    setHeader(header: object): this;
    /**
     * 中断请求，不传 `task_id` 时默认中断当前任务
     * @param task_id
     */
    abort(task_id?: string): void;
    /**
     * 文件下载
     * @param params
     */
    download(params: DownloadParams): UniApp.DownloadTask;
    /**
     * 普通文件上传
     * @param params
     */
    upload(params: UploadParams): UniApp.UploadTask;
    /**
     * 阿里云OSS直传，同步上传
     * @param options
     */
    uploadAliossSync(options: UploadAliossOptions): Promise<{
        code: number;
        data?: {
            uploadTask: any;
            url: string;
            path: string;
        } | undefined;
        msg: string;
    }>;
    /**
     * 阿里云OSS直传，异步上传
     * @param options
     */
    uploadAlioss(options: UploadAliossOptions): void;
}

export { AfterRequestCallbackResult, BeforeRequestCallbackResult, Config, DownloadParams, DownloadSuccessResultCallback, Files, GeneralCallbackResult, GetOSSBySTSSuccessCallback, Http, RequestMethod, RequestOptions, RequestSuccessCallbackResult, RequestTask, UploadAliossOptions, UploadParams };
