import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/role',
    method: 'get',
    params: query
  })
}

export function createRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role/' + data.id,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: '/role/' + id,
    method: 'delete'
  })
}

