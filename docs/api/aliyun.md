# ALIYUN
这里是直传阿里云OSS的方法介绍，分为 [`uploadAliyunOSS`](/api/alioss#uploadaliyunoss) 异步上传方式和 [`uploadAliyunOSSSync`](/api/alioss#uploadaliyunosssync) 同步上传方式。两个方法都需要获取后端或者前端返回的阿里OSS的 `STS临时授权凭证信息`。[使用STS临时访问凭证访问OSS](https://help.aliyun.com/document_detail/100624.html?spm=a2c4g.375246.0.0.29494f77gjhPg6)

## uploadAliyunOSS
直传阿里OSS，这是一个异步接口。

### 请求参数
| 参数名 | 类型 | 必填 | 说明
| --- | --- | --- | ---
| filePath | `String` | 是 | 要上传文件资源的路径
| uploadDir | `String` | 是 | 文件上传至OSS的存储目录
| maxSize | `Number` | 否 | 限制上传文件的大小，单位为MB，默认值为 `5`
| timeout | `Number` | 否 | 限制参数的生效时间，单位小时，默认值为 `1`
| uploadImageUrl | `String` | 是 | 上传的阿里云OSS地址，示例：`https://demo-static.oss-cn-hangzhou.aliyuncs.com`
| formData | `Object` | 否 | HTTP 请求中其他额外的 form data
| getOSSBySTS | `() => Promise<GetOSSBySTSSuccessCallback>` | 是 | 获取OSS临时授权访问凭证信息，[使用STS临时访问凭证访问OSS](https://help.aliyun.com/document_detail/100624.html?spm=a2c4g.375246.0.0.29494f77gjhPg6)
| getPolicyBase64 | `() => Promise<string>` | 是 | 获取签名的base64字符串，见下方说明
| getSignature | `(policyBase64: string, accessKeySecret: string) => Promise<string>` | 是 | 获取OSS签名，参考[JavaScript客户端签名直传](https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.31926.0.0.3a735458ATBOW8)、[服务端签名后直传](https://help.aliyun.com/document_detail/31926.html?spm=a2c4g.31925.0.0.74505d3fr63lMY)

## uploadAliyunOSSSync
直传阿里OSS，这是一个同步接口。

### 请求参数
同 [uploadAlioss 请求参数](/api/alioss#请求参数)

## 示例