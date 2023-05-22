# REQUEST
request请求方法，可以通过 `method` 请求参数指定请求方式，见 [`uniapp request api`](https://uniapp.dcloud.net.cn/api/request/request.html)

## 使用示例
```ts
request.request('/user/info', {
	user_id: 1
}, {
	method: 'GET'
})
	.then((res) => {
		// 此处可自定义业务逻辑
	})
	.catch((err) => {
		// 此处仅为演示
		console.error('请求服务异常');
	});
```