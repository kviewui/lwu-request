# 全局配置
这里是插件初始化的全局配置内容。

## baseUrl
请求域名配置

### dev
+ **类型**：`string`
+ **默认值**: ` `
+ **描述**：开发环境域名

### pro
+ **类型**：`string`
+ **默认值**: ` `
+ **描述**：生产环境域名

## debug
+ **类型**：`boolean`
+ **默认值**: `false`
+ **描述**：调试模式，开启后会显示内部调试打印信息

## loading
+ **类型**：`boolean`
+ **默认值**: `true`
+ **描述**：请求过程是否显示loading

## loadingText
+ **类型**：`string`
+ **默认值**: `请求中...`
+ **描述**：请求中loading弹窗的提示文本

___
::: tip
下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
:::

## timeout
+ **类型**：`number`
+ **默认值**: `6000`
+ **描述**：请求超时时间

## 代码演示
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
	// 下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
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
     * 网络异常或者断网处理程序，建议更新缓存中是否断网或者网络繁忙的标识以便前端页面展示没有网络或者断网的通用异常页面
     * @returns
     */
    networkExceptionHandle: () => {},
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