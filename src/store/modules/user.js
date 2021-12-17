/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-12-14 14:56:36
 * @LastEditors: CookChopper
 * @Description: vuex中的user数据
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { setTimeStamp } from '@/utils/auth'
import { resetRouter } from '@/router'
const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
    setToken(token)
  },
  removeToken: (state) => {
    state.token = null
    removeToken()
  },
  setUserInfo: (state, data) => {
    state.userInfo = data
  },
  removeUserInfo: (state) => {
    state.userInfo = {}
  }
}

const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp()
  },

  async getUserInfo(context) {
    const userInfo = await getUserInfo()
    const baseInfo = await getUserDetailById(userInfo.userId)
    const baseResult = { ...userInfo, ...baseInfo }
    context.commit('setUserInfo', baseResult)
    return baseResult
  },

  async logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    // 重置路由
    resetRouter()
    context.commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

