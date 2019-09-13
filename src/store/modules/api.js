const baseUrl = process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 注册中心
    nacosServer: 'http://localhost:8848/nacos',
    sentinelDashboard: 'http://localhost:8021',
    mossServer: 'http://localhost:8022',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html'
  }
}

export default api
