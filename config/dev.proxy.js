const TARGET_URL = 'http://localhost:8443';

module.exports = {
  '/authorization-server': {
    target: TARGET_URL, // 接口的域名
    changeOrigin: true // 如果接口跨域，需要进行这个参数配置
  }
}
