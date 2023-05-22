'use strict';

var M=Object.defineProperty;var R=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var S=(r,t,e)=>t in r?M(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,u=(r,t)=>{for(var e in t||(t={}))A.call(t,e)&&S(r,e,t[e]);if(R)for(var e of R(t))L.call(t,e)&&S(r,e,t[e]);return r};var w=(r,t,e)=>new Promise((i,n)=>{var b=o=>{try{h(e.next(o));}catch(l){n(l);}},y=o=>{try{h(e.throw(o));}catch(l){n(l);}},h=o=>o.done?i(o.value):Promise.resolve(o.value).then(b,y);h((e=e.apply(r,t)).next());});var E=r=>{var t,e,i,n,b,y,h,o,l,g,C,f,a,c,d,s,p,m,T,k,x,q;return {baseUrl:r.baseUrl,debug:(t=r.debug)!=null?t:!1,loading:(e=r.loading)!=null?e:!0,loadingText:(i=r.loadingText)!=null?i:"\u8BF7\u6C42\u4E2D...",before:r.before,after:r.after,header:(n=r.header)!=null?n:{},timeout:(b=r.timeout)!=null?b:6e3,method:(y=r.method)!=null?y:"GET",dataType:(h=r.dataType)!=null?h:"json",responseType:(o=r.responseType)!=null?o:"text",sslVerify:(l=r.sslVerify)!=null?l:!0,withCredentials:(g=r.withCredentials)!=null?g:!1,firstIpv4:(C=r.firstIpv4)!=null?C:!1,errorHandleByCode:r.errorHandleByCode,apiErrorInterception:r.apiErrorInterception,networkExceptionHandle:()=>{},xhrCode:r.xhrCode,xhrCodeName:(f=r.xhrCodeName)!=null?f:"code",requestSuccessResponseMsgName:(a=r.requestSuccessResponseMsgName)!=null?a:"msg",tokenStorageKeyName:(c=r.tokenStorageKeyName)!=null?c:"",tokenValue:r.tokenValue,buildQueryString:r.buildQueryString,takeTokenMethod:(d=r.takeTokenMethod)!=null?d:"header",takenTokenKeyName:(s=r.takenTokenKeyName)!=null?s:"Authorization",autoRefreshToken:!1,refreshTokenHandle:r.refreshTokenHandle,tokenExpiredCode:(p=r.tokenExpiredCode)!=null?p:403,retry:(m=r.retry)!=null?m:!1,retryCount:(T=r.retryCount)!=null?T:3,retryCountAutoOffRetry:(k=r.retryCountAutoOffRetry)!=null?k:!0,retryMaximum:(x=r.retryMaximum)!=null?x:64,retryDeadline:(q=r.retryDeadline)!=null?q:1e4}};var v=r=>{uni.showLoading({title:r.title,mask:r.mask||!0});};var D=r=>typeof r=="object"&&r!==null?Object.keys(r).map(t=>`${t}=${encodeURIComponent(r[t])}`).join("&"):r;function U(r,t,e){let i=(o,l="")=>{e.errorHandleByCode&&e.errorHandleByCode(o,l);};return {request:o=>{var a,c,d;e.debug&&console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u3011${JSON.stringify(o)}`);let l=(a=t.loading)!=null?a:e.loading,g=(c=t.loadingText)!=null?c:e.loadingText;l&&v({title:g!=null?g:"\u8BF7\u6C42\u4E2D..."}),(d=o==null?void 0:o.header)!=null&&d.contentType&&(o.header["content-type"]=o.header.contentType,delete o.header.contentType);let C="";process.env.NODE_ENV==="development"?C=e.baseUrl.dev:C=e.baseUrl.pro;let f=`${C}${t.url}`;return o.method==="GET"?(o.data=e.buildQueryString&&e.buildQueryString(o.data)?e.buildQueryString(o.data):D(o.data),o.url=`${f}?${o.data}`):o.url=f,t.before&&t.before(),r.request(o)},response:o=>(i(o.statusCode,o.data[e.requestSuccessResponseMsgName]),e.debug&&console.warn(`\u3010LwuRequest Debug:\u54CD\u5E94\u62E6\u622A\u3011${JSON.stringify(o)}`),t.after&&t.after(),o),fail:o=>(e.debug&&console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u5931\u8D25\u3011${JSON.stringify(o)}`),o),complete:o=>{uni.hideLoading(),e.debug&&console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u5B8C\u6210\u3011${JSON.stringify(o)}`);}}}var H=(r,t)=>{let e=Math.floor(Math.random()*1e3);return Math.min(Math.pow(2,r)*1e3+e,t)};var N=class{constructor(t){this.currentRequestTask={abort:()=>{},onHeadersReceived:()=>{},offHeadersReceived:()=>{}};this.requestTasksName="LWU-REQUEST-TASKS";this.lock=!0;this.pending=[];this.retryCount=3;this.retryMaximum=64;this.retryTimeout=[];this.retryDeadline=1e4;this.globalConfig={baseUrl:{pro:"",dev:""},errorHandleByCode:(t,e)=>{},apiErrorInterception:t=>{}};this.reqConfig={};if(this.globalConfig=u({},E(t)),this.reqConfig=u({task_id:""},this.globalConfig),!this.globalConfig.retry)this.retryCount=0;else if(this.globalConfig.retryCountAutoOffRetry){this.retryMaximum=this.globalConfig.retryMaximum*1e3,this.retryTimeout=[],this.retryDeadline=t.retryDeadline;for(let e=0;e<this.retryCount&&!(this.retryDeadline<0);e++){let i=H(e,this.retryMaximum);this.retryDeadline-=i,this.retryTimeout.push(i);}this.retryCount=this.retryTimeout.length;}}handleError(t,e=""){this.globalConfig.errorHandleByCode&&this.globalConfig.errorHandleByCode(t,e);}refreshToken(){this.globalConfig.refreshTokenHandle&&this.globalConfig.refreshTokenHandle().then(()=>{uni.getStorageSync("LWU-REQUEST-CALLBACK")(t=>{t();});}).catch(()=>{this.handleError(this.globalConfig.tokenExpiredCode);});}request(t,e={},i){var y;let n=u(u({},this.reqConfig),i),b=uni.getStorageSync(this.requestTasksName);return n!=null&&n.task_id&&b[n==null?void 0:n.task_id]&&(this.globalConfig.debug&&console.warn(`\u3010LwuRequest Debug\u3011\u8BF7\u6C42ID${n.task_id}\u6709\u91CD\u590D\u9879\u5DF2\u81EA\u52A8\u8FC7\u6EE4`),(y=b[n==null?void 0:n.task_id])==null||y.abort()),new Promise((h,o)=>w(this,null,function*(){var f;let l=U({request:a=>(t=a.url,a),response:a=>a},u({url:t},n),this.globalConfig);l.request({header:u({contentType:""},n.header),method:(f=n.method)!=null?f:"GET",data:e,url:t});let g=uni.getStorageSync(this.globalConfig.tokenStorageKeyName);(()=>new Promise((a,c)=>{g&&a(g),this.globalConfig.tokenValue?this.globalConfig.tokenValue().then(d=>{d&&a(d),a(!1);}):a("");}))().then(a=>{var c,d;if(a&&(this.globalConfig.takeTokenMethod==="header"&&(n.header=(c=n.header)!=null?c:{},n.header[(d=this.globalConfig)==null?void 0:d.takenTokenKeyName]=a),this.globalConfig.takeTokenMethod==="body"&&(e[this.globalConfig.takenTokenKeyName]=a)),this.currentRequestTask=uni.request({url:t,data:e,header:u({},n.header),method:n.method,timeout:n.timeout,dataType:n.dataType,responseType:n.responseType,sslVerify:n.sslVerify,withCredentials:n.withCredentials,firstIpv4:n.firstIpv4,success:s=>{l.response(s),typeof this.globalConfig.xhrCode=="undefined"?this.globalConfig.apiErrorInterception&&this.globalConfig.apiErrorInterception(s.data,s):this.globalConfig.xhrCodeName&&s.data[this.globalConfig.xhrCodeName]&&s.data[this.globalConfig.xhrCodeName]!==this.globalConfig.xhrCode&&(this.globalConfig.apiErrorInterception&&this.globalConfig.apiErrorInterception(s.data,s),o(s)),s.statusCode!==this.globalConfig.tokenExpiredCode?h(s.data):(this.refreshToken(),uni.setStorageSync("LWU-REQUEST-CALLBACK",()=>{h(this.request(t,e,n));}));},fail:s=>{var p;l.fail(s),this.retryCount=(p=n.retryCount)!=null?p:3,this.retryCount===0?o(s):(this.globalConfig.debug&&console.warn(`\u3010LwuRequest Debug\u3011\u81EA\u52A8\u91CD\u8BD5\u6B21\u6570\uFF1A${this.retryCount}`),this.retryCount--,setTimeout(this.request,this.retryTimeout.shift()),this.globalConfig.networkExceptionHandle&&this.globalConfig.networkExceptionHandle());},complete:s=>{l.complete(s);}}),n!=null&&n.task_id){let s=[];s[n==null?void 0:n.task_id]=this.currentRequestTask,uni.setStorageSync(this.requestTasksName,s);}});}))}get(t,e={},i={}){return this.request(t,e,u({method:"GET"},i))}post(t,e={},i={}){return this.request(t,e,u({method:"POST"},i))}put(t,e={},i={}){return this.request(t,e,u({method:"POST"},i))}delete(t,e={},i={}){return this.request(t,e,u({method:"DELETE"},i))}config(t={}){return this.reqConfig=u(u({},this.reqConfig),t),this}abort(t=""){let e=uni.getStorageSync(this.requestTasksName);e[t]?e[t].abort():this.currentRequestTask.abort();}};

exports.Http = N;
