# 介绍 <Badge type="tip" text="^1.1.13" />

基于 [`uniapp网络请求API`](https://uniapp.dcloud.net.cn/api/request/request.html) 封装的轻量级网络请求库。

## 特性

+ #### 支持自动刷新token
+ #### 支持请求拦截
+ #### 支持请求失败自动重试【基于指数退避算法】
> 指数退避算法简介
	为了解决如何设置适当的重传等待时间而存在的算法，基本流程如下：<br/>
	1.客户端发起请求<br/>
	2.请求失败，等待1 + random_number_milliseconds秒后重试请求。<br/>
	3.请求失败，等待2 + random_number_milliseconds秒后重试请求。<br/>
	4.请求失败，等待4 + random_number_milliseconds秒后重试请求。<br/>
	5.以此类推，直至达到设置的等待时间上限为止结束请求，具体算法公式如下：<br/>
	`Math.min((2 ** n + ranom_number_milliseconds), maxium_backoff)`<br/>
	上述的`random_number_milliseconds`为1到1000的随机毫秒数，`maxium_backoff`为最大等待秒数
+ #### 支持自动计算重试时间
+ #### 支持过滤重复请求
+ #### 支持自定义错误处理
+ #### 支持中断请求
