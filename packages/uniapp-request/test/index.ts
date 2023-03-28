import { Http } from '../index';

const http = new Http({
    baseUrl: {
        pro: 'https://api.kags.cn',
        dev: 'http://lyl-api.kags.cn'
    },
	debug: true,
    errorHandleByCode: (code: number, errMsg?: string) => {
        // console.log(`【Request Debug:配置】${code}`);
        if (code === 401) {
            // 一般为未登录状态，可在这里统一跳转登录页面
            console.log('401拦截演示');
			// 此处仅为演示
			// msg({ title: errMsg || '未登录，请先登录' });
        } else if (code === 403) {
            // 一般为token过期，可在这里清除token并跳转登录页面处理
            console.log('403拦截演示');
			// 此处仅为演示
			// msg({ title: errMsg || '登录过期，请重新登录' });
        } else if (code === 404) {
            // 请求不存在
            console.log('404拦截演示');
			// 此处仅为演示
			// msg({ title: errMsg || '请求资源不存在' });
        } else if (code === 500) {
            console.log('500拦截演示');
            // msg({ title: errMsg || '接口返回错误500' });
        } else if (code === 502) {
            console.log('500拦截演示');
        } else if (code === 503) {
            console.log('503拦截演示');
        } else if (code !== 200) {
            console.log('自定义错误码拦截演示');
            // msg({ title: '请求服务异常' });
        }
    }
});

http.post('/v1/user/loginv4', {}, {});