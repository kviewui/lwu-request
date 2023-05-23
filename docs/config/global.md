# 全局配置
这里是插件初始化的全局配置内容。

## baseUrl
+ **类型**: `{
    dev: string;
    pro: string;
}`
+ **默认值**: `{dev: '', pro: ''}`
+ **是否必填**: 是
+ **描述**: 请求域名配置

### dev
+ **类型**：`string`
+ **默认值**: ` `
+ **是否必填**: 是
+ **描述**：开发环境域名

### pro
+ **类型**：`string`
+ **默认值**: ` `
+ **是否必填**: 是
+ **描述**：生产环境域名

## debug
+ **类型**：`boolean`
+ **默认值**: `false`
+ **是否必填**: 否
+ **描述**：调试模式，开启后会显示内部调试打印信息

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

## errorHandleByCode
+ **类型**: `(code: number, errMsg?: string) => {}`
+ **默认值**: `(code: number, errMsg?: string) => {}`
+ **是否必填**: 否
+ **描述**: 业务错误代码拦截处理程序，请根据业务实际情况灵活设置
+ **示例**: 
```ts
errorHandleByCode: (code: number, errMsg?: string) => {
    // console.log(`【Request Debug:配置】${code}`);
    if (code === 401) {
        // 一般为未登录状态，可在这里统一跳转登录页面
        console.log('401拦截演示');
        // 此处仅为演示
        msg({ title: errMsg || '未登录，请先登录' });
    } else if (code === 403) {
        // 一般为token过期，可在这里清除token并跳转登录页面处理
        console.log('403拦截演示');
        // 此处仅为演示
        msg({ title: errMsg || '登录过期，请重新登录' });
    } else if (code === 404) {
        // 请求不存在
        console.log('404拦截演示');
        // 此处仅为演示
        msg({ title: errMsg || '请求资源不存在' });
    } else if (code === 500) {
        console.log('500拦截演示');
        msg({ title: errMsg || '接口返回错误500' });
    } else if (code === 502) {
        console.log('500拦截演示');
    } else if (code === 503) {
        console.log('503拦截演示');
    } else if (code !== 200) {
        console.log('自定义错误码拦截演示');
        msg({ title: '请求服务异常' });
    }
}
```

## apiErrorInterception
+ **类型**: `(data: any, args?: UniApp.RequestSuccessCallbackResult) => {}`
+ **默认值**: `(data: any, args?: UniApp.RequestSuccessCallbackResult) => {}`
+ **是否必填**: 否
+ **描述**: 
    + API错误拦截处理程序，请根据业务实际情况灵活设置。
    + `1.1.0` 及以上版本支持。
+ **示例**: 
```ts
interface Data {
    code: number;
}
apiErrorInterception: (data: Data, args?: UniApp.RequestSuccessCallbackResult) => {
    if (data.code !== 1) {
        msg({ title: '请求失败' });
    }
}
```

