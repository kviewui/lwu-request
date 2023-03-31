## LWU-REQUEST
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
            } catch (error) {
                resolve(false);
            }
		});
	},
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
     * 请求过程是否显示loading
     */
    loading?: boolean;
    /**
     * 请求中loading弹窗的提示文本，默认为 `'请求中...'`
     */
    loadingText?: string;
    // 下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
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
    dataType?: string;
    /**
     * 设置响应的数据类型。合法值：`text`、`arraybuffer`
     */
    responseType?: string;
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
     * 业务错误代码拦截处理程序，请根据业务实际情况灵活设置
     * @param code 
     * @param errMsg 
     * @returns 
     */
    errorHandleByCode: (code: number, errMsg?: string) => void;
    /**
     * 网络异常或者断网处理程序，建议更新缓存中是否断网或者网络繁忙的标识以便前端页面展示没有网络或者断网的通用异常页面
     * @returns
     */
    networkExceptionHandle?: () => void;
    /**
     * 请求成功时接口响应描述信息字段名称，默认为 `'msg'`
     */
    requestSuccessResponseMsgName?: string;
    /**
     * 缓存中token字段名称，方便请求库从缓存获取token完成自动填充token
     */
    tokenStorageKeyName?: string;
    /**
     * 请求携带token的方式，有效值：`header`、`body`
     */
    takeTokenMethod?: 'header' | 'body';
    /**
     * 请求携带token的字段名称，header方式默认为 `Authorization`
     */
    takenTokenKeyName?: string;
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
     * 是否自动刷新token
     */
    autoRefreshToken?: boolean;
    /**
     * 自动刷新token程序，返回promise，`autoRefreshToken` 为 `true`时生效
     */
    refreshTokenHandle?: () => Promise<unknown>;
    /**
     * 自定义token失效的错误代码，便于请求库内部做自动刷新token判断
     */
    tokenExpiredCode?: number;
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
}
```

#### 请求参数类型定义
```ts
interface RequestOptions {
    task_id?: string;
    before?: Function;
    after?: Function;
    header?: object;
    method?: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
    timeout?: number;
    dataType?: string;
    responseType?: string;
    sslVerify?: boolean;
    withCredentials?: boolean;
    firstIpv4?: boolean;
    retryCount?: number;
};
```
