import request from '@/utils/request'

export function fetchGroupByParentId(id) {
  return request({
    url: '/group/parent/' + id,
    method: 'get'
  })
}

export function getGroup(id) {
  return request({
    url: '/group' + id,
    method: 'get'
  })
}

export function createGroup(data) {
  return request({
    url: '/group',
    method: 'post',
    data
  })
}

export function updateGroup(data) {
  return request({
    url: '/group/' + data.id,
    method: 'put',
    data
  })
}

export function deleteGroup(id) {
  return request({
    url: '/group/' + id,
    method: 'delete'
  })
}

