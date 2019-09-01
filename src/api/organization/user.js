import request from '@/utils/request'

export function queryUser(data) {
  return request({
    url: '/organization/user/conditions',
    method: 'post',
    data
  })
}

export function getUser(id) {
  return request({
    url: '/organization/user/' + id,
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/organization/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/organization/user/' + data.id,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/organization/user/' + id,
    method: 'delete'
  })
}
