/*
 * @Author: CookChopper
 * @Date: 2021-12-04 12:31:12
 * @LastEditTime: 2021-12-12 19:49:05
 * @LastEditors: CookChopper
 * @Description: 公司设置API
 */
import request from '@/utils/request'

/**
 * @description: 获取公司信息
 * @param {*} id
 * @return {*}
 */
export function getCompanyDetail(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/**
 * @description: 获取角色列表
 * @param {*}
 * @return {*}
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * @description: 获取角色详情
 * @param {*} id
 * @return {*}
 */
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * @description: 编辑角色详情
 * @param {*} data
 * @return {*}
 */
export function editRoleDetail(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * @description: 删除角色
 * @param {*} id
 * @return {*}
 */
export function delRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 添加角色
 * @param {*} data
 * @return {*}
 */
export function addRoleDetail(data) {
  return request({
    url: `/sys/role`,
    method: 'post',
    data
  })
}

/**
 * @description: 给角色分配权限
 * @param {*} data
 * @return {*}
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
