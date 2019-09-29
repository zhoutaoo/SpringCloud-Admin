import request from '@/utils/request'

export function fetchGroupByParentId(id) {
  return request({
    url: '/organization/group/parent/' + id,
    method: 'get'
  })
}

export function getGroup(id) {
  return request({
    url: '/organization/group/' + id,
    method: 'get'
  })
}

export function createGroup(data) {
  return request({
    url: '/organization/group',
    method: 'post',
    data
  })
}

export function updateGroup(data) {
  return request({
    url: '/organization/group/' + data.id,
    method: 'put',
    data
  })
}

export function deleteGroup(id) {
  return request({
    url: '/organization/group/' + id,
    method: 'delete'
  })
}

