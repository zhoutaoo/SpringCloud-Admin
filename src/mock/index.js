import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
// import userAPI from './organiztion/user'
// import roleAPI from './organiztion/role'
import groupAPI from './organiztion/group'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
// Mock.mock(/\/authorization-server\/oauth\/token/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/current/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 用户相关
// Mock.mock(/\/user/, 'get', userAPI.getList)
// Mock.mock(/\/user/, 'post', userAPI.createUser)
// Mock.mock(/\/user/, 'put', userAPI.updateUser)
// Mock.mock(/\/user/, 'delete', userAPI.deleteUser)
// 角色相关
// Mock.mock(/\/role/, 'get', roleAPI.getList)
// Mock.mock(/\/role/, 'post', roleAPI.createRole)
// Mock.mock(/\/role/, 'put', roleAPI.updateRole)
// Mock.mock(/\/role/, 'delete', roleAPI.deleteRole)
// 用户组
Mock.mock(/\/group/, 'get', groupAPI.getGroup)
Mock.mock(/\/group/, 'post', groupAPI.createRole)
Mock.mock(/\/group/, 'put', groupAPI.updateRole)
Mock.mock(/\/group/, 'delete', groupAPI.deleteRole)

export default Mock
