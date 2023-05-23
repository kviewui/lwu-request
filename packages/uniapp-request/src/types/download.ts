/**
 * 下载成功返回结果类型
 */
export interface DownloadSuccessResultCallback extends UniApp.DownloadSuccessData {
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
export interface DownloadParams {
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
};