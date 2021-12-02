/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-11-30 16:59:03
 * @LastEditors: CookChopper
 * @Description: 员工路由
 */
import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/employees/index.vue'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }]

}
