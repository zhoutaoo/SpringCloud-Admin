
## 开发指南


### 增加菜单

router/index.js 菜单路由


### 开发代理

```javascript
{
  '/authorization-server': {
    target: TARGET_URL, // 接口的域名
    changeOrigin: true // 如果接口跨域，需要进行这个参数配置
  }
}
```