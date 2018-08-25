import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username: username,
    password: password,
    grant_type: 'password',
    scope: 'read'
  }
  return request({
    url: '/authorization-server/oauth/token',
    headers: {
      'Authorization': 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ=',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    params: data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/current',
    method: 'get',
    params: { token }
  })
}

