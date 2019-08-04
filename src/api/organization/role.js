import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/organization/role/conditions',
    method: 'post',
    data
  })
}

export function createRole(data) {
  return request({
    url: '/organization/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/organization/role/' + data.id,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: '/organization/role/' + id,
    method: 'delete'
  })
}

