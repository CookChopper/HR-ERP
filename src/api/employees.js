/*
 * @Author: CookChopper
 * @Date: 2021-12-02 14:25:47
 * @LastEditTime: 2021-12-12 16:50:51
 * @LastEditors: CookChopper
 * @Description: 员工API
 */
import request from '@/utils/request'

/**
 * @description: 获取员工简单列表
 * @param {*}
 * @return {*}
 */
export function getUserSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * @description: 获取员工完整列表
 * @param {*} params
 * @return {*}
 */
export function getUserList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * @description: 删除员工
 * @param {*} id
 * @return {*}
 */
export function deleteUser(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 添加员工
 * @param {*} data
 * @return {*}
 */
export function addUser(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 * @description: 批量导入员工
 * @param {*} data
 * @return {*}
 */
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

/**
 * @description: 给员工分配角色
 * @param {*} data
 * @return {*}
 */
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
