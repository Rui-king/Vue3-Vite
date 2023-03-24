import axios, { type CreateAxiosDefaults } from 'axios'
import { start, done } from '@/utils/NProgress';
import router from '../router';

const $axios = axios.create({
    baseURL: 'http://127.0.0.1:8888',     //请求后端数据的基本地址，自定义
    timeout: 2000,                  //请求超时设置，单位ms
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
} as CreateAxiosDefaults)


$axios.interceptors.request.use(
    config => {
        start(); // 开启进度条
        let token = localStorage.getItem('token');
        config.headers!.token = token;
        // console.log('请求拦截', config);
        return config;
    }, error => {
        return Promise.reject(error);
    }
);


$axios.interceptors.response.use(
    response => {
        done();// 关闭进度条
        // console.log('响应拦截', response);
        if (response.data.status === 200) {
            localStorage.setItem('token', response.headers.token as string);
            return response;
        } else {
            switch (response.data.status) {
                case 401:
                    // 未登录
                    if (router.currentRoute.value.path !== '/login') {
                        router.replace({
                            path: '/login',
                            query: { to: router.currentRoute.value.fullPath }
                        });
                    };
                    break;
                case 403:
                    // 登录过期
                    localStorage.removeItem('token');
                    router.replace({
                        path: '/login',
                        query: { to: router.currentRoute.value.fullPath }
                    });
                    break;
                default:
                    response.data.msg = `请求错误，状态码${response.data.status}`;
            }
            ElMessage.error(response.data.msg || '请求错误')
            return response
        }

    },// 请求异常信息提示处理
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = `错误请求`;
                    break;
                case 401:
                    error.message = `未授权，请重新登录`;
                    break;
                case 403:
                    error.message = `拒绝访问`;
                    break;
                case 404:
                    error.message = `请求错误,未找到该资源`;
                    break;
                case 405:
                    error.message = `请求方法未允许`;
                    break;
                case 408:
                    error.message = `请求超时`;
                    break;
                case 500:
                    error.message = `服务器端出错`;
                    break;
                case 501:
                    error.message = `网络未实现`;
                    break;
                case 502:
                    error.message = `网络错误`;
                    break;
                case 503:
                    error.message = `服务不可用`;
                    break;
                case 504:
                    error.message = `网络超时`;
                    break;
                case 505:
                    error.message = `http版本不支持该请求`;
                    break;
                default:
                    error.message = `未知错误${error.response.status}`;
            }
        } else {
            error.message = "连接到服务器失败";
        }
        ElMessage.error(error.message || '请求错误')
        return Promise.reject(error);
    }
);


export const $get = (url: string, params = {}) => $axios({ url, method: 'get', params })

export const $post = (url: string, data = {}) => $axios({ url, method: 'post', data })



