/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-11-30 17:01:40
 * @LastEditors: CookChopper
 * @Description: 权限管理路由
 */
import Layout from '@/layout'

export default {
  path: '/permission',
  name: 'permission',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/permission/index.vue'),
    meta: {
      title: '权限管理',
      icon: 'edit'
    }
  }]

}
