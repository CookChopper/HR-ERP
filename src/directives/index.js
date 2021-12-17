/*
 * @Author: CookChopper
 * @Date: 2021-11-29 16:49:09
 * @LastEditTime: 2021-12-12 04:39:28
 * @LastEditors: CookChopper
 * @Description: 自定义指令
 */

export const imagerror = {
  inserted(dom, option) {
    dom.src = dom.src || option.value
    dom.onerror = function() {
      dom.src = option.value
    }
  },
  componentUpdated(dom, option) {
    dom.src = dom.src || option.value
  }
}
