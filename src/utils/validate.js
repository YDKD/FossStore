/*
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-09 16:01:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\utils\validate.js
 */



/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
