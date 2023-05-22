# GET
get请求方法，内部已自动转为 `query string` 参数字符串。可以自定义转化方法，参考[`buildQueryString`](/config/global#buildquerystring)。

## 使用示例
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