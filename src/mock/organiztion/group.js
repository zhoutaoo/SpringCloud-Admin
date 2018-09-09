import Mock from 'mockjs'

const List = []
const count = 20

function newGroup(data) {
  const mock = Mock.mock({
    id: '@increment',
    parentId: '-1',
    children: [],
    name: '@region',
    description: '@cparagraph(1, 3)',
    status: 'ok',
    updatedTime: '@datetime',
    createdTime: '@datetime',
    createdBy: '@first',
    updatedBy: '@first'
  })
  if (Math.ceil(Math.random() * 1000) % 3 === 0) {
    mock.children.push(newGroup(JSON.stringify({
      parentId: mock.id
    })))
  }
  return Object.assign(mock, JSON.parse(data || '{}'))
}

for (let i = 0; i < count; i++) {
  List.push(newGroup())
}

export default {
  fetchGroupByParentId: () => {
    return {
      code: '000000',
      mesg: '处理成功',
      data: List.slice(3, Math.ceil(Math.random() * 20))
    }
  },
  getGroup: (config) => {
    const id = config.url.substring(config.url.lastIndexOf('/') + 1)
    return {
      code: '000000',
      mesg: '处理成功',
      data: List.splice(id)
    }
  },
  createGroup: config => {
    List.push(newGroup(config.body))
    return {
      code: '000000',
      mesg: '处理成功'
    }
  },
  updateGroup: config => {
    const id = config.url.substring(config.url.lastIndexOf('/') + 1)
    List.splice(id - 101, 1, newGroup(config.body))
    return {
      code: '000000',
      mesg: '处理成功'
    }
  },
  deleteGroup: config => {
    const id = config.url.substring(config.url.lastIndexOf('/') + 1)
    console.log(id - 201)
    List.splice(id - 201, 1)
    return {
      code: '000000',
      mesg: '处理成功'
    }
  }
}
