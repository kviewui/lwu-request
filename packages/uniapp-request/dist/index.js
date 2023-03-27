"use strict";Object.defineProperty(exports, "__esModule", {value: true});var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/utils/prompt.ts
var loading = (params) => {
  uni.showLoading({
    title: params.title,
    mask: params.mask || true
  });
};

// src/utils/config.ts
var useConfig = (config) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
  return {
    baseUrl: config.baseUrl,
    /**
     * 调试模式，开启后控制台会显示内部调试打印信息
     */
    debug: (_a = config.debug) != null ? _a : false,
    /**
     * 请求过程是否显示loading
     */
    loading: (_b = config.loading) != null ? _b : true,
    /**
     * 请求中loading弹窗的提示文本，默认为 `'请求中...'`
     */
    loadingText: (_c = config.loadingText) != null ? _c : "\u8BF7\u6C42\u4E2D...",
    // 下面配置项参考 [uniapp 网络请求API](https://uniapp.dcloud.io/api/request/request.html)
    /**
     * 请求超时时间，单位`ms`
     */
    timeout: (_d = config.timeout) != null ? _d : 6e3,
    /**
     * 请求方式，有效值：`'GET'`、`'POST'`、`'PUT'`、`'DELETE'`、`'CONNECT'`、`'HEAD'`、`'OPTIONS'`、`'TRACE'`
     */
    method: (_e = config.method) != null ? _e : "GET",
    /**
     * 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse
     */
    dataType: (_f = config.dataType) != null ? _f : "json",
    /**
     * 设置响应的数据类型。合法值：`'text'`、`'arraybuffer'`
     */
    responseType: (_g = config.responseType) != null ? _g : "text",
    /**
     * 验证 ssl 证书
     */
    sslVerify: (_h = config.sslVerify) != null ? _h : true,
    /**
     * 跨域请求时是否携带凭证（cookies）
     */
    withCredentials: (_i = config.withCredentials) != null ? _i : false,
    /**
     * DNS解析时优先使用ipv4
     */
    firstIpv4: (_j = config.firstIpv4) != null ? _j : false,
    /**
     * 业务错误代码拦截处理程序，请根据业务实际情况灵活设置
     * @param code 
     * @param errMsg 
     * @returns 
     */
    errorHandleByCode: config.errorHandleByCode,
    /**
     * 网络异常或者断网处理程序，建议更新缓存中是否断网或者网络繁忙的标识以便前端页面展示没有网络或者断网的通用异常页面
     * @returns
     */
    networkExceptionHandle: () => {
    },
    /**
     * 请求成功时接口响应描述信息字段名称，默认为 `'msg'`
     */
    requestSuccessResponseMsgName: (_k = config.requestSuccessResponseMsgName) != null ? _k : "msg",
    /**
     * 缓存中token字段名称，方便请求库从缓存获取token完成自动填充token
     */
    tokenStorageKeyName: (_l = config.tokenStorageKeyName) != null ? _l : "",
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
    takeTokenMethod: (_m = config.takeTokenMethod) != null ? _m : "header",
    /**
     * 请求携带token的字段名称，header方式默认为 `Authorization`
     */
    takenTokenKeyName: (_n = config.takenTokenKeyName) != null ? _n : "Authorization",
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
    tokenExpiredCode: (_o = config.tokenExpiredCode) != null ? _o : 403,
    /**
     * 请求失败是否自动重试
     */
    retry: (_p = config.retry) != null ? _p : false,
    /**
     * 请求失败自动重试次数
     */
    retryCount: (_q = config.retryCount) != null ? _q : 3,
    /**
     * 请求失败重试次数是否自动计算，失败重试次数上限依然是设置的retryCount值
     */
    retryCountAutoOffRetry: (_r = config.retryCountAutoOffRetry) != null ? _r : true,
    /**
     * 请求失败用来生成重试时间上限（指数退避算法需要），单位秒
     */
    retryMaximum: (_s = config.retryMaximum) != null ? _s : 64,
    /**
     * 请求失败执行重试时间上限（指数退避算法需要），达到上限后不再重试
     */
    retryDeadline: (_t = config.retryDeadline) != null ? _t : 1e4
  };
};

