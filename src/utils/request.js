import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use()

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
  Message.error(error.message)
  // 执行错误 跳出执行链 进入Catch
  return Promise.reject(error)
})

export default service
