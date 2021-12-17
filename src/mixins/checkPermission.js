/*
 * @Author: CookChopper
 * @Date: 2021-12-14 15:01:22
 * @LastEditTime: 2021-12-16 15:11:09
 * @LastEditors: CookChopper
 * @Description: 检查权限mixin
 */
import store from '@/store'
export default {
  methods: {
    checkPermission(key) {
      const { roles } = store.state.user.userInfo
      if (roles.points && roles.points.length) {
        // console.log(roles.points.some(item => item === key))
        return roles.points.some(item => item === key)
      }
      return false
    }
  }
}
