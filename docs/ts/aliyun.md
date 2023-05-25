# 阿里云OSS配置
这里是阿里云OSS相关的TS类型定义。

## GetOSSBySTSSuccessCallback
阿里云OSS的STS临时授权返回结果类型。[使用STS临时访问凭证访问OSS](https://help.aliyun.com/document_detail/100624.html?spm=a2c4g.375246.0.0.29494f77gjhPg6)
```ts
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
    /**
     * 可选类型定义
     */
    [key: string]: any;
};
```

## UploadAliossOptions
[`uploadAliyunOSSSync`](/api/aliyun#uploadaliyunosssync) 和 [`uploadAliyunOSS`](/api/aliyun#uploadaliyunoss) 的请求参数类型定义。
```ts
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
};
```