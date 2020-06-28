import {
  login,
  authorization
} from '@/api/user'

import {
  setToken
} from '@/utils/auth'

const state = {
  userName: ''
}

const getters = {

}
const mutations = {
  SET_USER_NAME(state, payload) {
    state.userName = payload.name
  }
}

const actions = {
  updateUserName({
    commit,
    state,
    rootState
  }) {

  },
  login({
    commit
  }, {
    userName,
    password
  }) {
    return new Promise((resolve, reject) => {
      login({
        userName,
        password
      }).then(res => {
        if (res.code === 200 && res.data && res.data.token) {
          setToken(res.data.token)
          resolve()
        } else {
          reject(new Error('用户名错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  authorization({
    commit
  }, token) {
    return new Promise((resolve, reject) => {
      authorization().then(res => {
        if (parseInt(res.code) === 401) {
          reject(new Error('token error'))
        } else {
          setToken(res.data.token)
          resolve(res.data.rules.page)
          // commit('SET_RULES', res.data.rules.component)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout() {
    setToken('')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
