import request from '@/utils/request'

export function queryGateway(data) {
  data.orders = data.order
  return request({
    url: '/gatewayAdmin/gateway/routes/conditions',
    method: 'post',
    data
  })
}

export function addGateway(data) {
  data.orders = data.order
  return request({
    url: '/gatewayAdmin/gateway/routes',
    method: 'post',
    data
  })
}

export function deleteGateway(id) {
  return request({
    url: '/gatewayAdmin/gateway/routes/' + id,
    method: 'delete'
  })
}

export function updateGateway(data) {
  data.orders = data.order
  return request({
    url: '/gatewayAdmin/gateway/routes/' + data.id,
    method: 'put',
    data
  })
}

export function refreshGateway() {
  return request({
    url: '/gatewayAdmin/gateway/routes/overload',
    method: 'post'
  })
}
