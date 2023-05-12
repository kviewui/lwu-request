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