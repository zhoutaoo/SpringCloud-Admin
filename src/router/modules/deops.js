/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const devopsRouter = {
  path: '/devops',
  component: Layout,
  redirect: '/devops/register',
  name: 'Devops',
  meta: {
    title: '服务治理',
    icon: 'chart'
  },
  children: [
    {
      path: 'http://localhost:8848/nacos/#/serviceManagement?dataId=&group=&appName=&namespace=',
      name: 'Nacos',
      meta: {
        title: '注册中心',
        icon: 'link'
      }
    },
    {
      path: 'http://localhost:8848/nacos/#/configurationManagement?dataId=&group=&appName=&namespace=',
      name: 'Nacos',
      meta: {
        title: '配置中心',
        icon: 'link'
      }
    },
    {
      path: 'http://localhost:8021',
      name: 'SentinelDashBoard',
      meta: {
        title: '服务运维',
        icon: 'link'
      }
    },
    {
      path: 'http://localhost:8022',
      name: 'SpringBootAdmin',
      meta: {
        title: '服务管理',
        icon: 'link'
      }
    }
  ]
}

export default devopsRouter
