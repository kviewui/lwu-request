import { config } from 'process';
import type { Config } from '../types/config';
import type { RequestOptions } from '../types/request';

/**
 * 获取请求配置
 * @author KviewUI <kviewui@163.com>
 * @param {Config} config - 配置信息
 * @returns 
 */
export const useConfig = (config: Config) => {
    return {
        baseUrl: config.baseUrl,
        /**
         * 调试模式，开启后控制台会显示内部调试打印信息
         */
        debug: config.debug ?? false,
        /**
         * 请求过程是否显示loading
         */
        loading: config.loading ?? true,
        /**
         * 请求中loading弹窗的提示文本，默认为 `'请求中...'`
         */
        loadingText: config.loadingText ?? '请求中...',
        /**
         * 自定义请求前拦截
         * + `1.3.12` 及以上版本支持。
         */
        before: config.before,
        /**
         * 自定义请求后拦截
         * + `1.3.12` 及以上版本支持。
         */
        after: config.after,
        // 下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
        /**
         * 自定义请求头信息
         * + `1.3.12` 及以上版本支持。
         */
        header: config.header ?? {},
        /**
         * 请求超时时间，单位`ms`
         */
        timeout: config.timeout ?? 6000,
        /**
         * 请求方式，有效值：`'GET'`、`'POST'`、`'PUT'`、`'DELETE'`、`'CONNECT'`、`'HEAD'`、`'OPTIONS'`、`'TRACE'`
         */
        method: config.method ?? 'GET',
        /**
         * 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse
         */
        dataType: config.dataType ?? 'json',
        /**
         * 设置响应的数据类型。合法值：`'text'`、`'arraybuffer'`
         */
        responseType: config.responseType ?? 'text',
        /**
         * 验证 ssl 证书
         */
        sslVerify: config.sslVerify ?? true,
        /**
         * 跨域请求时是否携带凭证（cookies）
         */
        withCredentials: config.withCredentials ?? false,
        /**
         * DNS解析时优先使用ipv4
         */
        firstIpv4: config.firstIpv4 ?? false,
        /**
         * 业务错误代码拦截处理程序，请根据业务实际情况灵活设置
         * @param code http网络状态码，其中 `404` 为请求地址未找到、`408` 为请求超时、`1009` 为客户端网络不可用
         * @param errMsg 
         * @returns 
         */
        errorHandleByCode: config.errorHandleByCode,
        /**
         * API错误拦截处理程序，请根据实际情况灵活设置
         */
        apiErrorInterception: config.apiErrorInterception,
        /**
         * 网络异常或者断网处理程序，建议更新缓存中是否断网或者网络繁忙的标识以便前端页面展示没有网络或者断网的通用异常页面
         * + 保留参数，`v1.6.1` 版本开始断网判断通过 `errorHandleByCode` 处理，见[如何自定义断网场景](https://lwur.fdproxy.cn/advanced.html#如何自定义断网场景)
         * @returns
         */
        networkExceptionHandle: () => {},
        /**
         * API成功状态码
         * + `1.2.0` 及以上版本支持
         * + 设置该参数后，API业务失败时将直接抛出异常，开发者需要在 `catch` 中捕获API返回的错误信息，或者在 `apiErrorInterception` 中统一捕获API返回的错误信息
         */
        xhrCode: config.xhrCode,
        /**
         * 语义化接口响应状态码字段名称，默认为 `code`
         * + `1.2.0` 及以上版本支持
         */
        xhrCodeName: config.xhrCodeName ?? 'code',
        /**
         * 请求成功时接口响应描述信息字段名称，默认为 `'msg'`
         */
        requestSuccessResponseMsgName: config.requestSuccessResponseMsgName ?? 'msg',
        /**
         * 缓存中token字段名称，方便请求库从缓存获取token完成自动填充token
         */
        tokenStorageKeyName: config.tokenStorageKeyName ?? '',
        /**
         * 自定义获取task_id处理程序，通过promise返回最新task_id值即可
         * + `1.5.11` 及以上版本支持
         */
        taskIdValue: config.taskIdValue,
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
        tokenValue: config.tokenValue,
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
        buildQueryString: config.buildQueryString,
        /**
         * 请求携带token的方式，有效值：header、body
         */
        takeTokenMethod: config.takeTokenMethod ?? 'header',
        /**
         * 请求携带token的字段名称，header方式默认为 `Authorization`
         */
        takenTokenKeyName: config.takenTokenKeyName ?? 'Authorization',
        /**
         * 是否自动刷新token
         */
        autoRefreshToken: false,
        /**
         * 自动刷新token程序，返回promise，`autoRefreshToken` 为 `true`时生效
         */
        refreshTokenHandle: config.refreshTokenHandle,
        /**
         * 自定义token失效的错误代码，便于请求库内部做自动刷新token判断
         */
        tokenExpiredCode: config.tokenExpiredCode ?? 403,
        /**
         * token失效错误代码类型，支持 `httpStatusCode` 和 `apiResponseCode`，默认为 `httpStatusCode`
         * + `httpStatusCode`: 原生http请求状态码
         * + `apiResponseCode`: 接口响应错误码
         * 
         * + `1.5.11` 及以上版本支持
         */
        tokenExpiredCodeType: config.tokenExpiredCodeType ?? 'httpStatusCode',
        /**
         * 请求失败是否自动重试
         */
        retry: config.retry ?? false,
        /**
         * 请求失败自动重试次数
         */
        retryCount: config.retryCount ?? 3,
        /**
         * 请求失败重试次数是否自动计算，失败重试次数上限依然是设置的retryCount值
         */
        retryCountAutoOffRetry: config.retryCountAutoOffRetry ?? true,
        /**
         * 请求失败用来生成重试时间上限（指数退避算法需要），单位秒
         */
        retryMaximum: config.retryMaximum ?? 64,
        /**
         * 请求失败执行重试时间上限（指数退避算法需要），达到上限后不再重试
         */
        retryDeadline: config.retryDeadline ?? 10000
    }
}

