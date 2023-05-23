'use strict';

var E=Object.defineProperty,N=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var D=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var v=(r,e,t)=>e in r?E(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,o=(r,e)=>{for(var t in e||(e={}))$.call(e,t)&&v(r,t,e[t]);if(D)for(var t of D(e))L.call(e,t)&&v(r,t,e[t]);return r},y=(r,e)=>N(r,M(e));var h=(r,e,t)=>new Promise((s,l)=>{var n=a=>{try{d(t.next(a));}catch(i){l(i);}},u=a=>{try{d(t.throw(a));}catch(i){l(i);}},d=a=>a.done?s(a.value):Promise.resolve(a.value).then(n,u);d((t=t.apply(r,e)).next());});var p=class{constructor(e){this.timeout=(e==null?void 0:e.timeout)||1,this.maxSize=(e==null?void 0:e.maxSize)||5*1024*1024,this.securityToken="",this.accessKeyId="",this.accessKeySecret="",this.uploadDir=(e==null?void 0:e.uploadDir)||"",this.uploadImageUrl=(e==null?void 0:e.uploadImageUrl)||"",this.formData=(e==null?void 0:e.formData)||{},this.getOSSBySTS=()=>e==null?void 0:e.getOSSBySTS(),this.getPolicyBase64=()=>e==null?void 0:e.getPolicyBase64(),this.getSign=t=>e==null?void 0:e.getSignature(t);}getOSSBySTSInfo(){return h(this,null,function*(){let{access_key_id:e,access_key_secret:t,security_token:s}=yield this.getOSSBySTS();this.accessKeyId=e,this.accessKeySecret=t,this.securityToken=s;})}getUploadParams(){return h(this,null,function*(){let e=yield this.getPolicyBase64(),t=yield this.getSign(e);return {OSSAccessKeyId:this.accessKeyId,policy:e,signature:t,"x-oss-security-token":this.securityToken}})}uploadFile(e,t){return new Promise((s,l)=>h(this,null,function*(){if(!e){l({code:1,msg:"\u6587\u4EF6\u8DEF\u5F84\u4E0D\u80FD\u4E3A\u7A7A"});return}let n=t||this.uploadDir;n||l({code:1,msg:"\u4E0A\u4F20\u76EE\u5F55\u4E0D\u80FD\u4E3A\u7A7A"});let u=P(e)?e.split(".").pop():"png",d=`${Date.now()}_${Math.floor(Math.random()*1e6)}.${u}`,a=`${this.uploadImageUrl}/${n}/${d}`,i=o(o({key:`${n}/${d}`,success_action_status:200},yield this.getUploadParams()),this.formData);s({code:0,msg:"success",data:{uploadTask:yield (()=>h(this,null,function*(){return uni.uploadFile({url:this.uploadImageUrl,filePath:e,name:"file",formData:o({},i),fail:c=>{if(c.statusCode!==200){l({code:1,msg:"\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5",data:c.data});return}}})}))(),url:a,path:`/${n}/${d}`}});}))}},T=p;var A=r=>{var e,t,s,l,n,u,d,a,i,g,c,f,m,b,C,k,x,R,q,U,w,O;return {baseUrl:r.baseUrl,debug:(e=r.debug)!=null?e:!1,loading:(t=r.loading)!=null?t:!0,loadingText:(s=r.loadingText)!=null?s:"\u8BF7\u6C42\u4E2D...",before:r.before,after:r.after,header:(l=r.header)!=null?l:{},timeout:(n=r.timeout)!=null?n:6e3,method:(u=r.method)!=null?u:"GET",dataType:(d=r.dataType)!=null?d:"json",responseType:(a=r.responseType)!=null?a:"text",sslVerify:(i=r.sslVerify)!=null?i:!0,withCredentials:(g=r.withCredentials)!=null?g:!1,firstIpv4:(c=r.firstIpv4)!=null?c:!1,errorHandleByCode:r.errorHandleByCode,apiErrorInterception:r.apiErrorInterception,networkExceptionHandle:()=>{},xhrCode:r.xhrCode,xhrCodeName:(f=r.xhrCodeName)!=null?f:"code",requestSuccessResponseMsgName:(m=r.requestSuccessResponseMsgName)!=null?m:"msg",tokenStorageKeyName:(b=r.tokenStorageKeyName)!=null?b:"",tokenValue:r.tokenValue,buildQueryString:r.buildQueryString,takeTokenMethod:(C=r.takeTokenMethod)!=null?C:"header",takenTokenKeyName:(k=r.takenTokenKeyName)!=null?k:"Authorization",autoRefreshToken:!1,refreshTokenHandle:r.refreshTokenHandle,tokenExpiredCode:(x=r.tokenExpiredCode)!=null?x:403,retry:(R=r.retry)!=null?R:!1,retryCount:(q=r.retryCount)!=null?q:3,retryCountAutoOffRetry:(U=r.retryCountAutoOffRetry)!=null?U:!0,retryMaximum:(w=r.retryMaximum)!=null?w:64,retryDeadline:(O=r.retryDeadline)!=null?O:1e4}};var I=r=>{uni.showLoading({title:r.title,mask:r.mask||!0});};var K=r=>typeof r=="object"&&r!==null?Object.keys(r).map(e=>`${e}=${encodeURIComponent(r[e])}`).join("&"):r;function S(r,e,t){let s=(a,i="")=>{t.errorHandleByCode&&t.errorHandleByCode(a,i);};return {request:a=>{var m,b,C;t.debug&&console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u3011${JSON.stringify(a)}`);let i=(m=e.loading)!=null?m:t.loading,g=(b=e.loadingText)!=null?b:t.loadingText;i&&I({title:g!=null?g:"\u8BF7\u6C42\u4E2D..."}),(C=a==null?void 0:a.header)!=null&&C.contentType&&(a.header["content-type"]=a.header.contentType,delete a.header.contentType);let c="";process.env.NODE_ENV==="development"?c=t.baseUrl.dev:c=t.baseUrl.pro,e.domain&&(c=e.domain);let f=`${c}${e.url}`;return a.method==="GET"?(a.data=t.buildQueryString&&t.buildQueryString(a.data)?t.buildQueryString(a.data):K(a.data),a.url=`${f}?${a.data}`):a.url=f,e.before&&e.before(),r.request(a)},response:a=>(s(a.statusCode,a.data[t.requestSuccessResponseMsgName]),t.debug&&console.warn(`\u3010LwuRequest Debug:\u54CD\u5E94\u62E6\u622A\u3011${JSON.stringify(a)}`),e.after&&e.after(),a),fail:a=>(t.debug&&console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u5931\u8D25\u3011${JSON.stringify(a)}`),a),complete:a=>{uni.hideLoading(),t.debug&&console.warn(`\u3010LwuRequest Debug:\u8BF7\u6C42\u62E6\u622A\u5B8C\u6210\u3011${JSON.stringify(a)}`);}}}var P=r=>/\.(png|jpeg|jpg|webp|gif)$/i.test(r);var _=(r,e)=>{let t=Math.floor(Math.random()*1e3);return Math.min(Math.pow(2,r)*1e3+t,e)};var B=class{constructor(e){this.currentRequestTask={abort:()=>{},onHeadersReceived:()=>{},offHeadersReceived:()=>{}};this.requestTasksName="LWU-REQUEST-TASKS";this.lock=!0;this.pending=[];this.retryCount=3;this.retryMaximum=64;this.retryTimeout=[];this.retryDeadline=1e4;this.globalConfig={baseUrl:{pro:"",dev:""},errorHandleByCode:(e,t)=>{},apiErrorInterception:e=>{}};this.reqConfig={};if(this.globalConfig=o({},A(e)),this.reqConfig=o({task_id:"",domain:""},this.globalConfig),!this.globalConfig.retry)this.retryCount=0;else if(this.globalConfig.retryCountAutoOffRetry){this.retryMaximum=this.globalConfig.retryMaximum*1e3,this.retryTimeout=[],this.retryDeadline=e.retryDeadline;for(let t=0;t<this.retryCount&&!(this.retryDeadline<0);t++){let s=_(t,this.retryMaximum);this.retryDeadline-=s,this.retryTimeout.push(s);}this.retryCount=this.retryTimeout.length;}}handleError(e,t=""){this.globalConfig.errorHandleByCode&&this.globalConfig.errorHandleByCode(e,t);}refreshToken(){this.globalConfig.refreshTokenHandle&&this.globalConfig.refreshTokenHandle().then(()=>{uni.getStorageSync("LWU-REQUEST-CALLBACK")(e=>{e();});}).catch(()=>{this.handleError(this.globalConfig.tokenExpiredCode);});}beforeRequest(e={},t){var l;let s=uni.getStorageSync(this.requestTasksName);return t!=null&&t.task_id&&s[t==null?void 0:t.task_id]&&(this.globalConfig.debug&&console.warn(`\u3010LwuRequest Debug\u3011\u8BF7\u6C42ID${t.task_id}\u6709\u91CD\u590D\u9879\u5DF2\u81EA\u52A8\u8FC7\u6EE4`),(l=s[t==null?void 0:t.task_id])==null||l.abort()),new Promise((n,u)=>h(this,null,function*(){let d=uni.getStorageSync(this.globalConfig.tokenStorageKeyName);(()=>new Promise((i,g)=>{d&&i(d),this.globalConfig.tokenValue?this.globalConfig.tokenValue().then(c=>{c&&i(c),i(!1);}):i("");}))().then(i=>{var g,c;i&&t&&(this.globalConfig.takeTokenMethod==="header"&&(t.header=(g=t.header)!=null?g:{},t.header[(c=this.globalConfig)==null?void 0:c.takenTokenKeyName]=i),this.globalConfig.takeTokenMethod==="body"&&(e[this.globalConfig.takenTokenKeyName]=i)),n(!0);});}))}request(e,t={},s){let l=o(o({},this.reqConfig),s);return console.log(l,"\u5408\u5E76\u8BF7\u6C42\u914D\u7F6E"),new Promise((n,u)=>{this.beforeRequest(t,y(o({},l),{baseUrl:{dev:this.globalConfig.baseUrl.dev,pro:this.globalConfig.baseUrl.pro}})).then(()=>{var a;let d=S({request:i=>(e=i.url,i),response:i=>i},o({url:e},s),this.globalConfig);if(d.request({header:o({contentType:""},s==null?void 0:s.header),method:(a=s==null?void 0:s.method)!=null?a:"GET",data:t,url:e}),this.currentRequestTask=uni.request({url:e,data:t,header:o({},l.header),method:l.method,timeout:l.timeout,dataType:l.dataType,responseType:l.responseType,sslVerify:l.sslVerify,withCredentials:l.withCredentials,firstIpv4:l.firstIpv4,success:i=>{d.response(i),typeof this.globalConfig.xhrCode=="undefined"?this.globalConfig.apiErrorInterception&&this.globalConfig.apiErrorInterception(i.data,i):this.globalConfig.xhrCodeName&&i.data[this.globalConfig.xhrCodeName]&&i.data[this.globalConfig.xhrCodeName]!==this.globalConfig.xhrCode&&(this.globalConfig.apiErrorInterception&&this.globalConfig.apiErrorInterception(i.data,i),u(i)),i.statusCode!==this.globalConfig.tokenExpiredCode?n(i.data):(this.refreshToken(),uni.setStorageSync("LWU-REQUEST-CALLBACK",()=>{n(this.request(e,t,l));}));},fail:i=>{var g;d.fail(i),this.retryCount=(g=l.retryCount)!=null?g:3,this.retryCount===0?u(i):(this.globalConfig.debug&&console.warn(`\u3010LwuRequest Debug\u3011\u81EA\u52A8\u91CD\u8BD5\u6B21\u6570\uFF1A${this.retryCount}`),this.retryCount--,setTimeout(this.request,this.retryTimeout.shift()),this.globalConfig.networkExceptionHandle&&this.globalConfig.networkExceptionHandle());},complete:i=>{d.complete(i);}}),l!=null&&l.task_id){let i=[];i[l==null?void 0:l.task_id]=this.currentRequestTask,uni.setStorageSync(this.requestTasksName,i);}});})}get(e,t={},s={}){return this.request(e,t,o({method:"GET"},s))}post(e,t={},s={}){return this.request(e,t,o({method:"POST"},s))}put(e,t={},s={}){return this.request(e,t,o({method:"POST"},s))}delete(e,t={},s={}){return this.request(e,t,o({method:"DELETE"},s))}config(e={}){return this.reqConfig=o(o({},this.reqConfig),e),this}abort(e=""){let t=uni.getStorageSync(this.requestTasksName);t[e]?t[e].abort():this.currentRequestTask.abort();}download(e){var n;let t=y(o(o({},this.reqConfig),e),{method:"DOWNLOAD"}),s=S({request:u=>(e.url=u.url,u),response:u=>u},o({},t),this.globalConfig),l=o({contentType:""},t==null?void 0:t.header);return s.request({header:l,method:"DOWNLOAD",data:"",url:e.url}),uni.downloadFile({url:e.url,header:l,timeout:(n=t.timeout)!=null?n:6e4,filePath:t.filePath,success:u=>{s.response(y(o({},u),{data:"",header:{},cookies:[]})),e.success&&e.success(u);},fail:u=>{s.fail(u),e.fail&&e.fail(u);},complete:u=>{s.complete(u),e.complete&&e.complete(u);}})}upload(e){let t=y(o(o({},this.reqConfig),e),{method:"UPLOAD"}),s=S({request:n=>(e.url=n.url,n),response:n=>n},o({},t),this.globalConfig),l=o({contentType:""},t==null?void 0:t.header);return s.request({header:l,method:"DOWNLOAD",data:"",url:e.url}),uni.uploadFile({url:e.url,files:e.files,fileType:e.fileType,file:e.file,filePath:e.filePath,name:e.name,header:e.header,timeout:e.timeout,formData:e.formData,success:n=>{s.response(y(o({},n),{data:"",header:{},cookies:[]})),e.success&&e.success(n);},fail:n=>{s.fail(n),e.fail&&e.fail(n);},complete:n=>{s.complete(n),e.complete&&e.complete(n);}})}uploadAliossSync(e){return h(this,null,function*(){let t=new T({filePath:e.filePath,uploadDir:e.uploadDir,maxSize:e.maxSize,uploadImageUrl:e.uploadImageUrl,getOSSBySTS:e.getOSSBySTS,getPolicyBase64:e.getPolicyBase64,getSignature:e.getSignature});return yield t.getOSSBySTSInfo(),yield t.uploadFile(e.filePath,e.uploadDir)})}uploadAlioss(e){let t=new T({filePath:e.filePath,uploadDir:e.uploadDir,maxSize:e.maxSize,uploadImageUrl:e.uploadImageUrl,getOSSBySTS:e.getOSSBySTS,getPolicyBase64:e.getPolicyBase64,getSignature:e.getSignature});t.getOSSBySTSInfo().then(()=>t.uploadFile(e.filePath,e.uploadDir));}};

exports.Http = B;
