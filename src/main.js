/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-12-16 23:58:19
 * @LastEditors: CookChopper
 * @Description:main.js入口文件
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from '@/lang/index'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import components from './components'
import checkPermission from './mixins/checkPermission'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * @description: 注册自定义指令
 */
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

/**
 * @description: 注册过滤器
 */
import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/*
*   注册自定义公共组件
*/
Vue.use(components)

/*
*   全局混入
*/
Vue.mixin(checkPermission)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
