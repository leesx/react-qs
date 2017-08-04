import axios from 'axios';
import Qs from 'qs'
import {message} from 'antd'
import config from 'utils/config'
let cancelRequest;
let CancelToken = axios.CancelToken;
const myAxios   = axios.create({
    baseURL         : config.baseURL,
    headers         : {
        'Content-Type'               : 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'groupID'                    : config.groupID || '', //自定义groupID;注意:在fetch方法中添加自定义头部,不起作用
    },
    timeout         : 5 * 1000,
    method          : 'get', // default
    withCredentials : true, // default
    responseType    : 'json', // default
    validateStatus  : function (status) {
        return status >= 200 && status < 300; // default
    },
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }
    ],
    params          : {
        accessToken: config.accessToken,
        traceID    : config.traceID,
        paperSize  : config.paperSize || 0,
    },
    cancelToken     : new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelRequest = c;
    })
});
// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const json = response.data || {};
    if (json && (json.success == 'false' || json.success == false)) {
        message.error(`错误代码:${json.code},错误信息：${json.msg}`, 2)
    }
    return json;
}, function (error) {
    console.dir(error)
    // 对响应错误做点什么
    const res = error.response;
    if (res) {
        const json = res.data || {code: res.status, msg: res.statusText};
        message.error(`错误代码:${json.code},错误信息：${json.msg}`, 3)
    } else {
        const msg = error.message;
        if (msg.match('timeout of 5000ms exceeded')) {
            message.error('网络请求超时,请重试', 3)
        } else {
            message.error(`${msg || '哇哦,(⊙﹏⊙)出错了！'}`, 3)
        }

    }
    //cancelRequest('Request canceled.');
    return Promise.reject(error)
});
export default myAxios
//扩展Promise
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
        throw reason
    }));
};