// src/http.ts
var makeRetryTimeout = (times, maximum_offretry) => {
  const random_number_milliseconds = Math.floor(Math.random() * 1e3);
  return Math.min(Math.pow(2, times) * 1e3 + random_number_milliseconds, maximum_offretry);
};
var Http = class {
  constructor(config) {
    /**
     * 当前请求任务
     */
    this.currentRequestTask = {
      abort: () => {
      },
      onHeadersReceived: () => {
      },
      offHeadersReceived: () => {
      }
    };
    this.requestTasksName = "LWU-REQUEST-TASKS";
    /**
     * 请求锁
     */
    this.lock = true;
    /**
     * 请求列表
     */
    this.pending = [];
    /**
     * 请求失败自动重试次数
     */
    this.retryCount = 3;
    /**
     * 请求失败用来生成重试时间上限（指数退避算法需要），单位秒
     */
    this.retryMaximum = 64;
    /**
     * 重试等待时间列表
     */
    this.retryTimeout = [];
    /**
     * 重试等待时间上限
     */
    this.retryDeadline = 1e4;
    /**
     * 配置信息
     */
    this.config = {
      baseUrl: {
        pro: "",
        dev: ""
      },
      /**
       * 业务错误代码拦截处理程序，请根据业务实际情况灵活设置
       * @param code 
       * @param errMsg 
       * @returns 
       */
      errorHandleByCode: (code, errMsg) => {
      }
    };
    this.config = __spreadValues({}, useConfig(config));
    if (!this.config.retry) {
      this.retryCount = 0;
    } else {
      if (this.config.retryCountAutoOffRetry) {
        this.retryMaximum = this.config.retryMaximum * 1e3;
        this.retryTimeout = [];
        this.retryDeadline = config.retryDeadline;
        for (let i = 0; i < this.retryCount; i++) {
          if (this.retryDeadline < 0) {
            break;
          }
          const timeout = makeRetryTimeout(i, this.retryMaximum);
          this.retryDeadline -= timeout;
          this.retryTimeout.push(timeout);
        }
        this.retryCount = this.retryTimeout.length;
      }
    }
  }
  /**
   * 请求失败的错误统一处理
   * @param code - 错误码
   * @param message - 自定义错误信息 
   */
  handleError(code, message = "") {
    this.config.errorHandleByCode(code, message);
  }
  interceptor(url, before, after) {
    uni.addInterceptor("request", {
      invoke: (args) => {
        var _a, _b;
        if (this.config.debug) {
          console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A111\u3011${JSON.stringify(args)}`);
        }
        if (this.config.loading) {
          loading({ title: (_a = this.config.loadingText) != null ? _a : "\u8BF7\u6C42\u4E2D..." });
        }
        if ((_b = args == null ? void 0 : args.header) == null ? void 0 : _b.contentType) {
          args.header["content-type"] = args.header.contentType;
          delete args.header.contentType;
        }
        let baseURI = "";
        let debug = false;
        if (process.env.NODE_ENV === "development") {
          baseURI = this.config.baseUrl.dev;
          debug = this.config.debug;
        } else {
          baseURI = this.config.baseUrl.pro;
        }
        let reqUrl = `${baseURI}${url}`;
        if (args.method === "GET") {
          args.data = this.config.buildQueryString && this.config.buildQueryString(args.data) ? this.config.buildQueryString(args.data) : new URLSearchParams(Object.entries(args.data)).toString();
          args.url = `${reqUrl}?${args.data}`;
        } else {
          args.url = reqUrl;
        }
        let token = uni.getStorageSync(this.config.tokenStorageKeyName);
        console.warn(`token \u6D4B\u8BD5\uFF1A${token}`);
        const setToken = () => {
          return new Promise((resolve, _) => {
            token && resolve(token);
            console.warn(`token \u6D4B\u8BD51\uFF1A${token}`);
            this.config.tokenValue && this.config.tokenValue().then((res) => {
              console.warn(`token \u6D4B\u8BD52\uFF1A${res}`);
              res && resolve(res);
            });
          });
        };
        setToken().then((getToken) => {
          console.warn(`token \u6D4B\u8BD53\uFF1A${token}`);
          if (this.config.takeTokenMethod === "header") {
            args.header[this.config.takenTokenKeyName] = getToken;
          }
          if (this, this.config.takeTokenMethod === "body") {
            args.data[this.config.takenTokenKeyName] = getToken;
          }
        });
        if (before) {
          before();
        }
      },
      // 响应拦截
      success: (args) => {
        this.handleError(args.statusCode, args.data[this.config.requestSuccessResponseMsgName]);
        if (this.config.debug) {
          console.warn(`\u3010LwuRequest Debug:\u54CD\u5E94\u62E6\u622A\u3011${JSON.stringify(args)}`);
        }
        if (after) {
          after();
        }
      },
      fail: (err) => {
        if (this.config.debug) {
          console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u5931\u8D25\u3011${JSON.stringify(err)}`);
        }
      },
      complete: (res) => {
        uni.hideLoading();
        if (this.config.debug) {
          console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u5B8C\u6210\u3011${JSON.stringify(res)}`);
        }
      }
    });
  }
  /**
   * 刷新token处理
   */
  refreshToken() {
    if (this.config.refreshTokenHandle) {
      this.config.refreshTokenHandle().then(() => {
        uni.getStorageSync("LWU-REQUEST-CALLBACK")((callback) => {
          callback();
        });
      }).catch(() => {
        this.handleError(this.config.tokenExpiredCode);
      });
    }
  }
  request(url, data = {}, options = {
    header: {},
    method: this.config.method,
    timeout: this.config.timeout,
    dataType: this.config.dataType,
    responseType: this.config.responseType,
    sslVerify: this.config.sslVerify,
    withCredentials: this.config.withCredentials,
    firstIpv4: this.config.firstIpv4,
    retryCount: this.config.retryCount
  }) {
    var _a;
    const requestTasks = uni.getStorageSync(this.requestTasksName);
    if ((options == null ? void 0 : options.task_id) && requestTasks[options == null ? void 0 : options.task_id]) {
      if (this.config.debug) {
        console.warn(`\u3010LwuRequest Debug\u3011\u8BF7\u6C42ID${options.task_id}\u6709\u91CD\u590D\u9879\u5DF2\u81EA\u52A8\u8FC7\u6EE4`);
      }
      (_a = requestTasks[options == null ? void 0 : options.task_id]) == null ? void 0 : _a.abort();
    }
    return new Promise((resolve, reject) => {
      this.interceptor(url, options.before, options.after);
      this.currentRequestTask = uni.request({
        url,
        data,
        header: options.header,
        method: options.method,
        timeout: options.timeout,
        dataType: options.dataType,
        responseType: options.responseType,
        sslVerify: options.sslVerify,
        withCredentials: options.withCredentials,
        firstIpv4: options.firstIpv4,
        success: (res) => {
          if (res.statusCode !== this.config.tokenExpiredCode) {
            resolve(res.data);
          } else {
            this.refreshToken();
            uni.setStorageSync("LWU-REQUEST-CALLBACK", () => {
              resolve(this.request(url, data, options));
            });
          }
        },
        fail: (err) => {
          var _a2;
          this.retryCount = (_a2 = options.retryCount) != null ? _a2 : 3;
          if (this.retryCount === 0) {
            reject(err);
          } else {
            if (this.config.debug) {
              console.warn(`\u3010LwuRequest Debug\u3011\u81EA\u52A8\u91CD\u8BD5\u6B21\u6570\uFF1A${this.retryCount}`);
            }
            this.retryCount--;
            setTimeout(this.request, this.retryTimeout.shift());
            this.config.networkExceptionHandle && this.config.networkExceptionHandle();
          }
        }
      });
      if (options == null ? void 0 : options.task_id) {
        let tasks = [];
        tasks[options == null ? void 0 : options.task_id] = this.currentRequestTask;
        uni.setStorageSync(this.requestTasksName, tasks);
      }
    });
  }
  get(url, data = {}, options = {}) {
    return this.request(url, data, __spreadValues({
      method: "GET"
    }, options));
  }
  post(url, data = {}, options = {}) {
    return this.request(url, data, __spreadValues({
      method: "POST"
    }, options));
  }
  put(url, data = {}, options = {}) {
    return this.request(url, data, __spreadValues({
      method: "POST"
    }, options));
  }
  delete(url, data = {}, options = {}) {
    return this.request(url, data, __spreadValues({
      method: "DELETE"
    }, options));
  }
  /**
   * 中断请求，不传 `task_id` 时默认中断当前任务
   * @param task_id 
   */
  abort(task_id = "") {
    const requestTask = uni.getStorageSync(this.requestTasksName);
    if (requestTask[task_id]) {
      requestTask[task_id].abort();
    } else {
      this.currentRequestTask.abort();
    }
  }
};


exports.Http = Http;
