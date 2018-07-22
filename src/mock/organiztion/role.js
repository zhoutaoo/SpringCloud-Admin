import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'code|1': ['ADMIN', 'IT'],
    name: '@cname',
    description: '@cparagraph(1, 3)',
    'status|1': ['deleted', 'ok'],
    updatedTime: '@datetime',
    createdTime: '@datetime',
    createdBy: '@first',
    updatedBy: '@first'
  }))
}

export default {
  getList: config => {
    const {
      code, name, status, page = 1, limit = 20, sort
    } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (code && item.code.indexOf(code) < 0) return false
      if (name && item.name.indexOf(name) < 0) return false
      if (status && item.status.indexOf(status) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
