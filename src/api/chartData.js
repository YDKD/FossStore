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
