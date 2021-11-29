/*
 * @Author: CookChopper
 * @Date: 2021-11-29 16:49:09
 * @LastEditTime: 2021-11-29 16:50:47
 * @LastEditors: CookChopper
 * @Description: 自定义指令
 */

export const imagerror = {
  inserted(dom, option) {
    dom.onerror = function() {
      dom.src = option.value
    }
  }
}
