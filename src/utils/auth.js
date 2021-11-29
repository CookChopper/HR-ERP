/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-11-29 17:36:39
 * @LastEditors: CookChopper
 * @Description:
 */
import Cookies from 'js-cookie'

const TokenKey = 'hr-erp-vue'
const TimeKey = 'hr-erp-timeout'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return Cookies.get(TimeKey)
}

export function setTimeStamp() {
  return Cookies.set(TimeKey, Date.now())
}
