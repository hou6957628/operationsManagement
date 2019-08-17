import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
axios.defaults.retry = 5
axios.defaults.retryDelay = 600
axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
const apiHost = process.env.HOST_URL
axios.defaults.baseURL = apiHost
console.log("process.env.API_HOST:" + process.env.API_HOST)

// 添加请求拦截器
axios.interceptors.request.use((config) => {
        const token = new Vue().$cookie.get('loginToken');
        config.headers.common['loginToken'] = token;
        console.log(token);
        return config
    }, (error) => {
        console.log(error)
        return Promise.reject(error)
    })
    // 添加响应拦截器
axios.interceptors.response.use((res) => {
    if (Number(res.status) !== 200) {
        return Promise.reject(res)
    }
    return res.data
}, (error) => {
    return Promise.reject(error)
})

// fetchPost
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url,params)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

// fetchGet
export function fetchGet(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params })
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
