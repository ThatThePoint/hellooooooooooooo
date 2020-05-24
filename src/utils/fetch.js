// 封装fetch方法
import axios from 'axios';
import { Message } from 'element-ui';

// 创建axios实例

const service = axios.create({
    baseURL: process.env.BASE_API,
    headers: {
        'Content-Type': 'application/json',
        "token": sessionStorage.getItem('token')
    },
    transformRequest: [function(data) {
        // Do whatever you want to transform the data
        return JSON.stringify(data)
    }],
    timeout: 100000,
    withCredentials: true
});

// request拦截器
service.interceptors.request.use(config => {
    let token = sessionStorage.getItem('token');
    if (token) {
        config.headers['token'] = token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
}, error => {
    // Do something with request error
    Promise.reject(error);
});

var msgShowing = false;
// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data || res.excelUrl;
        if (res.status === 1) {
            return res;
        } else {
            if (!msgShowing) {
                msgShowing = true;
                Message({
                    message: res.msg,
                    type: 'error',
                    duration: 5 * 1000,
                    onClose: function() {
                        msgShowing = false;
                    }
                });
            }
            return Promise.reject(res);
        }
    },
    error => {
        if (!msgShowing) {
            msgShowing = true;
            const msg = error.msg.includes('timeout') ? '请求超时，请检查网络！' : error.msg;
            Message({
                message: msg,
                type: 'error',
                duration: 5 * 1000,
                onClose: function() {
                    msgShowing = false;
                }
            });
        }
        return Promise.reject(error);
    }
);

export default service;