/*
 * @Author: your name
 * @Date: 2021-01-08 14:57:51
 * @LastEditTime: 2021-01-11 11:18:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\api\postApi.js
 */
import request from '@/utils/request'

export function senEmailCode(data) { // 验证用户名是否被注册
    return request({
        url: '/user/email/code',
        method: 'post',
        data
    })
}


export function createUser(data) { // 创建用户
    return request({
        url: '/user/create',
        method: 'post',
        data
    })
}


export function resetPassword(data) { // 重置密码
    return request({
        url: '/user/reset-password',
        method: 'post',
        data
    })
}

export function login(data) { // 登录
    return request({
        url: '/auth/login',
        method: 'post',
        data
    })
}

export function encrypt(data) { // 加密
    return request({
        url: '/auth/encrypt',
        method: 'post',
        data
    })
}
