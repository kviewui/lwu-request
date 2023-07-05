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
      { text: '文档', link: '/intro' },
      { 
        text: '1.6.4',
        items: [
          {  text: '更新日志', link: 'changelog'},
          { text: '开源贡献', link: '/convention/contributing'},
          {  text: 'uniapp插件市场地址', link: 'https://ext.dcloud.net.cn/plugin?id=11409'},
        ]
      }
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
          { text: '进阶使用', link: '/advanced' },
          { text: '更新日志', link: '/changelog' },
          { text: '常见问题', link: '/faq' }
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
          { text: 'abort', link: '/api/abort' },
          { text: 'config', link: '/api/config' },
          { text: 'upload', link: '/api/upload' },
          { text: 'aliyun', link: '/api/aliyun' },
          { text: 'download', link: '/api/download' },
          { text: 'setHeader', link: '/api/setHeader' },
          { text: 'uri', link: '/api/uri' }
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
          { text: '请求配置', link: '/ts/request' },
          { text: '阿里云OSS配置', link: '/ts/aliyun' },
          { text: '请求拦截器', link: '/ts/interceptor' }
        ]
      },
      {
        text: '开源贡献',
        items: [
          { text: '贡献者名单', link: '/convention/contributors'},
          { text: '贡献指南', link: '/convention/contributing'},
          { text: '提交内容协议', link: '/convention/commit-convention'},
          { text: '代码行为准则', link: '/convention/code-of-conduct'}
        ]
      }
    ],
    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kviewui/lwu-request' }
    ],
    footer: {
      copyright: 'Copyright © 2023-present KviewUI',
      message: '本文档内容版权为 Lwu-Request 官方团队所有，保留所有权利。'
    }
  }
})