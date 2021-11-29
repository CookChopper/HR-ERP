/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-11-29 17:07:43
 * @LastEditors: CookChopper
 * @Description: 权限控制
 */
import router from '@/router'
import store from '@/store'

// 前置路由守卫
const whiteList = ['/404', '/login']
router.beforeEach(async(to, form, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
// 后置路由守卫
router.afterEach()
