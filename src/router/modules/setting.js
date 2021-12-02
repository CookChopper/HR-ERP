/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-11-30 16:59:09
 * @LastEditors: CookChopper
 * @Description: 公司设置路由
 */
import Layout from '@/layout'

export default {
  path: '/setting',
  name: 'setting',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/setting/index.vue'),
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]

}
