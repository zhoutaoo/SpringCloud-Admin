import request from '@/utils/request'

export function queryResource(data) {
  return request({
    url: '/organization/resource/conditions',
    method: 'post',
    data
  })
}

export function getResource(id) {
  return request({
    url: '/organization/resource/' + { id },
    method: 'get'
  })
}

export function queryAllResource() {
  return request({
    url: '/organization/resource/all',
    method: 'get'
  })
}

export function createResource(data) {
  return request({
    url: '/organization/resource',
    method: 'post',
    data
  })
}

export function updateResource(data) {
  return request({
    url: '/organization/resource/' + data.id,
    method: 'put',
    data
  })
}

export function deleteResource(id) {
  return request({
    url: '/organization/resource/' + id,
    method: 'delete'
  })
}

