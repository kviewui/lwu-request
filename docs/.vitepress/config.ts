import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "LWU-REQUEST",
  description: "基于uniapp网络请求API封装的轻量级网络请求库，支持自动刷新token，请求拦截，请求中断，自动重试等特性",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/intro' }
    ],
    editLink: {
      pattern: 'https://github.com/kviewui/lwu-request/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    sidebar: [
      {
        text: '开发指南',
        items: [
          { text: '介绍', link: '/intro' },
          { text: '快速上手', link: '/start' },
          { text: '更新日志', link: '/changelog' }
          // { text: '请求示例', link: '/examples' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'get', link: '/api/get' },
          { text: 'post', link: '/api/post' },
          { text: 'put', link: '/api/put' },
          { text: 'delete', link: '/api/delete' },
          { text: 'request', link: '/api/request' },
          { text: 'abort', link: '/api/abort' }
        ]
      },
      {
        text: '配置',
        items: [
          { text: '全局配置', link: '/config/global' },
          { text: '请求配置', link: '/config/request' }
        ]
      },
      {
        text: 'TypeScript',
        items: [
          { text: '全局配置', link: '/ts/global' },
          { text: '请求配置', link: '/ts/request' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kviewui/lwu-request' }
    ]
  }
})
