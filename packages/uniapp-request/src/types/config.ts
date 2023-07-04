export interface Config {
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
     */
    before?: Function;
    /**
     * 自定义请求后拦截
     * + `1.3.12` 及以上版本支持。
     */
    after?: Function;
    // 下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
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
    dataType?: string;
    /**
     * 设置响应的数据类型。合法值：`text`、`arraybuffer`
     */
    responseType?: string;
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
     * @param code http网络状态码，其中 `404` 为请求地址未找到、`408` 为请求超时、`1009` 为客户端网络不可用
     * @param errMsg
     * @returns
     */
    errorHandleByCode?: (code: number, errMsg?: string) => void;
    /**
     * API错误拦截处理程序，请根据业务实际情况灵活设置
     * @param data API返回内容
     * @param args uniapp请求API回调结果
     */
    apiErrorInterception?: (data: any, args?: UniApp.RequestSuccessCallbackResult) => void;
    /**
     * API成功状态码
     * + `1.2.0` 及以上版本支持
     * + 设置该参数后，API业务失败时将直接抛出异常，开发者需要在 `catch` 中捕获API返回的错误信息，或者在 `apiErrorInterception` 中统一捕获API返回的错误信息
     */
    xhrCode?: number;
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
    tokenExpiredCode?: number;
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
}
