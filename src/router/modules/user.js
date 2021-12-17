/*
 * @Author: CookChopper
 * @Date: 2020-08-09 01:10:22
 * @LastEditTime: 2021-12-16 19:04:59
 * @LastEditors: CookChopper
 * @Description:
 */

import Layout from '@/layout'

export default {
  path: '/users',
  component: Layout,
  hidden: true,
  name: 'user',
  children: [
    {
      path: 'approvals',
      component: () => import('@/views/users/approvals'),
      name: 'usersApprovals',
      hidden: true,
      meta: {
        title: '用户'
      }
    }

  ]
}
