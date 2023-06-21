---
outline: deep
---

# 进阶使用
这里是请求库进阶使用示例教程，目前包括了 `自动携带token`、`自动刷新token`、`http网络错误自定义处理`、`api业务错误自定义处理`、`断网场景自定义处理`、`请求超时自定义处理`等场景。

## 自动携带token

### 场景介绍
在用户端很多用户信息相关的API请求都需要**token校验**，所以为了开发者更方便的调用接口，请求库实现了**自动携带token**，并且秉持着`开发者高度自由化`的原则为开发者提供了 `tokenValue` 来让开发者直接使用自己的获取token的业务方法

### 使用示例

```ts
// 导入请求库
import { Http } from 'lwu-request';
// 初始化请求库
const http = new Http({
    baseUrl: {
        dev: 'https://api-dev.test.cn', // 开发环境域名
        pro: 'https://api.test.cn' // 生产环境域名
    },
    takeTokenMethod: 'body',
    takenTokenKeyName: 'user_token',
    tokenValue: () => {
        return new Promise((resolve, reject) => {
            // 模拟获取token逻辑
            resolve('111111');
        });
    }
});
```

### 配置参数说明
| 参数名 | 参数类型 | 是否必填 | 说明
| --- | --- | --- | ---
| baseUrl | `{ dev: string; pro: string }` | 是 | 见 [baseUrl](/config/global#baseurl)
| takeTokenMethod | `'header' \| 'body'` | 否 | 见 [takeTokenMethod](/config/global#taketokenmethod)
| takenTokenKeyName | `string` | 否 | 见 [takenTokenKeyName](/config/global#takentokenkeyname)
| tokenValue | `() => Promise<string>` | 是 | 见 [tokenValue](/config/global#tokenvalue)

## 自动刷新token

### 场景介绍
有的请求API的token会有时效限制，所以在用户未主动退出登录的时候，请求API的token失效时不应该让用户感知，为此系统都会做自动刷新token的处理，为了方便开发者更专注业务开发请求库实现了**自动刷新token**，并且秉持着`开发者高度自由化`的原则为开发者提供了 `refreshTokenHandle` 来让开发者直接使用自己的刷新token的业务方法

### 使用示例

```ts
// 导入请求库
import { Http } from 'lwu-request';
// 初始化请求库
const http = new Http({
    baseUrl: {
        dev: 'https://api-dev.test.cn', // 开发环境域名
        pro: 'https://api.test.cn' // 生产环境域名
    },
    xhrCodeName: 'code',
    tokenExpiredCode: 0,
    tokenExpiredCodeType: 'apiResponseCode',
    autoRefreshToken: true,
    refreshTokenHandle: (refreshToken?: string) => {
        // 打印旧的Token
        console.log(refreshToken, '旧的token');
        return new Promise((resolve, reject) => {
            // 模拟获取新的token
            resolve('BbLKBJLO6PLePxzZeXOa67ffPmdvXywm8vU4y59HbWY=');
        });
    }
});
```
### 配置参数说明
| 参数名 | 参数类型 | 是否必填 | 说明
| --- | --- | --- | ---
| baseUrl | `{ dev: string; pro: string }` | 是 | 见 [baseUrl](/config/global#baseurl)
| xhrCodeName | `string` | 否 | 见 [xhrCodeName](/config/global#xhrcodename)
| tokenExpiredCode | `number` | 否 | 见 [tokenExpiredCode](/config/global#tokenexpiredcode)
| tokenExpiredCodeType | `'httpStatusCode' \| 'apiResponseCode'` | 否 | 见 [tokenExpiredCodeType](/config/global#tokenexpiredcodetype)
| autoRefreshToken | `boolean` | 是，该场景下固定为 `true` | 见 [autoRefreshToken](/config/global#autorefreshtoken)
| tokenValue | `() => Promise<string>` | 是 | 见 [tokenValue](/config/global#tokenvalue)

## http网络错误自定义处理

### 场景介绍
在`REST API`中一般接口响应状态码都会和 [HTTP 状态码](https://baike.baidu.com/item/HTTP%E7%8A%B6%E6%80%81%E7%A0%81/5053660?fr=aladdin) 保持同步，所以请求库为开发者提供了 `errorHandleByCode` 来让开发者统一操作异常

### 使用示例

```ts
// 导入请求库
import { Http } from 'lwu-request';
// 初始化请求库
const http = new Http({
    baseUrl: {
        dev: 'https://api-dev.test.cn', // 开发环境域名
        pro: 'https://api.test.cn' // 生产环境域名
    },
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

### 配置参数说明
| 参数名 | 参数类型 | 是否必填 | 说明
| --- | --- | --- | ---
| baseUrl | `{ dev: string; pro: string }` | 是 | 见 [baseUrl](/config/global#baseurl)
| errorHandleByCode | `(code: number, errMsg?: string) => void` | 是 | 见 [errorHandleByCode](/config/global#errorhandlebycode)

## api业务错误自定义处理

### 场景介绍
在非 `REST API` 场景中接口返回的错误码一般都是自己单独定义的错误码，所以请求库给开发者提供了 `apiErrorInterception` 来让开发者根据自己的错误码规范统一操作异常

### 使用示例

```ts
// 导入请求库
import { Http } from 'lwu-request';
// 初始化请求库
const http = new Http({
    baseUrl: {
        dev: 'https://api-dev.test.cn', // 开发环境域名
        pro: 'https://api.test.cn' // 生产环境域名
    },
    xhrCode: 0,
    xhrCodeName: 'code',
    apiErrorInterception: (code: number, errMsg?: string) => {
        // 此处仅为演示，不是真实数据，这里可以根据返回的 `code` 根据自己的错误规范灵活处理
        msg({ title: errMsg });
    }
});
```

### 配置参数说明
| 参数名 | 参数类型 | 是否必填 | 说明
| --- | --- | --- | ---
| baseUrl | `{ dev: string; pro: string }` | 是 | 见 [baseUrl](/config/global#baseurl)
| xhrCode | `number` | 否 | 见 [xhrCode](/config/global#xhrcode)
| xhrCodeName | `string` | 否 | 见 [xhrCodeName](/config/global#xhrcodename)
| apiErrorInterception | `(code: number, errMsg?: string) => void` | 是 | 见 [apiErrorInterception](/config/global#apierrorinterception)

## 如何自定义断网场景

### 场景介绍
断网或者网络连接异常的处理是一个成熟的软件应用基本要求，所以请求库也支持开发者全局统一处理请求时的断网场景，目前需要在 `errorHandleByCode` 中监听返回的 `code` 来实现断网场景。

### 使用示例

```ts
// 导入请求库
import { Http } from 'lwu-request';
// 初始化请求库
const http = new Http({
    baseUrl: {
        dev: 'https://api-dev.test.cn', // 开发环境域名
        pro: 'https://api.test.cn' // 生产环境域名
    },
    errorHandleByCode: (code: number, errMsg?: string) => {
        // 监听断网场景，这里的code为固定的1009，参考的HTTP状态码的断网标识
        if (code === 1009) {
            // 这里建议去更新缓存中的网络状态标识，或者直接跳转到断网提示界面
            console.log('当前网络连接异常，请求中断');
        }
    }
});
```

### 配置参数说明
| 参数名 | 参数类型 | 是否必填 | 说明
| --- | --- | --- | ---
| baseUrl | `{ dev: string; pro: string }` | 是 | 见 [baseUrl](/config/global#baseurl)
| errorHandleByCode | `(code: number, errMsg?: string) => void` | 是 | 见 [errorHandleByCode](/config/global#errorhandlebycode)

## 请求超时自定义处理

### 场景介绍
请求过程中不应该长时间让用户一直等待，所以请求库提供了请求超时配置，目前需要在 `errorHandleByCode` 中监听返回的 `code` 来实现请求超时提示的场景。

### 使用示例

```ts
// 导入请求库
import { Http } from 'lwu-request';
// 初始化请求库
const http = new Http({
    baseUrl: {
        dev: 'https://api-dev.test.cn', // 开发环境域名
        pro: 'https://api.test.cn' // 生产环境域名
    },
    errorHandleByCode: (code: number, errMsg?: string) => {
        // 监听请求超时场景，这里的code为固定的408，参考的HTTP状态码的断网标识
        if (code === 408) {
            // 这里仅作为演示使用，非真实数据
            msg({ title: '当前请求超时' });
        }
    }
});
```