/*
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-08 09:25:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\icons\index.js
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
import './font/iconfont'
// register globally
Vue.component('svg-icon', SvgIcon)
let url = 'http://at.alicdn.com/t/font_2296967_poh6onkj5yr.js'
const link = document.createElement('script')
link.type = "text/javascript"
link.src = url
const head = document.getElementsByTagName('head')[0]
head.appendChild(link)


const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
