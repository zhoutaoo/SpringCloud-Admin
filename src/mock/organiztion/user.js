import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

function newUser(data) {
  const mock = Mock.mock({
    id: '@increment',
    status: 'ok',
    updatedTime: '@now',
    createdTime: '@now',
    createdBy: '@first',
    updatedBy: '@first'
  })
  return Object.assign(mock, JSON.parse(data))
}

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    username: '@last',
    name: '@cname',
    mobile: '13@integer(100000000,999999999)',
    'status|1': ['ok', 'lock', 'deleted'],
    updatedTime: +Mock.Random.date('T'),
    createdTime: '@datetime',
    createdBy: '@first',
    updatedBy: '@first'
  })
  )
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
  },
  createUser: config => {
    List.push(newUser(config.body))
    return {
      code: '000000',
      mesg: '处理成功'
    }
  },
  updateUser: config => {
    const id = config.url.substring(config.url.lastIndexOf('/') + 1)
    List.splice(id - 101, 1, newUser(config.body))
    return {
      code: '000000',
      mesg: '处理成功'
    }
  },
  deleteUser: config => {
    const id = config.url.substring(config.url.lastIndexOf('/') + 1)
    console.log(id - 101)
    List.splice(id - 101, 1)
    return {
      code: '000000',
      mesg: '处理成功'
    }
  }
}
