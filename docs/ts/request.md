# 请求配置
这里是单次请求时的配置内容类型。

## 类型定义
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