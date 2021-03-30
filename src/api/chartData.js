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


export function getHotData(params) { // 获取用户的热销数据
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

export function getUserMap(params) { // 获取用户地图
  return request({
    url: '/auth/map',
    method: 'get',
    params
  })
}


export function getSystemCategoryData(params) { // 获取系统已有分类数据
  return request({
    url: '/system/category',
    method: 'get',
    params
  })
}

export function getUserList(params) { // 获取系统下管理员的的成员列表
  return request({
    url: `/system/config_user`,
    method: 'get',
    params
  })
}
 
export function resetPsw(params) { // 管理员下用户列表的重置密码
  return request({
    url: '/system/config_user/reset_psw',
    method: 'get',
    params
  })
}

export function getShopData(params) { // 获取店铺数据
  return request({
    url: '/shop/user_data',
    method: 'get',
    params
  })
}

export function getSellerProvinceData(user_id) { // 获取卖家管理中的省份数据
  return request({
    url: `/seller/province/${user_id}`,
    method: 'get',
  })
}


export function getSellerCityData(user_id) { // 获取卖家管理中的城市数据
  return request({
    url: `/seller/city/${user_id}`,
    method: 'get',
  })
}

export function getPriceData(params) { // 获取价格分布的数据
  return request({
    url: `/rate/price`,
    method: 'get',
    params
  })
}

export function getTables(user_id) { // 获取数据库中的表
  return request({
    url: `/auth/tables/${user_id}`,
    method: 'get',
  })
}

export function getUploadInfo() { // 获取上传信息
  return request({
    url: `/auth/upload/status`,
    method: 'get',
  })
}
