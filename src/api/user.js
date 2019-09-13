import request from '@/utils/request'

export function login(data) {
  const form = {
    username: data.username,
    password: data.password,
    grant_type: 'password',
    scope: 'read'
  }
  return request({
    url: '/authorization-server/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ='
    },
    method: 'post',
    params: form
  })
}

export function getInfo(token) {
  return request({
    url: '/organization/user',
    method: 'get',
    params: { uniqueId: 'admin' }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
