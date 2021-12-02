/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-11-30 16:59:43
 * @LastEditors: CookChopper
 * @Description: 工资路由
 */
import Layout from '@/layout'

export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/salarys/index.vue'),
    meta: {
      title: '工资',
      icon: 'money'
    }
  }]

}
