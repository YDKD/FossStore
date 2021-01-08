/*
 * @Author: your name
 * @Date: 2021-01-08 14:57:51
 * @LastEditTime: 2021-01-08 17:18:50
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
        url: '/user/email/code',
        method: 'post',
        data
    })
}


export function encryptData(data) { // 创建用户
    return request({
        url: '/auth/decrypt',
        method: 'post',
        data
    })
}
