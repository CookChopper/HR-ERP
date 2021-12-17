/*
 * @Author: CookChopper
 * @Date: 2021-12-13 19:01:51
 * @LastEditTime: 2021-12-13 19:28:12
 * @LastEditors: CookChopper
 * @Description: 权限vuex
 */

import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: constantRoutes
}

const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  filtersRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
