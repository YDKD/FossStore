/*
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-09 16:13:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'TokenUser'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


