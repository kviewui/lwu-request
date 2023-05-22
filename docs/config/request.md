# 请求配置
这里是单次请求时的配置内容。

## task_id
+ **类型**: `string`
+ **默认值**: ` `
+ **是否必填**: 否
+ **描述**: 请求ID，做终止本次请求和过滤重复请求时需要。

## before
+ **类型**: `Function`
+ **默认值**: ` `
+ **是否必填**: 否
+ **描述**: 自定义请求前拦截。

## after
+ **类型**: `Function`
+ **默认值**: ` `
+ **是否必填**: 否
+ **描述**: 自定义请求后拦截。

## header
+ **类型**: `object`
+ **默认值**: `{}`
+ **是否必填**: 否
+ **描述**: 自定义请求header。

## method
+ **类型**: `'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE'`
+ **默认值**: `'GET'`
+ **是否必填**: 否
+ **描述**: 请求方式

## timeout
+ **类型**：`number`
+ **默认值**: `6000`
+ **是否必填**: 否
+ **描述**：请求超时时间

## dataType
+ **类型**: `string`
+ **默认值**: `'json'`
+ **是否必填**: 否
+ **描述**: 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse

## responseType
+ **类型**: `string`
+ **默认值**: `text`
+ **是否必填**: 否
+ **描述**: 设置响应的数据类型。合法值：`text`、`arraybuffer`

## sslVerify
+ **类型**: `boolean`
+ **默认值**: `true`
+ **是否必填**: 否
+ **描述**: 验证 ssl 证书

## withCredentials
+ **类型**: `boolean`
+ **默认值**: `false`
+ **是否必填**: 否
+ **描述**: 跨域请求时是否携带凭证（cookies）

## firstIpv4
+ **类型**: `boolean`
+ **默认值**: `false`
+ **是否必填**: 否
+ **描述**: DNS解析时优先使用ipv4

## retryCount
+ **类型**: `number`
+ **默认值**: `3`
+ **是否必填**: 否
+ **描述**: 请求失败自动重试次数

## loading
+ **类型**：`boolean`
+ **默认值**: `true`
+ **是否必填**: 否
+ **描述**：请求过程是否显示loading

## loadingText
+ **类型**：`string`
+ **默认值**: `请求中...`
+ **是否必填**: 否
+ **描述**：请求中loading弹窗的提示文本

## 使用示例
**请求配置支持 `参数设置` 和 `API设置` 两种方式供开发者选择使用，具体参考下面示例。**
::: danger 注意事项
+ 示例中的请求配置为全部配置内容演示，具体使用时需要根据自己的实际情况选择使用。
:::
+ #### 参数设置方式
```ts
request.request('/user/save', {
	user_id: 1
}, {
    task_id: 'user-info-111',
    before: () => {},
    after: () => {},
    header: {},
    method: 'POST',
    timeout: 3000,
    dataType: 'text',
    responseType: 'json',
    sslVerify: false,
    withCredentials: false,
    firstIpv4: false,
    retryCount: 3,
    loading: true,
    loadingText: '加载中...'
})
	.then((res) => {
		// 此处可自定义业务逻辑
	})
	.catch((err) => {
		// 此处仅为演示
		console.error('请求服务异常');
	});
```

+ #### API设置方式
```ts
request
    .config({
        task_id: 'user-info-111',
        before: () => {},
        after: () => {},
        header: {},
        method: 'POST',
        timeout: 3000,
        dataType: 'text',
        responseType: 'json',
        sslVerify: false,
        withCredentials: false,
        firstIpv4: false,
        retryCount: 3,
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