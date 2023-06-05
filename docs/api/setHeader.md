---
outline: deep
---

# setHeader <Badge type="tip" text="v1.5.0+" />

设置请求头信息

## 使用示例
### 基本使用
```ts
request.setHeader({
  ...res.header,
  test: 222,
});
```

### `请求前拦截`使用
::: tip 提示
示例中的 **BeforeRequestCallbackResult** [`点此查看定义`](/ts/interceptor.html#before-请求前拦截返回类型定义)
:::
```ts
import {
  type BeforeRequestCallbackResult,
  Http,
} from "lwu-request";

// 仅供示例使用，并不是真实的URL
const requestUrl = "https://demo.com";
const http = new Http({
  baseUrl: {
    dev: requestUrl,
    pro: requestUrl,
  },
  before: (res: BeforeRequestCallbackResult) => {
    // console.log(res, '请求前拦截');
    http.setHeader({
      ...res.header,
      test: 222,
    });
  }
});
```
