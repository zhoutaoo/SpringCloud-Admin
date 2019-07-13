
## 开发指南


### 增加菜单

router/index.js 菜单路由


### 开发环境代理配置

```javascript
{
  '/authorization-server': {
    target: 'http://localhost:8443', // 接口的地址
    changeOrigin: true // 如果接口跨域，需要进行这个参数配置
  }
}
```