/**
 * 获取请求配置
 * @param config 
 */
export const useReqConfig = (config: RequestOptions) => {
    return {
        /**
         * 请求任务ID，一般在过滤重复请求，中止请求时使用
         */
        task_id: config.task_id ?? '',
        /**
         * 自定义请求前拦截
         */
        before: config.before,
        /**
         * 自定义请求后拦截
         */
        after: config.after,
        /**
         * 自定义请求头
         */
        header: config.header,
        /**
         * 请求方式
         */
        method: config.method ?? 'GET',
        /**
         * 请求超时时间
         */
        timeout: config.timeout ?? 6000,
        /**
         * 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse
         */
        dataType: config.dataType ?? 'json',
        /**
         * 设置响应的数据类型。合法值：`text`、`arraybuffer`
         */
        responseType: config.responseType ?? 'text',
        /**
         * 验证 ssl 证书
         */
        sslVerify: config.sslVerify || false,
        /**
         * 跨域请求时是否携带凭证（cookies）
         */
        withCredentials: config.withCredentials || false,
        /**
         * DNS解析时优先使用ipv4
         */
        firstIpv4: config.firstIpv4 || false,
        /**
         * 请求失败自动重试次数
         */
        retryCount: config.retryCount ?? 3,
        /**
         * 请求过程是否显示loading
         * + `1.3.0` 及以上版本支持
         */
        loading: config.loading || true,
        /**
         * 请求中loading弹窗的提示文本
         * + `1.3.0` 及以上版本支持
         */
        loadingText: config.loadingText ?? '请求中...',
        /**
         * 自定义请求域名，用于设置单次请求的域名地址，常用于上传下载场景。
         * + `1.4.10` 及以上版本支持
         */
        domain: config.domain ?? '',
        /**
         * 是否自动携带token，默认为 `true`
         * + `1.6.3` 及以上版本支持
         */
        autoTakeToken: config.autoTakeToken || true
    }
};