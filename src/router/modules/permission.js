/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-12-17 00:04:58
 * @LastEditors: CookChopper
 * @Description: 权限管理路由
 */
import Layout from '@/layout'

export default {
  path: '/permission',
  name: 'permissions',
  component: Layout,
  children: [{
    name: 'permissions',
    path: '',
    component: () => import('@/views/permission/index.vue'),
    meta: {
      title: '权限管理',
      icon: 'edit'
    }
  }]

}
