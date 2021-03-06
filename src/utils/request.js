import axios from 'axios'
import { MessageBox, Message, } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'
import Cookies from 'js-cookie'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
  headers: {
    'Cache-Control': 'no-cache' //去掉请求缓存
  }
})


// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (Cookies.get('UserToken')) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      console.log(getToken())
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status === 404) {
      router.replace({
        path: '/404'
      })
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code === 20000) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.response) {
      if (error.response.status === 403) {
        router.replace({
          path: '/403'
        })
      }
      if (error.response.status === 404 ) {
        router.replace({
          path: '/404',
          query: { redirect: router.currentRoute.fullPath }
        })
      } else if(error.response.status === 502) {
        router.replace({
          path: '/service-error',
          query: { redirect: router.currentRoute.fullPath }
        })
      }
    }
    return Promise.reject(error)
  }
)

export default service
