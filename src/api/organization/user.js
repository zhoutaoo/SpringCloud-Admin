import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/user',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data
  })
}
