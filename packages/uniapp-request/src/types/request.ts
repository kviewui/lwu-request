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
};

export interface BeforeRequestCallbackResult {
    data?: any;
    header?: any;
    method?: Method;
    url?: string;
};

export interface AfterRequestCallbackResult {
    data?: any;
    cookie?: any;
    errMsg?: string;
    header?: any;
    statusCode?: number;
}