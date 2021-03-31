import router, { resetRouter } from "@/router/index"
import store from "./store"
import { Message } from "element-ui"
import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css" // progress bar style
import { getToken } from "@/utils/auth" // get token from cookie
import getPageTitle from "@/utils/get-page-title"
import Cookies from "js-cookie"
import { generateRouter } from "./utils/generate-router"
import { removeToken } from '@/utils/auth'
import { Store } from '@/utils/store'
let storage = new Store()
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ["/login", "/404", "/index", "/", "/register", "/dashboard/dashboard", "/password-reset"] // no redirect whitelist

router.beforeEach(async (to, from, next) => {

  if (Cookies.get("UserToken")) {
    if (!store.state.user.hasAuth) {
      let expires = storage.getItem('userInfo')
      if (expires) {
        await store.dispatch("user/getUserRouterList")
        next({ ...to, replace: true })
      } else {
        Message({
          type: "info",
          message: "当前账户已过期，请重新登录!",
        })
        Cookies.remove('UserToken')
        storage.clear()
        next({ path: '/login' })
      }
    } else {
      if (store.state.user.userInfo.choose_type) {
        next()
      } else {
        if (to.path == '/monitor') {
          next()
        } else {
          Message({
            type: "info",
            message: "检测当前用户未选择筛选类型，已为您自动跳转配置页!",
            duration: 3000
          })
          next({ path: "/monitor" })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) != -1) {
      next()
    } else {
      next({ path: '/login' })
      removeToken()
    }
  }
  

  // if (Cookies.get("UserToken") || whiteList.indexOf(to.path) != -1) {
  //   if (!store.state.user.hasAuth && sessionStorage.getItem("userInfo")) {
  //     await store.dispatch("user/getUserRouterList")
  //     next({ ...to, replace: true })
  //   } else {
  //     if (store.state.user.userInfo.choose_type) {
  //       next()
  //     } else {
  //       if (to.path == "/login" || to.path == "/monitor" || to.path == '/' || to.path == '/register' || to.path == "/password-reset") {
  //         next()
  //       } else {
  //         Message({
  //           type: "info",
  //           message: "检测当前用户未选择筛选类型，已为您自动跳转配置页!",
  //           duration: 3000
  //         })
  //         next({ path: "/monitor" })
  //       }
  //     }
  //     // next()
  //   }
  // } else {
  //   next({ path: "/login" })
  // }
})


// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
