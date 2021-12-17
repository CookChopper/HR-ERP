/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-12-17 00:25:53
 * @LastEditors: CookChopper
 * @Description: vuex
 *
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission.js'
import tagsView from './modules/TagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    tagsView
  },
  getters
})

export default store
