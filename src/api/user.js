/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-11-29 17:01:48
 * @LastEditors: CookChopper
 * @Description: 用户api接口
 */
import request from '@/utils/request'

/**
 * @description: 登录接口
 * @param {*} data
 * @return {*}
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * @description: 获取员工基本信息
 * @param {*} id
 * @return {*}
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// export function getInfo(token) {}

// export function logout() {}
