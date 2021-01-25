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
const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    exp: sessionStorage.getItem(`exp`) || 0,
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
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
          let { access_token, userInfo, routerList } = decrypt(data.access_token)
          console.log(routerList)
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

  // user logout
  logout({ commit, state }) {
    console.log(state.userInfo)
    return new Promise((resolve, reject) => {
      logout(state.userInfo.username).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
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
      commit('RESET_STATE')
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

