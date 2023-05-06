---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "LWU-REQUEST"
  text: "基于uniapp网络请求API封装的轻量级网络请求库"
  tagline: 支持自动刷新token，请求拦截，请求中断，自动重试等特性
  actions:
    - theme: brand
      text: 快速上手
      link: /markdown-examples
    - theme: alt
      text: 查看源码
      link: /api-examples

features:
  - icon: 💡
    title: 完全TypeScript
    details: 完全使用ts开发，完善的类型支持
  - icon: 🚀
    title: 自动刷新token
    details: 提供 `tokenValue` hooks函数配置获取token
  - icon: ⚒️
    title: 请求拦截
    details: 支持自定义请求前、请求后拦截
  - icon: 💡
    title: 请求失败自动重试
    details: 支持请求失败自动重试
  - icon: 🔨
    title: 自动计算重试时间
    details: 基于 `指数退避算法` 自动计算重试时间
  - icon: ⌛️
    title: 过滤重复请求
    details: 基于请求ID自动过滤重复请求
  - icon: 💡
    title: 自定义错误处理
    details: 基于HTTP网络请求状态码提供自定义错误处理配置
  - icon: ✋
    title: 中断请求
    details: 支持中断请求
  - icon: ⚒️
    title: 轻量级
    details: 打包后不到10k大小
---

