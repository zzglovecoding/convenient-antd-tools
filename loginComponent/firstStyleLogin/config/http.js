/**
 * http请求全局配置，所有的请求都会带上token
 * 和登录相关的就是headers和afterResponse两个，headers是自动会带上token的，afterResponse会判断服务器的返回数据，如果服务器的返回有问题，就会进行一系列的操作，然后跳转到登录页
 */
import { message } from 'antd';

export default {
    isDev: __DEV__,
    proxyPath: __DEV__,
    validateStatus(status) {
        return status >= 200 && status < 500;
    },
    headers: {
        'token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
    },
    baseURL: '/api/das',
    // 这个是前面都会附带的路径
    // beforeRequest(resolve, reject, options) {},          // 拦截请求
    afterResponse(resolve, reject, response, options) {     // 拦截响应
        var { data, status } = response.data;

        if (status !== 200) {
            message.error(response.data?.message);
        }
        switch (status) {
            case 200:   // continue to process.
                resolve(data);
                break;
            case 440: 
                reject(response);
                localStorage.removeItem('x-auth-token');
                localStorage.removeItem('user-id');
                location.href = '/';
                // 这里需要跳转到登录页
                break;
            case 403:
                reject(response);
                location.href = '/';
            case 401:   // need log in
                reject(response);
                break;
            default: 
                reject(response);
                break;
        }
    }
    // onError(config, request, response, message, stack) {}    // 拦截错误
};

// 更多配置参考: https://www.npmjs.com/package/@easytool/http