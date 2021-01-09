/*
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-09 17:21:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
