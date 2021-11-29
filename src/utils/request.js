/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-11-29 21:46:13
 * @LastEditors: CookChopper
 * @Description: axios封装
 */
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import { CheckTimeout } from '@/utils/index'
import router from '@/router'
// import { env } from 'babel.config'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

const timeOut = 3600

// 请求拦截器
service.interceptors.request.use(config => {
  // console.log(store.getters.token)
  if (store.getters.token) {
    // console.log(CheckTimeout(getTimeStamp(), timeOut))
    if (CheckTimeout(getTimeStamp(), timeOut)) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // axios会自动给返回结果套一层data
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    // 业务错误了，要跳出then进入catch 要return Promise.reject
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  // 执行错误 跳出执行链 进入Catch
  return Promise.reject(error)
})

export default service
