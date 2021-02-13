/*
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-11 15:09:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\store\modules\user.js
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { decrypt } from '@/utils/crypt'
import { Message } from 'element-ui'
import { formatRouterTree, generateRouter } from '@/utils/generate-router'
import router from '@/router/index'
import { getUserRourterListById } from '@/api/chartData'
const getDefaultState = () => {
  return {
    name: '',
    token: '',
    hasAuth: false,
    user_place: '',
    avatar: '',
    text: '',
    exp: sessionStorage.getItem(`exp`) || 0,
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || '',
    userRouterList: JSON.parse(sessionStorage.getItem('userRouterList')) || []
  }
}

const state = getDefaultState()

const mutations = {
  TEXT: (state, text) => {
    state.text = text
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  HAS_AUTH: (state, hasAuth) => {
    state.hasAuth = hasAuth
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  EXP_TIME: (state, exp) => {
    sessionStorage.setItem(`exp`, exp)
    state.exp = exp
  },
  USER_INFO: (state, userInfo) => {
    sessionStorage.setItem(`userInfo`, JSON.stringify(userInfo))
    state.userInfo = userInfo
  },
  USER_ROUTER_LIST: (state, userRouterList) => {
    sessionStorage.setItem('userRouterList', userRouterList)
    state.userRouterList = userRouterList
  },
  USER_PLACE: (state, user_place) => {
    state.user_place = user_place
  }
}

const actions = {
  // user login
  loginUsername({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        if (data.code == 50008 || data.code == 50009) {
          return reject(Message.error(data.msg))
        } else {
          let { access_token, userInfo } = decrypt(data.access_token)
          commit('EXP_TIME', data.exp)
          commit('USER_INFO', userInfo)
          setToken(access_token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUserRouterList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserRourterListById(state.userInfo.username).then(response => {
        let { data } = response
        const paylod = formatRouterTree(data),
          new_routes = generateRouter(paylod)
        router.options.routes = [...router.options.routes, ...new_routes]
        router.addRoutes(new_routes)
        commit('HAS_AUTH', true)
        commit('USER_ROUTER_LIST', JSON.stringify(router.options.routes))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.userInfo.username).then(() => {
        removeToken() // must remove  token  first
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

