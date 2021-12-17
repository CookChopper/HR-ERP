/*
 * @Author: CookChopper
 * @Date: 2021-12-12 16:49:00
 * @LastEditTime: 2021-12-12 17:02:48
 * @LastEditors: CookChopper
 * @Description: 权限API
 */

import request from '@/utils/request'

/**
 * @description: 获取权限点列表
 * @param {*}
 * @return {*}
 */
export function getPermission() {
  return request({
    url: '/sys/permission'
  })
}

/**
 * @description: 添加权限点
 * @param {*} data
 * @return {*}
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

/**
 * @description: 获取权限点详情
 * @param {*} id
 * @return {*}
 */
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}

/**
 * @description: 更新权限点
 * @param {*} data
 * @return {*}
 */
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * @description: 删除权限点
 * @param {*} id
 * @return {*}
 */
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
