import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
import './font/iconfont'
// register globally
Vue.component('svg-icon', SvgIcon)
let url = 'http://at.alicdn.com/t/font_2296967_1vqykxh3mdr.js'
const link = document.createElement('script')
link.type = "text/javascript"
link.src = url
const head = document.getElementsByTagName('head')[0]
head.appendChild(link)


const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
