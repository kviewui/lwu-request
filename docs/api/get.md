# GET <Badge type="tip" text="已发布" />
get请求方法，支持 `地址栏传参` 和 `data 传参`，见下方使用示例。

## 使用示例
### 地址栏传参
::: warning 提示
+ 地址栏传参时不需要传data参数，不然参数构建时会默认合并
:::
```ts
request.get('/user/info?id=1')
	.then((res) => {
		// 此处可自定义业务逻辑
	})
	.catch((err) => {
		// 此处仅为演示
		console.error('请求服务异常');
	});
```

### data 传参
::: warning 提示
+ data传参时不需要在地址栏传参数，不然参数构建时会默认合并
:::
```ts
request.get('/user/info', {
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