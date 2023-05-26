---
outline: deep
---

# DOWNLOAD <Badge type="tip" text="已发布" />

下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
::: warning 注意事项
在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。在h5上是跨域的，开发者需要处理好跨域问题。
:::

## 请求参数
| 参数名 | 类型 | 必填 | 说明 | 平台差异说明
| --- | --- | --- | --- | ---
| url | `String` | 是 | 下载资源的 url |
| domain | `String` | 否 | 下载服务器域名，设置该参数时 `全局配置` 的 `baseUrl` 将失效。 |
| header | `Object` | 否 | HTTP 请求 Header, header 中不能设置 Referer。 |
| timeout | `Number` | 否 | 超时时间，单位 ms，默认值为 `60000` | H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序、支付宝小程序、字节跳动小程序、快手小程序
| filePath | `String` | 否 | 指定文件下载后存储的路径 (本地路径) | 小程序端支持（微信IOS小程序保存到相册需要添加此字段才可以正常保存）
| success | `Function` | 否 | 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
| fail | `Function` | 否 | 接口调用失败的回调函数
| complete | `Function` | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）

**注：文件的临时路径，在应用本次启动期间可以正常使用，如需持久保存，需在主动调用 [uni.saveFile](https://uniapp.dcloud.net.cn/api/file/file#savefile)，才能在应用下次启动时访问得到。**

#### success 返回参数说明
| 参数名 | 类型 | 说明 | 平台差异说明
| --- | --- | --- | ---
| tempFilePath | `String` | 临时文件路径，下载后的文件会存储到一个临时文件 | 微信小程序、支付宝小程序、百度小程序、字节跳动小程序、飞书小程序
| statusCode | `Number` | 开发者服务器返回的 HTTP 状态码 | 微信小程序、QQ小程序、百度小程序、字节跳动小程序、飞书小程序
| apFilePath | `String` | 下载文件保存的路径（本地临时文件）。入参未指定 filePath 的情况下可用 | 支付宝小程序
| filePath | `String` | 用户文件路径 (本地路径)。传入 filePath 时会返回，跟传入的 filePath 一致 | 微信小程序、支付宝小程序、字节跳动小程序、飞书小程序
| fileContent | `Buffer` | 文件内容 | QQ小程序

## 返回值
返回值为 `downloadTask` 对象。通过 `downloadTask`，可监听下载进度变化事件，以及取消下载任务。

#### downloadTask 对象的方法列表
| 方法 | 参数 | 说明
| --- | --- | ---
| abort |  | 中断下载任务
| onProgressUpdate | callback | 监听下载进度变化
| onHeadersReceived | callback | 监听 HTTP Response Header 事件，会比请求完成事件更早,仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/DownloadTask.onHeadersReceived.html)
| offProgressUpdate | callback | 取消监听下载进度变化事件，仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/DownloadTask.offProgressUpdate.html)
| offHeadersReceived | callback | 取消监听 HTTP Response Header 事件，仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/DownloadTask.offHeadersReceived.html)

#### onProgressUpdate 返回参数说明
| 参数 | 类型 | 说明
| --- | --- | ---
| progress | `Number` | 下载进度百分比
| totalBytesWritten | `Number` | 已经下载的数据长度，单位 Bytes
| totalBytesExpectedToWrite | `Number` | 预期需要下载的数据总长度，单位 Bytes

## 使用示例
#### 基本使用
```ts
request.download({
    url: '/file/test', // 仅为示例，并非真实的资源
    domain: 'https://www.example.com', // 请求域名,
    success: (res: UniApp.DownloadSuccessData) => {
        if (res.statusCode === 200) {
            console.log('下载成功');
        }
    }
})
```

#### 下载进度监听
```ts
const downloadTask = request.download({
    url: '/file/test', // 仅为示例，并非真实的资源
    domain: 'https://www.example.com', // 请求域名,
    success: (res: UniApp.DownloadSuccessData) => {
        if (res.statusCode === 200) {
            console.log('下载成功');
        }
    }
});

downloadTask.onProgressUpdate((res) => {
	console.log('下载进度' + res.progress);
	console.log('已经下载的数据长度' + res.totalBytesWritten);
	console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);

	// 满足测试条件，取消下载任务。
	if (res.progress > 50) {
		downloadTask.abort();
	}
});
```