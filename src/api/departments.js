/*
 * @Author: CookChopper
 * @Date: 2021-12-01 14:35:15
 * @LastEditTime: 2021-12-02 19:50:43
 * @LastEditors: CookChopper
 * @Description: 组织架构API
 */

import request from '@/utils/request'

/**
 * @description: 获取组织架构
 * @param {*}
 * @return {*}
 */
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

/**
 * @description: 根据id删除组织架构
 * @param {*} id
 * @return {*}
 */
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 新增部门组织
 * @param {*} data
 * @return {*}
 */
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 * @description: 根据id获取部门详情
 * @param {*} id
 * @return {*}
 */
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * @description: 根据id修改部门详情
 * @param {*} id
 * @return {*}
 */
export function editDepartmentDetail(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
