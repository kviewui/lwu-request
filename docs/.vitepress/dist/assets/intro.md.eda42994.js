import{_ as o,H as r,o as i,c as n,C as a,a as e,J as l,V as d}from"./chunks/framework.df15cb86.js";const P=JSON.parse('{"title":"介绍","description":"","frontmatter":{},"headers":[],"relativePath":"intro.md","filePath":"intro.md"}'),c={name:"intro.md"},s={id:"介绍",tabindex:"-1"},h=a("a",{class:"header-anchor",href:"#介绍","aria-label":'Permalink to "介绍 <Badge type="tip" text="^1.8.3" />"'},"​",-1),_=d('<p>基于 <a href="https://uniapp.dcloud.net.cn/api/request/request.html" target="_blank" rel="noreferrer"><code>uniapp网络请求API</code></a> 封装的轻量级网络请求库。</p><h2 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-label="Permalink to &quot;特性&quot;">​</a></h2><ul><li><h4 id="支持自动刷新token" tabindex="-1">支持自动刷新token <a class="header-anchor" href="#支持自动刷新token" aria-label="Permalink to &quot;支持自动刷新token&quot;">​</a></h4></li><li><h4 id="支持请求拦截" tabindex="-1">支持请求拦截 <a class="header-anchor" href="#支持请求拦截" aria-label="Permalink to &quot;支持请求拦截&quot;">​</a></h4></li><li><h4 id="支持请求失败自动重试【基于指数退避算法】" tabindex="-1">支持请求失败自动重试【基于指数退避算法】 <a class="header-anchor" href="#支持请求失败自动重试【基于指数退避算法】" aria-label="Permalink to &quot;支持请求失败自动重试【基于指数退避算法】&quot;">​</a></h4></li></ul><blockquote><p>指数退避算法简介 为了解决如何设置适当的重传等待时间而存在的算法，基本流程如下：<br> 1.客户端发起请求<br> 2.请求失败，等待1 + random_number_milliseconds秒后重试请求。<br> 3.请求失败，等待2 + random_number_milliseconds秒后重试请求。<br> 4.请求失败，等待4 + random_number_milliseconds秒后重试请求。<br> 5.以此类推，直至达到设置的等待时间上限为止结束请求，具体算法公式如下：<br><code>Math.min((2 ** n + ranom_number_milliseconds), maxium_backoff)</code><br> 上述的<code>random_number_milliseconds</code>为1到1000的随机毫秒数，<code>maxium_backoff</code>为最大等待秒数</p></blockquote><ul><li><h4 id="支持自动计算重试时间" tabindex="-1">支持自动计算重试时间 <a class="header-anchor" href="#支持自动计算重试时间" aria-label="Permalink to &quot;支持自动计算重试时间&quot;">​</a></h4></li><li><h4 id="支持过滤重复请求" tabindex="-1">支持过滤重复请求 <a class="header-anchor" href="#支持过滤重复请求" aria-label="Permalink to &quot;支持过滤重复请求&quot;">​</a></h4></li><li><h4 id="支持自定义错误处理" tabindex="-1">支持自定义错误处理 <a class="header-anchor" href="#支持自定义错误处理" aria-label="Permalink to &quot;支持自定义错误处理&quot;">​</a></h4></li><li><h4 id="支持中断请求" tabindex="-1">支持中断请求 <a class="header-anchor" href="#支持中断请求" aria-label="Permalink to &quot;支持中断请求&quot;">​</a></h4></li></ul>',5);function m(u,b,p,f,k,q){const t=r("Badge");return i(),n("div",null,[a("h1",s,[e("介绍 "),l(t,{type:"tip",text:"^1.8.3"}),e(),h]),_])}const T=o(c,[["render",m]]);export{P as __pageData,T as default};
