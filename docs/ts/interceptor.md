# 请求拦截器
这里是 `before` 请求前拦截和 `after` 请求后拦截返回的类型定义。

## `before` 请求前拦截返回类型定义
```ts
interface BeforeRequestCallbackResult {
    data?: any;
    header?: any;
    method?: Method;
    url?: string;
};
```

## `after` 请求后拦截返回类型定义
```ts
interface AfterRequestCallbackResult {
    data?: any;
    cookie?: any;
    errMsg?: string;
    header?: any;
    statusCode?: number;
}
```