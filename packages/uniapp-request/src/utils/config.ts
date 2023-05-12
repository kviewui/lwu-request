import type { Config } from '../types/config';

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
        // 下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
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
         * @param code 
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
         * @returns
         */
        networkExceptionHandle: () => {},
        /**
         * 请求成功时接口响应描述信息字段名称，默认为 `'msg'`
         */
        requestSuccessResponseMsgName: config.requestSuccessResponseMsgName ?? 'msg',
        /**
         * 缓存中token字段名称，方便请求库从缓存获取token完成自动填充token
         */
        tokenStorageKeyName: config.tokenStorageKeyName ?? '',
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