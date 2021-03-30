/*
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-11 10:46:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'UserToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  sessionStorage.removeItem('userInfo')
  sessionStorage.removeItem('exp')
  sessionStorage.removeItem('userRouterList')
  Cookies.removeItem('UserToken')
  Cookies.remove(TokenKey)
  return
}


