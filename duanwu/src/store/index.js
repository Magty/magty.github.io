import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user1'
import app from './modules/app'

import admin from './modules/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  mutations: {},
  actions: {},
  modules: {
    admin,
    app,
    user
  }
})
