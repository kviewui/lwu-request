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
     * 请求过程是否显示loading
     */
    loading?: boolean;
    /**
     * 请求中loading弹窗的提示文本，默认为 `'请求中...'`
     */
    loadingText?: string;
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
     * 业务错误代码拦截处理程序，请根据业务实际情况灵活设置
     * @param code
     * @param errMsg
     * @returns
     */
    errorHandleByCode: (code: number, errMsg?: string) => void;
    /**
     * 网络异常或者断网处理程序，建议更新缓存中是否断网或者网络繁忙的标识以便前端页面展示没有网络或者断网的通用异常页面
     * @returns
     */
    networkExceptionHandle?: () => void;
    /**
     * 请求成功时接口响应描述信息字段名称，默认为 `'msg'`
     */
    requestSuccessResponseMsgName?: string;
    /**
     * 缓存中token字段名称，方便请求库从缓存获取token完成自动填充token
     */
    tokenStorageKeyName?: string;
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
     */
    refreshTokenHandle?: () => Promise<unknown>;
    /**
     * 自定义token失效的错误代码，便于请求库内部做自动刷新token判断
     */
    tokenExpiredCode?: number;
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

interface RequestOptions {
    task_id?: string;
    before?: Function;
    after?: Function;
    header?: object;
    method?: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
    timeout?: number;
    dataType?: string;
    responseType?: string;
    sslVerify?: boolean;
    withCredentials?: boolean;
    firstIpv4?: boolean;
    retryCount?: number;
}

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
     * 配置信息
     */
    private config;
    constructor(config: Config);
    /**
     * 请求失败的错误统一处理
     * @param code - 错误码
     * @param message - 自定义错误信息
     */
    private handleError;
    private interceptor;
    /**
     * 刷新token处理
     */
    private refreshToken;
    request(url: string, data?: object, options?: RequestOptions): Promise<unknown>;
    get(url: string, data?: object, options?: RequestOptions): Promise<unknown>;
    post(url: string, data?: object, options?: RequestOptions): Promise<unknown>;
    put(url: string, data?: object, options?: RequestOptions): Promise<unknown>;
    delete(url: string, data?: object, options?: RequestOptions): Promise<unknown>;
    /**
     * 中断请求，不传 `task_id` 时默认中断当前任务
     * @param task_id
     */
    abort(task_id?: string): void;
}

export { Http };
