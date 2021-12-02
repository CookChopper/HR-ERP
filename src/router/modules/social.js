/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-11-30 16:59:29
 * @LastEditors: CookChopper
 * @Description: 工资路由
 */
import Layout from '@/layout'

export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/social/index.vue'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]

}
