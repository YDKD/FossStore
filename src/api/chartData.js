import request from '@/utils/request'

export function validatorUsernameExist(username) { // 验证用户名是否被注册
  return request({
    url: `/user/user_exist/${username}`,
    method: 'get',
  })
}


export function validatorEmailExist(email) { // 验证邮箱是否被注册
  return request({
    url: `/user/email/exist/${email}`,
    method: 'get',
  })
}

export function getUserRourterListById(name) { // 根据用户名获取用户列表
  return request({
    url: `/auth/user_router_list/${name}`,
    method: 'get',
  })
}


export function getHotInphoneData(params) { // 根据用户名获取用户列表
  return request({
    url: `/goods/hot_iphone`,
    method: 'get',
    params
  })
}

export function getShortestData(params) { // 根据用户地址，判断库中发货地离用户最近的数据
  return request({
    url: '/goods/shortest',
    method: 'get',
    params
  })
}


export function getUserLoginPlace(params) { // 获取用户的登录地址
  return request({
    url: '/user/ip',
    method: 'get',
    params
  })
}

