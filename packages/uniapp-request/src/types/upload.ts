export interface Files {
    name?: string;
    file?: File;
    uri: string;
};

export interface UploadParams {
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
};