## xhrCode
+ **类型**: `number`
+ **默认值**: ` `
+ **是否必填**: 否
+ **描述**: API成功状态码
    + `1.2.0` 及以上版本支持
    + 设置该参数后，API业务失败时将直接抛出异常，开发者需要在 `catch` 中捕获API返回的错误信息，或者在 [`apiErrorInterception`](/config/global#apierrorinterception) 中统一捕获API返回的错误信息
    + 可配置 [`xhrCodeName`](/config/global#xhrcodename) 实现自定义接口响应状态码字段名称

## xhrCodeName
+ **类型**: `string`
+ **默认值**: `code`
+ **是否必填**: 否
+ **描述**: 语义化接口响应状态码字段名称
    + `1.2.0` 及以上版本支持

## networkExceptionHandle
+ **类型**: `() => {}`
+ **默认值**: `() => {}`
+ **是否必填**: 否
+ **描述**: 网络异常或者断网处理程序，建议更新缓存中是否断网或者网络繁忙的标识以便前端页面展示没有网络或者断网的通用异常页面

## requestSuccessResponseMsgName
+ **类型**: `string`
+ **默认值**: `msg`
+ **是否必填**: 否
+ **描述**: 请求成功时接口响应描述信息字段名称

## tokenStorageKeyName
+ **类型**: `string`
+ **默认值**: ` `
+ **是否必填**: 否
+ **描述**: 
    + 缓存中token字段名称，方便请求库从缓存获取token完成自动填充token。
    + `1.0.2` 及以上版本已废弃，请使用 `tokenValue` 属性代替。

## tokenValue
+ **类型**: `() => Promise<unknown>`
+ **默认值**: `undefined`;
+ **是否必填**: 否
+ **描述**: 
    + 自定义获取token处理程序，通过promise返回最新token值即可
    + `1.0.2` 及以上版本支持
+ **示例**:
```ts
tokenValue: () => {
    return new Promise((resolve, _) => {
        try {
            // getToken 为获取token的示例方法，请根据自己的实际业务灵活修改
            const token = getToken();
            token && resolve(token);
            resolve('');
        } catch (error) {
            resolve(false);
        }
    });
}
```

## buildQueryString
+ **类型**: `(obj: object) => string`
+ **默认值**: `() => ''`
+ **是否必填**: 否
+ **描述**
    + 自定义构建URL参数方式，即用什么方式把请求的params对象数据转为`a=1&b=2`的格式，默认使用NodeJS内置对象 `URLSearchParams` 转化，可以自定义通过 `qs` 插件的方式转化。
    + `GET` 请求时有效。
    + `1.0.2` 及以上版本支持。
+ **示例**: 
```ts
import qs from 'qs';
// qs 插件转化示例
buildQueryString: (params?: object) => {
    return qs.stringify(params);
}
```

## takeTokenMethod
+ **类型**: `'header' | 'body'`
+ **默认值**: `header`
+ **是否必填**: 否
+ **描述**: 请求携带token的方式

## takenTokenKeyName
+ **类型**: `string`
+ **默认值**: `Authorization`
+ **是否必填**: 否
+ **描述**: 
    + 请求携带token的字段名称。
    + `takeTokenMethod` 为 `header` 时，需要后端同步支持 `takenTokenKeyName` 的值。

## autoRefreshToken
+ **类型**: `boolean`
+ **默认值**: `false`
+ **是否必填**: 否
+ **描述**: 是否自动刷新token

## refreshTokenHandle
+ **类型**: `() => Promise<unknown>`
+ **默认值**: ` `
+ **是否必填**: 否
+ **描述**: 
    + 自动刷新token程序，返回promise
    + `autoRefreshToken` 为 `true`时生效

## tokenExpiredCode
+ **类型**: `number`
+ **默认值**: `403`
+ **是否必填**: 否
+ **描述**: 自定义token失效的错误代码，便于请求库内部做自动刷新token判断

## retry
+ **类型**: `boolean`
+ **默认值**: `false`
+ **是否必填**: 否
+ **描述**: 请求失败是否自动重试

## retryCount
+ **类型**: `number`
+ **默认值**: `3`
+ **是否必填**: 否
+ **描述**: 请求失败自动重试次数

## retryCountAutoOffRetry
+ **类型**: `boolean`
+ **默认值**: `true`
+ **是否必填**: 否
+ **描述**: 
    + 请求失败重试次数是否自动计算，失败重试次数上限依然是设置的 `retryCount `值。
    + 根据 [指数退避算法](/intro#支持请求失败自动重试【基于指数退避算法】) 自动计算失败重试次数。

## retryMaximum
+ **类型**: `number`
+ **默认值**: `64`
+ **是否必填**: 否
+ **描述**: 请求失败用来生成重试时间上限（指数退避算法需要），单位秒

## retryDeadline
+ **类型**: `number`
+ **默认值**: `10000`
+ **是否必填**: 否
+ **描述**: 请求失败执行重试时间上限（指数退避算法需要），达到上限后不再重试

## before
+ **类型**: `Function`
+ **默认值**: ` `
+ **是否必填**: 否
+ **描述**: 自定义请求前拦截。
    + `1.3.12` 及以上版本支持。

## after
+ **类型**: `Function`
+ **默认值**: ` `
+ **是否必填**: 否
+ **描述**: 自定义请求后拦截。
    + `1.3.12` 及以上版本支持。

___
::: tip
下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
:::

## header
+ **类型**: `object`
+ **默认值**: `{}`
+ **是否必填**: 否
+ **描述**: 自定义请求header。
    + `1.3.12` 及以上版本支持。

## timeout
+ **类型**：`number`
+ **默认值**: `6000`
+ **是否必填**: 否
+ **描述**：请求超时时间

## method
+ **类型**: `'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE'`
+ **默认值**: `'GET'`
+ **是否必填**: 否
+ **描述**: 请求方式

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

## 完整配置代码演示
```ts
{
	baseUrl: {
		/**
         * 开发环境域名
         */
        dev: '',
        /**
         * 生产环境域名
         */
        pro: '',
	},
	/**
     * 调试模式，开启后控制台会显示内部调试打印信息
     */
    debug: false,
	/**
     * 请求过程是否显示loading
     */
    loading: true,
	/**
     * 请求中loading弹窗的提示文本，默认为 `'请求中...'`
     */
    loadingText: '请求中...',
    /**
     * 自定义请求前拦截
     * + `1.3.12` 及以上版本支持。
     */
    before: () => {};
    /**
     * 自定义请求后拦截
     * + `1.3.12` 及以上版本支持。
     */
    after: () => {};
	// 下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
    /**
     * 自定义请求头信息
     * + `1.3.12` 及以上版本支持。
     */
    header: {};
	/**
     * 请求超时时间，单位ms
     */
    timeout: 6000,
	/**
     * 请求方式，有效值：`'GET'`、`'POST'`、`'PUT'`、`'DELETE'`、`'CONNECT'`、`'HEAD'`、`'OPTIONS'`、`'TRACE'`
     */
    method: 'GET',
	/**
     * 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse
     */
    dataType: 'json',
	/**
     * 设置响应的数据类型。合法值：`text`、`arraybuffer`
     */
    responseType: 'text',
	/**
     * 验证 ssl 证书
     */
    sslVerify: true,
	/**
     * 跨域请求时是否携带凭证（cookies）
     */
    withCredentials: false,
	/**
     * DNS解析时优先使用ipv4
     */
    firstIpv4: false,
	/**
     * 业务错误代码拦截处理程序，请根据业务实际情况灵活设置
     * @param code 
     * @param errMsg 
     * @returns 
     */
    errorHandleByCode: (code: number, errMsg?: string) => {},
    /**
     * API错误拦截处理程序，请根据业务实际情况灵活设置
     * + `1.1.0` 及以上版本支持
     * @param data API返回内容
     * @param args uniapp请求API回调结果
     */
    apiErrorInterception: (data: any, args?: UniApp.RequestSuccessCallbackResult) => {},
	/**
     * 网络异常或者断网处理程序，建议更新缓存中是否断网或者网络繁忙的标识以便前端页面展示没有网络或者断网的通用异常页面
     * @returns
     */
    networkExceptionHandle: () => {},
    /**
     * API成功状态码
     * + `1.2.0` 及以上版本支持
     * + 设置该参数后，API业务失败时将直接抛出异常，开发者需要在 `catch` 中捕获API返回的错误信息，或者在 `apiErrorInterception` 中统一捕获API返回的错误信息
     */
    xhrCode: 0,
    /**
     * 语义化接口响应状态码字段名称，默认为 `code`
     * + `1.2.0` 及以上版本支持
     */
    xhrCodeName: 'code',
	/**
     * 请求成功时接口响应描述信息字段名称，默认为 `'msg'`
     */
    requestSuccessResponseMsgName: 'msg',
	/**
     * 缓存中token字段名称，方便请求库从缓存获取token完成自动填充token
     */
    tokenStorageKeyName: '',
    /**
     * 自定义获取token处理程序，通过promise返回最新token值即可
     * + `1.0.2` 及以上版本支持
     * @returns 
     * @example
     * ```ts
     * tokenValue: () => {
     *      return new Promise((resolve, _) => {
     *          // 获取最新token演示
     *          const token = getToken();
     *          token && resolve(token);
     *      });
     * }
     * ```
     */
    tokenValue: undefined,
    /**
     * 自定义构建URL参数方式，即用什么方式把请求的params对象数据转为`a=1&b=2`的格式，默认使用NodeJS内置对象 `URLSearchParams` 转化，可以自定义通过 `qs` 插件的方式转化
     * + `1.0.2` 及以上版本支持
     * 
     * @example
     * ```ts
     * // qs 插件转化示例
     * import qs from 'qs';
     * 
     * return qs.stringify(obj);
     * ```
     */
    buildQueryString: undefined,
	/**
     * 请求携带token的方式，有效值：`header`、`body`
     */
    takeTokenMethod: 'header',
	/**
     * 请求携带token的字段名称，header方式默认为 `Authorization`
     */
    takenTokenKeyName: 'Authorization',
	/**
     * 是否自动刷新token
     */
    autoRefreshToken: false,
	/**
     * 自动刷新token程序，返回promise，`autoRefreshToken` 为 `true`时生效
     */
    refreshTokenHandle: () => {},
	/**
     * 自定义token失效的错误代码，便于请求库内部做自动刷新token判断
     */
    tokenExpiredCode: 403,
	/**
     * 请求失败是否自动重试
     */
    retry: false,
	/**
     * 请求失败自动重试次数
     */
    retryCount: 3,
	/**
     * 请求失败重试次数是否自动计算，失败重试次数上限依然是设置的retryCount值
     */
    retryCountAutoOffRetry: true,
	/**
     * 请求失败用来生成重试时间上限（指数退避算法需要），单位秒
     */
    retryMaximum: 64,
	/**
     * 请求失败执行重试时间上限（指数退避算法需要），达到上限后不再重试
     */
    retryDeadline: 10000
}
```