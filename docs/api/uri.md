---
outline: deep
---

# URI <Badge type="tip" text="v1.6.1+" />
获取当前请求域名，内部已经做了编译环境判断

::: danger 注意
当请求配置中使用了 [`domain`](/config/request) 时，需要手动重新清空临时的请求域名后才会获取初始化时的域名，示例如下：
```ts
request
  .config({
    domain: 'https://api.test.cn'
  })
  .post('/v1/user/userinfo')

// 清空 `domain` 防止污染后面的请求域名
request.config({
  domain: ''
});

// 获取初始化时的请求域名
request.uri();
```
:::

## 使用示例
```ts
request.uri();
```