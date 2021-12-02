/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-11-30 17:00:07
 * @LastEditors: CookChopper
 * @Description: 考勤路由
 */
import Layout from '@/layout'

export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/attendances/index.vue'),
    meta: {
      title: '考勤',
      icon: 'form'
    }
  }]

}
