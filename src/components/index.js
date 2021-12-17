/*
 * @Author: CookChopper
 * @Date: 2021-12-06 21:25:29
 * @LastEditTime: 2021-12-17 00:17:40
 * @LastEditors: CookChopper
 * @Description: 自定义公共组件全局注册
 */

import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Screen from './Screen'
import Print from 'vue-print-nb'
import ThemePicker from './ThemePicker'
import Breadcrumb from './Breadcrumb'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.use(Print)
    Vue.component('Screen', Screen)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('Breadcrumb', Breadcrumb)
  }
}
