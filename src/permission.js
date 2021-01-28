/*
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-11 10:54:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\permission.js
 */
import router, { resetRouter } from '@/router/index'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Cookies from 'js-cookie'
import { generateRouter } from './utils/generate-router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404', '/index', '/', '/register', '/password-reset'] // no redirect whitelist


router.beforeEach(async (to, from, next) => {
  if (Cookies.get('UserToken') || whiteList.indexOf(to.path) != -1) {
    if (!store.state.user.hasAuth && sessionStorage.getItem('userInfo')) {
      await store.dispatch('user/getUserRouterList')
      next({ ...to, replace: true })
    } else {
      next()
    }
  }
  else {
    next({ path: '/login' })
  }
})

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // 设置网页Title
//   // document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
