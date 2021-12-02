/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-11-30 16:57:32
 * @LastEditors: CookChopper
 * @Description: 审批路由
 */
import Layout from '@/layout'

export default {
  path: '/approvals',
  name: 'approvals',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/approvals/index.vue'),
    meta: {
      title: '审批',
      icon: 'tree-table'
    }
  }]

}
