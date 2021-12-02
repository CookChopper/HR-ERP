/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-12-01 14:44:56
 * @LastEditors: CookChopper
 * @Description: 公共函数库
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validMobile(data) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(data)
}

export function arrayToTree(list, RootValue) {
  const arr = []
  list && list.forEach(item => {
    if (item.pid === RootValue) {
      const children = arrayToTree(list, item.id)
      item['children'] = children
      arr.push(item)
    }
  })
  return arr
}
