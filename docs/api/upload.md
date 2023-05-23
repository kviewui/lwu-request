# UPLOAD <Badge type="tip" text="已发布" />

将本地资源上传到开发者服务器，客户端发起一个 `POST` 请求，其中 `content-type` 为 `multipart/form-data`。 如页面通过 [uni.chooseImage](https://uniapp.dcloud.net.cn/api/media/image#chooseimage) 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。

::: warning 注意事项
在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。在h5上是跨域的，开发者需要处理好跨域问题。
:::

## 请求参数
| 参数名 | 类型 | 必填 | 说明 | 平台差异说明
| --- | --- | --- | --- | ---
| url | `String` | 是 | 开发者服务器 url |
| files | `Array` | 是（files和filePath选其一）| 需要上传的文件列表。**使用 files 时，filePath 和 name 不生效**。| App、H5（ 2.6.15+）
| fileType | `String` | 见平台差异说明 | 文件类型，image/video/audio | 仅支付宝小程序，且必填。
| file | `File` | 否 | 要上传的文件对象。 | 仅H5（2.6.15+）支持
| filePath | `String` | 是（files和filePath选其一） | 要上传文件资源的路径。 |
| name | `String` | 是 | 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容 | 
| domain | `String` | 否 | 上传服务器域名，设置该参数时 `全局配置` 的 `baseUrl` 将失效。 |
| header | `Object` | 否 | HTTP 请求 Header, header 中不能设置 Referer。 |
| timeout | `Number` | 否 | 超时时间，单位 ms，默认值为 `60000` | H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序、支付宝小程序、字节跳动小程序、快手小程序
| formData | `Object` | 否 | HTTP 请求中其他额外的 form data | 
| success | `Function` | 否 | 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
| fail | `Function` | 否 | 接口调用失败的回调函数
| complete | `Function` | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）

::: tip 注意
+ App支持多文件上传，微信小程序只支持单文件上传，传多个文件需要反复调用本API。所以跨端的写法就是循环调用本API。
+ App平台选择和上传非图像、视频文件，参考https://ask.dcloud.net.cn/article/35547
+ 支付宝小程序开发工具上传文件返回的http状态码为字符串形式，支付宝小程序真机返回的状态码为数字形式
:::

#### files 参数说明
files 参数是一个 file 对象的数组，file 对象的结构如下：

| 参数名 | 类型 | 必填 | 说明
| --- | --- | --- | --- 
| name | `String` | 否 | multipart 提交时，表单的项目名，默认为 file
| file | `File` | 否 | 要上传的文件对象，仅H5（2.6.15+）支持
| uri | `String` | 是 | 文件的本地地址

::: tip 注意
+ 如果 `name` 不填或填的值相同，可能导致服务端读取文件时只能读取到一个文件。
:::

#### success 返回参数说明
| 参数 | 类型 | 说明
| --- | --- | ---
| data | `String` | 开发者服务器返回的数据
| statusCode | `String` | 开发者服务器返回的 HTTP 状态码

## 返回值
返回值为 `uploadTask` 对象。通过 `uploadTask`，可监听上传进度变化事件，以及取消上传任务。

#### uploadTask 对象的方法列表
| 方法 | 参数 | 说明
| --- | --- | ---
| abort |  | 中断下载任务
| onProgressUpdate | callback | 监听上传进度变化
| onHeadersReceived | callback | 监听 HTTP Response Header 事件，会比请求完成事件更早,仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/UploadTask.onHeadersReceived.html)
| offProgressUpdate | callback | 取消监听上传进度变化事件，仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/UploadTask.offProgressUpdate.html)
| offHeadersReceived | callback | 取消监听 HTTP Response Header 事件，仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/UploadTask.offHeadersReceived.html)

#### onProgressUpdate 返回参数说明
| 参数 | 类型 | 说明
| --- | --- | ---
| progress | `Number` | 上传进度百分比
| totalBytesWritten | `Number` | 已经上传的数据长度，单位 Bytes
| totalBytesExpectedToWrite | `Number` | 预期需要上传的数据总长度，单位 Bytes

## 使用示例
```ts
uni.chooseImage({
    success: (chooseImageRes: UniApp.ChooseImageSuccessCallbackResult) => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        const uploadTask = request.upload({
            url: '/upload', // 仅为示例，非真实的接口地址
            domain: 'https://www.example.com', // 仅为示例，非真实的服务器域名
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
				'user': 'test'
			},
            success: (uploadFileRes: UniApp.UploadFileSuccessCallbackResult) => {
				console.log(uploadFileRes.data);
			}
        });

        uploadTask.onProgressUpdate((res) => {
			console.log('上传进度' + res.progress);
			console.log('已经上传的数据长度' + res.totalBytesSent);
			console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

			// 测试条件，取消上传任务。
			if (res.progress > 50) {
				uploadTask.abort();
			}
		});
    }
});
```