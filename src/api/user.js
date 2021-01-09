/*
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-09 15:59:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\api\user.js
 */
import request from '@/utils/request'

export function login(data) { // 登录
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
