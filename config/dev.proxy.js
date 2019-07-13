const TARGET_URL = 'http://localhost:8443';
// 该配置文件公开发环境使用，生产或测试可以使用nginx或其它web服务器作代理解决跨域问题
module.exports = {
  '/authorization-server': {
    target: TARGET_URL, // 接口的域名
    // 开发环境dev-server代理client账号
    auth: 'test_client:test_secret',
    changeOrigin: true // 如果接口跨域，需要进行这个参数配置
  },
  '/organization': {
    target: TARGET_URL, // 接口的域名
    changeOrigin: true // 如果接口跨域，需要进行这个参数配置
  }
}
