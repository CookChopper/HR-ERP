/*
 * @Author: CookChopper
 * @Date: 2021-12-16 23:42:50
 * @LastEditTime: 2021-12-17 00:06:11
 * @LastEditors: CookChopper
 * @Description: 多语言
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zh from './common/zh'
import en from './common/en'
import cookie from 'js-cookie'

Vue.use(VueI18n) // 全局注册

export default new VueI18n({
  locale: cookie.get('language') || 'zh',
  messages: {
    zh: {
      ...zhLocale,
      ...zh
    },
    en: {
      ...enLocale,
      ...en
    }
  }
})
