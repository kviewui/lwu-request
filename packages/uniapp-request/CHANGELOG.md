## 1.0.31	(2023-04-02)
+ 新增请求参数类型 `RequestOptions` 导出

## 1.0.3	(2023-03-31)
+ 修复因增加 `tokenValue` 属性后没有 `token` 返回时程序中断的bug，并完善携带token的配置demo。

## 1.0.2	(2023-03-28)
+ 新增 `tokenValue` 属性，优化旧版本指定token存储key的非人性化方式，`tokenValue` 直接通过自己定义Promise返回最新token即可，示例如下：
```
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