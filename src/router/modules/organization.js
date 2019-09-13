/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const organizationRouter = {
  path: '/organization',
  component: Layout,
  redirect: '/organization/user',
  name: 'Organization',
  meta: {
    title: '组织管理',
    icon: 'component'
  },
  children: [
    {
      path: '/organization/user',
      component: () => import('@/views/organization/user'),
      name: 'User',
      meta: {
        title: '用户管理',
        icon: 'user'
      }
    },
    {
      path: '/organization/role',
      component: () => import('@/views/organization/role'),
      name: 'Role',
      meta: {
        title: '角色管理',
        icon: 'role'
      }
    },
    {
      path: '/organization/group',
      component: () => import('@/views/organization/group'),
      name: 'Group',
      meta: {
        title: '组织架构',
        icon: 'group'
      }
    }
  ]
}

export default organizationRouter
