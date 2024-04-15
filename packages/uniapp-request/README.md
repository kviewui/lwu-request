## LWU-REQUEST

## [官方文档](https://lwur.fdproxy.cn)

### 介绍
基于 [uniapp网络请求API](https://uniapp.dcloud.net.cn/api/request/request.html) 封装的轻量级网络请求库。
### 特性
+ 支持自动刷新token
+ 支持请求拦截
+ 支持请求失败自动重试【基于指数退避算法】
+ 支持自动计算重试时间

	> 指数退避算法简介
	为了解决如何设置适当的重传等待时间而存在的算法，基本流程如下：<br/>
	1.客户端发起请求<br/>
	2.请求失败，等待1 + random_number_milliseconds秒后重试请求。<br/>
	3.请求失败，等待2 + random_number_milliseconds秒后重试请求。<br/>
	4.请求失败，等待4 + random_number_milliseconds秒后重试请求。<br/>
	5.以此类推，直至达到设置的等待时间上限为止结束请求，具体算法公式如下：<br/>
	`Math.min((2 ** n + ranom_number_milliseconds), maxium_backoff)`<br/>
	上述的`random_number_milliseconds`为1到1000的随机毫秒数，`maxium_backoff`为最大等待秒数

+ 支持过滤重复请求
+ 支持自定义错误处理
+ 支持中断请求

### 安装
```shell
// pnpm方式【推荐】
pnpm install lwu-request
// npm 方式
npm install lwu-request
// cnpm 方式
cnpm install lwu-request
// yarn 方式
yarn add lwu-request
```

### 使用
#### 引入并初始化
```ts
import { Http } from 'lwu-request';

const request = new Http({
	baseUrl: {
		// 开发环境域名，此处仅为演示
		dev: 'demo-api.test.com',
		// 生产环境域名，此处仅作为演示
		pro: 'api.test.com'
	},
	// 业务错误代码拦截处理，里面的业务逻辑可自定义，此处为演示
	errorHandleByCode: (code: number, errMsg?: string) => {
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
});
```

#### REQUEST 请求示例
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

#### GET 请求示例
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

#### POST 请求示例
```ts
request.post('/user/save', {
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

#### PUT 请求示例
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

#### DELETE 请求示例
```ts
request.delete('/user/delete', {
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

#### 携带 `task_id` 请求示例
```ts
let requestTask = request.get('/user/info', {
	user_id: 1
}, {
	task_id: `user-info-${1}-${new Date().getTime()}`
})
	.then((res) => {
		// 此处可自定义业务逻辑
	})
	.catch((err) => {
		// 此处仅为演示
		console.error('请求服务异常');
	});
```

#### 中断请求示例
```ts
// 中断当前请求
request.abort();
// 中断指定task_id请求
request.abort('user-info-1-1679735369814');
```

#### 自动携带请求token示例
+ 增加配置，示例中以 `body` 方式为例
```ts
{
	// 省略已有配置内容
	...,
	/**
     * 请求携带token的方式，有效值：`header`、`body`，`header` 方式时需要注意后端开启对应的header跨域白名单
     */
	takeTokenMethod: 'body',
	/**
     * 请求携带token的字段名称，header方式默认为 `Authorization`
     */
	takenTokenKeyName: 'user_token',
	/**
     * 自定义获取token处理程序，通过promise返回最新token值即可
     * + `1.0.2` 及以上版本支持
     */
	tokenValue: () => {
		return new Promise((resolve, _) => {
			// 此处仅作为获取最新token的演示，使用try catch的作用是当没有获取到token时可以给请求库返回 `false`，请求库将会自动不带token往下继续请求。
			try {
                const token = Oauth.get(Oauth).userToken;
			    token && resolve(token);
                resolve('');
            } catch (error) {
                resolve(false);
            }
		});
	},
}
```

#### 统一拦截API错误示例
+ 增加如下配置：
```ts
{
    // 省略已有配置内容
    ...,
    /**
     * API错误拦截处理程序，请根据业务实际情况灵活设置
     * + `1.1.0` 及以上版本支持
     * @param data API返回内容
     * @param args uniapp请求API回调结果
     */
    apiErrorInterception: (data: Data, args?: UniApp.RequestSuccessCallbackResult) => {
        if (data.code !== 1) {
            msg({ title: '请求失败' });
        }
    }
}
```

### 请求完整配置
#### 默认配置内容
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
	 * 运行环境，有效值：`'h5'`、`'uniapp'`，默认为 `'uniapp'`
	 * + `h5`: 运行在浏览器环境，使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 发送请求
	 * + `uniapp`: 运行在uniapp环境，使用 [`uni.request`](https://uniapp.dcloud.net.cn/api/request/request.html) 发送请求
	 * + `1.7.0` 及以上版本支持
	 */
	env: 'uniapp',
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
	 * + `reject` 参数可以自定义抛出异常，需要 `v1.8.2` 及以上版本支持
	 */
	before: (res: BeforeRequestCallbackResult, reject?: (reason?: any) => void) => {
		// 对返回值做一些操作，比如在 header 里面增加自定义校验字段等场景
		return res;
	},
	/**
	 * 自定义请求后拦截
	 * + `1.3.12` 及以上版本支持。
	 * + `reject` 参数可以自定义抛出异常，需要 `v1.8.2` 及以上版本支持
	 */
	after: (res: AfterRequestCallbackResult, reject?: (reason?: any) => void) => {
		// 对返回值做一些操作，比如对返回内容做二次转化解析等
		return res;
	},
	/**
	 * 自定义请求头信息
	 * + `1.3.12` 及以上版本支持。
	 */
	header: {},
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
	 * + `reject` 参数可以自定义抛出异常，需要 `v1.8.2` 及以上版本支持
	 * 
     * @param code 
     * @param errMsg 
     * @returns 
     */
    errorHandleByCode: (code: number, errMsg?: string, reject?: (reason?: any) => void) => {},
    /**
     * API错误拦截处理程序，请根据业务实际情况灵活设置
	 * + `reject` 参数可以自定义抛出异常，需要 `v1.8.2` 及以上版本支持
     * @param data API返回内容
     * @param args uniapp请求API回调结果
     */
    apiErrorInterception: (data: any, args?: UniApp.RequestSuccessCallbackResult, reject?: (reason?: any) => void) => {},
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
	 * 自定义获取task_id处理程序，通过promise返回最新task_id值即可
	 * + `1.5.11` 及以上版本支持
	 */
	taskIdValue: undefined,
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
    retryDeadline: 10000,
	/**
	 * `loading` 动画请求多久后开始展示，单位毫秒
	 * + 仅支持请求库默认动画
	 * + `1.7.0` 及以上版本支持
	 */
	loadingStartTime: 0
}
```

### TS类型定义
#### 请求配置类型定义
```ts
interface Config {
	baseUrl: {
		/**
		 * 开发环境域名
		 */
		dev: string;
		/**
		 * 生产环境域名
		 */
		pro: string;
	};
	/**
	 * 调试模式，开启后控制台会显示内部调试打印信息
	 */
	debug?: boolean;
	/**
	 * 运行环境，有效值：`'h5'`、`'uniapp'`、`'mp-weixin'`，默认为 `'uniapp'`
	 * + `h5`: 运行在浏览器环境，使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 发送请求
	 * + `uniapp`: 运行在uniapp环境，使用 [`uni.request`](https://uniapp.dcloud.net.cn/api/request/request.html) 发送请求
	 * + `mp-weixin`: 运行在微信小程序环境，使用 [`wx.request`](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html) 发送请求
	 * + `1.7.0` 及以上版本支持
	 */
	env?: 'h5' | 'uniapp' | 'mp-weixin';
	/**
	 * 请求过程是否显示loading
	 */
	loading?: boolean;
	/**
	 * 请求中loading弹窗的提示文本，默认为 `'请求中...'`
	 */
	loadingText?: string;
	/**
	 * 自定义请求前拦截
	 * + `1.3.12` 及以上版本支持。
	 * + reject 参数需要 `v1.8.2` 及以后版本支持
	 */
	before?: Function;
	/**
	 * 自定义请求后拦截
	 * + `1.3.12` 及以上版本支持。
	 * + reject 参数需要 `v1.8.2` 及以后版本支持
	 */
	after?: Function;
	// 下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
	/**
	 * 自定义请求头信息
	 * + `1.3.12` 及以上版本支持。
	 */
	header?: object;
	/**
	 * 请求超时时间，单位ms
	 */
	timeout?: number;
	/**
	 * 请求方式，有效值：`'GET'`、`'POST'`、`'PUT'`、`'DELETE'`、`'CONNECT'`、`'HEAD'`、`'OPTIONS'`、`'TRACE'`
	 */
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE';
	/**
	 * 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse
	 */
	dataType?: string | 'json' | '其他';
	/**
	 * 设置响应的数据类型。合法值：`text`、`arraybuffer`
	 */
	responseType?: string | 'text' | 'arraybuffer';
	/**
	 * 验证 ssl 证书
	 */
	sslVerify?: boolean;
	/**
	 * 跨域请求时是否携带凭证（cookies）
	 */
	withCredentials?: boolean;
	/**
	 * DNS解析时优先使用ipv4
	 */
	firstIpv4?: boolean;
	/**
	 * 网络错误代码拦截处理程序，请根据业务实际情况灵活设置
	 * + reject 参数需要 `v1.8.2` 及以后版本支持
	 *
	 * @param code http网络状态码，其中 `404` 为请求地址未找到、`408` 为请求超时、`1009` 为客户端网络不可用
	 * @param errMsg
	 * @returns
	 */
	errorHandleByCode?: (code: number, errMsg?: string, reject?: (reason?: any) => void) => void;
	/**
	 * API错误拦截处理程序，请根据业务实际情况灵活设置
	 * + reject 参数需要 `v1.8.2` 及以后版本支持
	 * @param data API返回内容
	 * @param args uniapp请求API回调结果
	 */
	apiErrorInterception?: (data: any, args?: UniApp.RequestSuccessCallbackResult, reject?: (reason?: any) => void) => void;
	/**
	 * API成功状态码
	 * + `1.2.0` 及以上版本支持
	 * + 设置该参数后，API业务失败时将直接抛出异常，开发者需要在 `catch` 中捕获API返回的错误信息，或者在 `apiErrorInterception` 中统一捕获API返回的错误信息
	 */
	xhrCode?: number|string;
	/**
	 * 语义化接口响应状态码字段名称，一般为 `code`
	 * + `1.2.0` 及以上版本支持
	 */
	xhrCodeName?: string;
	/**
	 * 网络异常或者断网处理程序，建议更新缓存中是否断网或者网络繁忙的标识以便前端页面展示没有网络或者断网的通用异常页面
	 * + 保留参数，`v1.6.1` 版本开始断网判断通过 `errorHandleByCode` 处理，见[如何自定义断网场景](https://lwur.fdproxy.cn/advanced.html#如何自定义断网场景)
	 * @returns
	 */
	networkExceptionHandle?: (code?: number) => void;
	/**
	 * 请求成功时接口响应描述信息字段名称，默认为 `'msg'`
	 */
	requestSuccessResponseMsgName?: string;
	/**
	 * 缓存中token字段名称，方便请求库从缓存获取token完成自动填充token
	 */
	tokenStorageKeyName?: string;
	/**
	 * 自定义获取task_id处理程序，通过promise返回最新task_id值即可
	 * + `1.5.11` 及以上版本支持
	 * @returns
	 */
	taskIdValue?: (data: any, options?: object) => Promise<unknown>;
	/**
	 * 自定义获取token处理程序，通过promise返回最新token值即可
	 * + `1.0.2` 及以上版本支持
	 * @returns
	 */
	tokenValue?: () => Promise<unknown>;
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
	buildQueryString?: (obj: object) => string;
	/**
	 * 请求携带token的方式，有效值：`header`、`body`
	 */
	takeTokenMethod?: 'header' | 'body';
	/**
	 * 请求携带token的字段名称，header方式默认为 `Authorization`
	 */
	takenTokenKeyName?: string;
	/**
	 * 是否自动刷新token
	 */
	autoRefreshToken?: boolean;
	/**
	 * 自动刷新token程序，返回promise，`autoRefreshToken` 为 `true`时生效
	 * + `refreshToken` 为旧的token返回
	 */
	refreshTokenHandle?: (refreshToken?: string) => Promise<string>;
	/**
	 * 自定义token失效的错误代码，便于请求库内部做自动刷新token判断
	 */
	tokenExpiredCode?: number|string;
	/**
	 * token失效错误代码类型，支持 `httpStatusCode` 和 `apiResponseCode`，默认为 `httpStatusCode`
	 * + `httpStatusCode`: 原生http请求状态码
	 * + `apiResponseCode`: 接口响应错误码
	 *
	 * + `1.5.11` 及以上版本支持
	 */
	tokenExpiredCodeType?: 'httpStatusCode' | 'apiResponseCode';
	/**
	 * 请求失败是否自动重试
	 */
	retry?: boolean;
	/**
	 * 请求失败自动重试次数
	 */
	retryCount?: number;
	/**
	 * 请求失败重试次数是否自动计算，失败重试次数上限依然是设置的retryCount值
	 */
	retryCountAutoOffRetry?: boolean;
	/**
	 * 请求失败用来生成重试时间上限（指数退避算法需要），单位秒
	 */
	retryMaximum?: number;
	/**
	 * 请求失败执行重试时间上限（指数退避算法需要），达到上限后不再重试
	 */
	retryDeadline?: number;
	/**
	 * `loading` 动画请求多久后开始展示，单位毫秒
	 * + 仅支持请求库默认动画
	 * + `1.7.0` 及以上版本支持
	 */
	loadingStartTime?: number;
}
```

#### 请求参数类型定义
```ts
interface RequestOptions {
	/**
	 * 请求任务ID，一般在过滤重复请求，中止请求时使用
	 */
	task_id?: string;
	/**
	 * 自定义请求前拦截
	 * + reject 参数需要 `v1.8.2` 及以后版本支持
	 */
	before?: Function;
	/**
	 * 自定义请求后拦截
	 * + reject 参数需要 `v1.8.2` 及以后版本支持
	 */
	after?: Function;
	/**
	 * 自定义请求头
	 */
	header?: object;
	/**
	 * 请求方式
	 */
	method?: Method;
	/**
	 * 请求超时时间
	 */
	timeout?: number;
	/**
	 * 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse
	 */
	dataType?: string | 'json' | '其他';
	/**
	 * 设置响应的数据类型。合法值：`text`、`arraybuffer`
	 */
	responseType?: string | 'text' | 'arraybuffer';
	/**
	 * 验证 ssl 证书
	 */
	sslVerify?: boolean;
	/**
	 * 跨域请求时是否携带凭证（cookies）
	 */
	withCredentials?: boolean;
	/**
	 * DNS解析时优先使用ipv4
	 */
	firstIpv4?: boolean;
	/**
	 * 请求失败自动重试次数
	 */
	retryCount?: number;
	/**
	 * 请求过程是否显示loading
	 * + `1.3.0` 及以上版本支持
	 */
	loading?: boolean;
	/**
	 * 请求中loading弹窗的提示文本
	 * + `1.3.0` 及以上版本支持
	 */
	loadingText?: string;
	/**
	 * 自定义请求域名，用于设置单次请求的域名地址，常用于上传下载场景。
	 * + `1.4.10` 及以上版本支持
	 */
	domain?: string;
	/**
	 * 是否自动携带token，默认为 `true`
	 * + `1.6.3` 及以上版本支持
	 */
	autoTakeToken?: boolean;
	/**
	 * 是否返回请求原始响应内容，默认为 `false`
	 * + 为 `true` 时，返回的响应内容为平台请求API返回的原始响应内容，包含响应头、响应状态码等信息
	 * + `1.8.0` 及以上版本支持
	 */
	originalResponse?: boolean;
};
```
