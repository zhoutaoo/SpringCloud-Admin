import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    username: '@last',
    name: '@cname',
    mobile: '156@integer(10000000,99999999)',
    'status|1': ['lock', 'deleted', 'ok'],
    updatedTime: +Mock.Random.date('T'),
    createdTime: '@datetime'
  }))
}

export default {
  getList: config => {
    const {
      username, mobile, status, page = 1, limit = 20, sort
    } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (username && item.username.indexOf(username) < 0) return false
      if (mobile && item.mobile.indexOf(mobile) < 0) return false
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
