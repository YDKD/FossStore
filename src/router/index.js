import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// 首页
import index from '@/views/index'

export const constantRoutes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/index',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/ErrorPage/404.vue'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/ErrorPage/403.vue'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/password-reset',
    component: () => import('@/views/modifyAccount/reset-password'),
    hidden: true
  },

  // {
  //   path: '/dashboard',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '统计概览', icon: 'icon-gailan' }
  //   }]
  // },

]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
