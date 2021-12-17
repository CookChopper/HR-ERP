/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-12-12 16:50:30
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

/**
 * @description: 保存员工基本信息
 * @param {*} data
 * @return {*}
 */
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * @description: 获取员工基础信息
 * @param {*} id
 * @return {*}
 */
export function getUserPersonlById(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/**
 * @description: 保存员工基础信息
 * @param {*} data
 * @return {*}
 */
export function saveUserPersonl(data) {
  return request({
    url: `/employees/${data.id}/personalInfo`,
    method: 'put',
    data
  })
}

/**
 * @description: 获取员工岗位信息
 * @param {*} id
 * @return {*}
 */
export function getUserJob(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * @description: 保存员工岗位信息
 * @param {*} data
 * @return {*}
 */
export function savaUserJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

