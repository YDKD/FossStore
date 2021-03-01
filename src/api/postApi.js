/*
 * @Author: your name
 * @Date: 2021-01-08 14:57:51
 * @LastEditTime: 2021-01-15 15:07:30
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


export function forgetPassword(data) { // 忘记密码
    return request({
        url: '/user/forget-password',
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

export function uploadFile(data) { // 上传
    return request({
        url: '/auth/upload',
        method: 'post',
        data
    })
}

export function exportData(data) { // 导出数据
    return request({
        url: '/goods/export_hot',
        method: 'post',
        data
    })
}

export function saveConfigCategoryData(data) { // 导出数据
    return request({
        url: '/system/category',
        method: 'post',
        data
    })
}


export function modifyUserData(data) { // 修改用户信息
    return request({
        url: '/system/config_user/modify',
        method: 'post',
        data
    })
}

export function deleteUser(data) { // 修改用户信息
    return request({
        url: `/system/config_user/del_user`,
        method: 'delete',
        data
    })
}


export function sendUserConfigureData(data) { // 发送用户要爬取的数据
    return request({
        url: '/system/configure/custom',
        method: 'post',
        data
    })
}

export function resetUsername(data) { // 重置用户名
    return request({
        url: '/user/reset-username',
        method: 'post',
        data
    })
}

export function validateEmail(data) { // 验证原来邮箱
    return request({
        url: '/user/validate/email',
        method: 'post',
        data
    })
}

export function resetEmail(data) { // 重置邮箱
    return request({
        url: '/user/reset-email',
        method: 'post',
        data
    })
}

export function screenShopData(data) { // 筛选店铺评分数据
    return request({
        url: '/shop/screen_data',
        method: 'post',
        data
    })
}
