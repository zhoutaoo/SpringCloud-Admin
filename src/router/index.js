import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {
    path: '/login', component: () => import('@/views/login/index'), hidden: true
  },
  {
    path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true
  },
  {
    path: '/404', component: () => import('@/views/errorPage/404'), hidden: true
  },
  {
    path: '/401', component: () => import('@/views/errorPage/401'), hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {
        title: 'dashboard', icon: 'dashboard', noCache: true
      }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/user/index',
    name: 'organization',
    meta: {
      title: 'organization',
      icon: 'peoples',
      roles: ['admin']
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/organization/user/index'),
        meta: {
          title: 'user',
          icon: 'user'
        }
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/organization/group/index'),
        meta: {
          title: 'group', icon: 'form'
        }
      }]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'pagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'directivePermission',
      meta: {
        title: 'directivePermission'
        // if do not set roles, means: this page does not require permission
      }
    }]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'page401',
        meta: {
          title: 'page401', noCache: true
        }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'page404',
        meta: {
          title: 'page404', noCache: true
        }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'log',
      component: () => import('@/views/errorLog/index'),
      name: 'errorLog',
      meta: {
        title: 'errorLog', icon: 'bug'
      }
    }]
  },

  {
    path: '*', redirect: '/404', hidden: true
  }
]
