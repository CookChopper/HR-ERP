/*
 * @Author: CookChopper
 * @Date: 2021-12-02 14:25:47
 * @LastEditTime: 2021-12-02 14:53:14
 * @LastEditors: CookChopper
 * @Description: 员工API
 */
import request from '@/utils/request'

export function getUserSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
