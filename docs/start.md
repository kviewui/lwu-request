# 快速上手

## 安装

```shell
# pnpm方式【推荐】
pnpm install lwu-request
# npm 方式
npm install lwu-request
# cnpm 方式
cnpm install lwu-request
# yarn 方式
yarn add lwu-request
```

## 使用

#### 引入并初始化
```ts
import { Http } from 'lwu-request';

const request = new Http({
	baseUrl: {
		// 开发环境域名，此处仅为演示
		dev: 'demo-api.test.com',
		// 生产环境域名，此处仅作为演示
		pro: 'api.test.com'
	},
	// 业务错误代码拦截处理，里面的业务逻辑可自定义，此处为演示
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