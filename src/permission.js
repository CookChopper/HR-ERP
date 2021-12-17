/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-12-13 19:39:47
 * @LastEditors: CookChopper
 * @Description: 权限控制
 */
import router from '@/router'
import store from '@/store'

// 前置路由守卫
const whiteList = ['/404', '/login']
router.beforeEach(async(to, form, next) => {
  // 根据token判断是否已经登录
  if (store.getters.token) {
    // 登录状态进入login页面自动跳转到主页
    if (to.path === '/login') {
      next('/')
    } else {
    // 登录状态进去其他页面
      // 判断是否已经获取用户资料 根据userId判断
      if (!store.getters.userId) {
        // 获取用户资料
        const { roles } = await store.dispatch('user/getUserInfo')
        // 动态添加路由
        const routes = await store.dispatch('permission/filtersRoutes', roles.menus)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        // console.log(routes)
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    // 判断跳转页面是否为白名单，是则放行
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
// 后置路由守卫
router.afterEach()
