import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/user',
    method: 'get',
    params: query
  })
}
