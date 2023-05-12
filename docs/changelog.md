# 更新日志

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