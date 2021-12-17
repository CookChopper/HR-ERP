/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-12-17 00:04:45
 * @LastEditors: CookChopper
 * @Description: 组织架构路由
 */
import Layout from '@/layout'

export default {
  path: '/departments',
  name: 'departments',
  component: Layout,
  children: [{
    name: 'departments',
    path: '',
    component: () => import('@/views/departments/index.vue'),
    meta: {
      title: '组织架构',
      icon: 'tree'
    }
  }]

}
