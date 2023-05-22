# CONFIG
设置请求配置内容，一般用于链式调用场景。
::: warning 注意事项
+ `1.3.0` 及以上版本支持。
+ 该方法的配置内容会覆盖旧版请求配置参数内容。
:::

## 使用示例
```ts
request
    .config({
        loading: true,
        loadingText: '加载中...'
    })
    .post('/user/save', {
	    user_id: 1
    })
	.then((res) => {
		// 此处可自定义业务逻辑
	})
	.catch((err) => {
		// 此处仅为演示
		console.error('请求服务异常');
	});
```