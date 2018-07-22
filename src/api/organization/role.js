import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/role',
    method: 'get',
    params: query
  })
}
