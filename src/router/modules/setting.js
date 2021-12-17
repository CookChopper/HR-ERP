/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-12-17 00:04:17
 * @LastEditors: CookChopper
 * @Description: 公司设置路由
 */
import Layout from '@/layout'

export default {
  path: '/setting',
  name: 'settings',
  component: Layout,
  children: [{
    path: '',
    name: 'settings',

    component: () => import('@/views/setting/index.vue'),
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]

}
