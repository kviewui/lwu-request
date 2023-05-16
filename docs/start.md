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

## 完整集成步骤【uniapp版本】
+ ### 创建 `http` 目录，位置如：`src/utils/http`
::: tip
+ 该目录一般存储请求库相关的文件，比如初始化文件。
+ 目录名称和创建位置可以自定义。
:::
+ ### 创建 `src/utils/http/index.ts`，并初始化
	```ts
	import { Http } from 'lwu-request';

	export const http = new Http({
		baseUrl: {
			// 开发环境域名，此处仅为演示
			dev: 'demo-api.test.com',
			// 生产环境域名，此处仅作为演示
			pro: 'api.test.com'
		}
	});
	```
+ ### 调用示例，提供`直接调用`和`API调用`两种方式，大家可以自由选择
	+ #### main.ts直接调用
		```ts
		import http from './http';
		// 挂载uni全局对象上方便调用
		uni.$http = http;
		```
		::: tip
		全局类型定义，如 `src/global.d.ts`，方便`vscode`自动提示
		```ts
		// 导入请求库类型
		import type { Http } from "lwu-request";
		// 声明全局命名空间
		declare global {
			interface Uni {
				$http: Http
			}
		}

		// 声明导出
		export {}
		:::
	+ #### API调用【强烈推荐】
		在调用流程中增加 `api` 层，用来管理所有的api连接和参数设置信息，具体步骤如下：

		+ 创建 `api` 目录，位置如：`src/utils/api`
		::: tip
		+ 该目录一般存储后端api调用初始化文件。
		+ 目录名称和创建位置可以自定义。
		:::

		+ 创建api模块，如 `src/utils/api/user.ts`，并初始化
			```ts
			/**
			 * 用户模块接口管理
			*/
			// import http from "../request/http";
			import { http } from "../http";

			const user = {
				info(data: object = {}, options: object = {}) {
					return http.post('/v1/user/userinfo', data, options);
				}
			}

			export default user;

			export interface User {
				user: {
					info: (data: object, options: object) => Promise<unknown>
				}
			};
			```
		+ 创建api模块入口文件 `src/utils/api/index.ts`，引入所有的api模块
			```ts
			// 用户模块
			import user from "./user";
			// 其他更多模块请自行导入
			
			export default {
				user,
				// 更多模块
				...
			};
			```
		+ `main.ts` 挂载api模块
			```ts
			import api from "./utils/api";

			uni.$api = api;
			```

			::: tip
			全局类型定义，如 `src/global.d.ts`，方便`vscode`自动提示
			```ts
			// 声明全局命名空间
			declare global {
				interface Uni {
					$api: {
						// 声明所有的api模块类型
						user: {
							info: (data: object, options?: object) => Promise<any>;
						}
					}
				}
			}

			// 声明导出
			export {}
			:::
## 集成后的目录结构
```
.
├─ src
├─ utils
│  ├─ http
│  │  └─ index.ts
├─ api
│  ├─ index.ts
│  └─ user.ts
├─ main.ts
├─ global.d.ts
```