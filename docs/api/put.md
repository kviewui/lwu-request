# PUT <Badge type="tip" text="已发布" />
put请求方法

## 使用示例
```ts
request.put('/user/edit', {
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