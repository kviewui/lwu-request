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
	}
});
```