import axios from 'axios'
import qs from 'qs'
import {
  getToken
} from '@/utils/utils'
import { router } from '@/router';


axios.defaults.timeout = 10000


axios.interceptors.request.use(config => {
  let token = getToken();
  config.headers.Authorization = token;
  return config;
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = err.response
        break;
      case 401:
        if(window.location.hostname.includes('roletask.com')){
          window.top.location.href = `${window.top.location.origin}/Login/index.html?src=${window.top.location.href}`
        }else{
          router.push('/login');
        }
        err.message = '未授权，请重新登录11';
        break;
      case 403:
        err.message = '拒绝访问'
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        break;
      case 405:
        err.message = '请求方法未允许'
        break;
      case 408:
        err.message = '请求超时'
        break;
      case 500:
        err.message = err.response
        break;
      case 501:
        err.message = '网络未实现'
        break;
      case 502:
        err.message = '网络错误'
        break;
      case 503:
        err.message = '服务不可用'
        break;
      case 504:
        err.message = '网络超时'
        break;
      case 505:
        err.message = 'http版本不支持该请求'
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = "连接到服务器失败"
  }
  return Promise.reject(err.message)
})



/**
 * 
 * @param {String} url  请求地址
 * @param {Object} params 请求参数
 * @param {String} method 请求类型 ['get','post','put','patch','delete']
 */
export const request = (url, params = {}, method = 'get', data) => {


  let options = Object.assign({}, {
    url,
    method,
    params,
    data,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
  })

  return new Promise((resolve, reject) => {
    axios.request(options).then(res => {

      return resolve(res.data);
    }).catch(error => {
      reject(error);
    })
  })

}
