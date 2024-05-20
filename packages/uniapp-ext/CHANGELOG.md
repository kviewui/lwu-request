## 1.8.3  (2024-05-20)
+ 新增 `customData` 请求配置项。[详情](https://lwur.fdproxy.cn/config/request.html#customdata)
+ 新增 `-1` 状态码。[详情](https://lwur.fdproxy.cn/errorCode.html)
+ 优化 `请求失败拦截` 逻辑，以解决 `服务器拒绝请求` 时被拦截为网络连接异常的问题。

## 1.8.2  (2024-04-15)
+ `before`, `after`, `errorHandleByCode`, `apiErrorInterception` 拦截器新增 `reject` 回调参数，方便自定义抛出异常。抛出的异常可以在请求的 `catch` 接收
	
	这里以 `after` 拦截器为例进行演示，其他拦截器同理。
	```
	// ...其他配置
	after: (res: AfterRequestCallbackResult, reject: (arg0?: string) => void) => {
		// 其他自定义业务逻辑
		reject('手动抛出异常测试')
	}
	```
+ 优化请求拦截器不返回内容时异常问题。

## 1.8.1  (2024-01-11)
+ 优化 `loading` 为 `false` 时微信开发者控制台报错问题。

## 1.8.0  (2023-08-11)
+ 新增 `originalResponse` 请求配置项。[详情](https://lwur.fdproxy.cn/config/request.html#originalresponse)

## 1.7.0  (2023-07-27)
+ 新增 `env` 运行环境配置项，支持 `原生h5` 运行环境和 `原生微信小程序` 运行环境。[详情](https://lwur.fdproxy.cn/config/global.html#env)
+ `timeout` 配置项默认值调整为 `60 * 1000`。[详情](https://lwur.fdproxy.cn/config/global.html#timeout)
+ 新增 `loadingStartTime` 配置项。[详情](https://lwur.fdproxy.cn/config/global.html#loadingstarttime)
+ 优化 `after` 配置项。[详情](https://lwur.fdproxy.cn/config/global.html#after)
+ 优化 `before` 配置项。[详情](https://lwur.fdproxy.cn/config/global.html#before)
+ 优化其他一些已知问题。

## 1.6.5  (2023-07-17)
+ 配置项 `xhrCode` 和 `tokenExpiredCode` 新增 `string` 类型，[详情](https://github.com/kviewui/lwu-request/issues/17)
+ 优化其他一些已知问题。

## 1.6.4  (2023-07-05)
+ 修复 `header` 默认的 `Authorization` 自动携带参数为 `true` 的bug。
+ 修复 `autoTakeToken` 对 `header` 参数方式无效的bug。

## 1.6.3  (2023-07-04)
+ 请求配置增加 `autoTakeToken` 是否自动携带 `token` 配置项。[详情](https://lwur.fdproxy.cn/config/request.html#autotaketoken)
+ 优化其他一些已知问题。

## 1.6.2  (2023-06-28)
+ 修复 `xhrCode` 非0，`xhrCodeName` 等于0的情况下，非预期结果的bug。[详情](https://github.com/kviewui/lwu-request/pull/13)
+ 优化其他一些已知问题。

## 1.6.1  (2023-06-21)
+ 修复 `refreshTokenHandle` 执行后没有自动发起请求的bug。
+ 优化自动刷新token的实现，开发者不再需要手动处理token，示例如下：

```ts
refreshTokenHandle: (refreshToken?: string) => {
	// 打印旧的Token
    console.log(refreshToken, '旧的token');
	return new Promise((resolve, reject) => {
		// 模拟获取新的token
		resolve('FbLKVJLO6PLrPxzZeXOa67ftPmdvXywm8vU4y59HbWY=');
	});
}
```
+ 新增 `uri` API方法。[详情](https://lwur.fdproxy.cn/api/uri.html)。

## 1.5.11 (2023-06-07)
+ 新增 `taskIdValue` 自定义获取task_id处理程序配置项。[详情](https://github.com/kviewui/lwu-request/pull/11)，[文档地址](https://lwur.fdproxy.cn/config/global.html#taskidvalue)
+ 新增 `tokenExpiredCodeType` token失效错误代码类型配置项。[文档地址](https://lwur.fdproxy.cn/config/global.html#tokenexpiredcodetype)

## 1.5.1 (2023-06-06)
+ 删除header中的默认 `contentType` 字段默认值。

## 1.5.0  (2023-06-05)
+ 请求前拦截 `before` 增加原始请求内容。
+ 增加 `setHeader` API方法。[详情](https://lwur.fdproxy.cn/api/setHeader.html)。
+ 优化其他一些已知问题。

## 1.4.13 (2023-05-29)
+ 优化自定义请求后拦截，增加原始响应内容。

## 1.4.12 (2023-05-29)
+ 优化网络请求异常时的 `catch` 捕获逻辑。
+ 优化 `upload` API的header公共继承问题。[详情](https://github.com/kviewui/lwu-request/issues/9)
+ 优化其他一些已知问题。

## 1.4.11 (2023-05-26)
+ 修复 `put` 方法bug。[详情](https://github.com/kviewui/lwu-request/issues/6)

## 1.4.10 (2023-05-25)
+ 新增 `upload` 文件上传接口。[详情](https://lwur.fdproxy.cn/api/upload.html)
+ 新增 `download` 文件下载接口。[详情](https://lwur.fdproxy.cn/api/download.html)
+ 新增 `uploadAliyunOSS` 异步直传阿里云OSS接口。[详情](https://lwur.fdproxy.cn/api/aliyun.html#uploadaliyunoss)
+ 新增 `uploadAliyunOSSSync` 同步直传阿里云OSS接口。[详情](https://lwur.fdproxy.cn/api/aliyun.html#uploadaliyunosssync)
+ 修复一些已知问题。

## 1.3.11	(2023-05-22)
+ 修复因新增 `config` 请求API方法引起的bug。

## 1.3.0	(2023-05-22)
+ 优化 `apiErrorInterception` 拦截执行机制，当设置了 `xhrCode` 时API返回成功状态时拦截不再返回内容。
+ 请求配置增加 `loading` 和 `loadingText`，方便对单个请求设置显示的loading。[详情](https://lwur.fdproxy.cn/config/request.html#loading)。
+ 增加 `config` 请求API方法。[详情](https://lwur.fdproxy.cn/api/config.html)。

## 1.2.0	(2023-05-19)
+ 增加 `xhrCode` API成功状态码配置项。[详情](https://lwur.fdproxy.cn/config/global.html#xhrcode)
+ 增加 `xhrCodeName` 语义化接口响应状态码字段名称配置项。[详情](https://lwur.fdproxy.cn/config/global.html#xhrcodename)

## 1.1.13	(2023-05-18)
+ 修复多个GET请求时请求冲突问题。[详情](https://github.com/kviewui/lwu-request/issues/3)

## 1.1.12	(2023-05-17)
+ 优化 	`apiErrorInterception` 重复执行问题。

## 1.1.1	(2023-05-16)
+ 修复 `GET` 请求时未设置 `header`导致的bug。

## 1.1.0	(2023-05-12)
+ 新增 `apiErrorInterception` API错误拦截处理程序配置项，方便用户统一拦截处理API业务异常，示例如下：

```ts
import { msg } from './prompt';
interface Data {
	code: number;
};
apiErrorInterception: (data: Data, args?: UniApp.RequestSuccessCallbackResult) => {
	if (data.code !== 1) {
		msg({ title: '请求失败' });
	}
}
```
+ 调整 `errorHandleByCode` 配置项为非必填，简化初始化配置内容。

## 1.0.61	(2023-04-14)
+ 更新README说明文档

## 1.0.6	(2023-04-14)
+ 修复已知问题

## 1.0.5	(2023-04-14)
+ 修复 `GET` 请求时因小程序环境不支持 `URLSearchParams` 导致构建参数失败的bug。

## 1.0.4	(2023-04-02)
+ 修复自定义 `header` 不生效bug

## 1.0.31	(2023-04-02)
+ 新增请求参数类型 `RequestOptions` 导出

## 1.0.3	(2023-03-31)
+ 修复因增加 `tokenValue` 属性后没有 `token` 返回时程序中断的bug，并完善携带token的配置demo。

## 1.0.2	(2023-03-28)
+ 新增 `tokenValue` 属性，优化旧版本指定token存储key的非人性化方式，`tokenValue` 直接通过自己定义Promise返回最新token即可，示例如下：  

```js
tokenVlaue: () => {
	return new Promise((resolve, _) => {
		// 获取最新token演示
		const token  = getToken();
		token && resolve(token);
	});
}
```
+ 新增 `buildQueryString` 属性，支持自定义构建URL参数的方式，默认使用 `NodeJS`内置对象 `URLSearchParams` 转化，可以选择 `qs` 插件方式，需要手动安装 `qs` 插件  

	```
	// qs 插件转化示例
	import qs from 'qs';

	return qs.stringify(obj);
	```

## 1.0.1    (2023-03-26)
+ 优化已知问题
