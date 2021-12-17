/*
 * @Author: CookChopper
 * @Date: 2021-11-30 16:35:00
 * @LastEditTime: 2021-12-17 00:13:05
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
    name: 'employees',

    component: () => import('@/views/employees/index.vue'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/employees/component/detail.vue'),
    hidden: true,
    meta: {
      title: '员工详情'
    }
  }, {
    path: 'print/:id',
    component: () => import('@/views/employees/print.vue'),
    hidden: true,
    meta: {
      title: '员工打印'
    }
  }]

}
