import request from '@/utils/request'

export function queryRole(data) {
  return request({
    url: '/organization/role/conditions',
    method: 'post',
    data
  })
}

export function getRole(id) {
  return request({
    url: '/organization/role/' + id,
    method: 'get'
  })
}

export function getAllRoles() {
  return request({
    url: '/organization/role/all',
    method: 'get'
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

