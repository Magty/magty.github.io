import {
  login,
  logout,
  getUserInfo,
  authorization
} from '@/api/user'

import {
  setToken,
  getToken
} from '@/utils/auth'

const state = {
  userName: '',
  userId: '',
  avatarImgPath: '',
  token: getToken(),
  access: ''
}

const getters = {

}
const mutations = {
  setUserName(state, name) {
    state.userName = name
  },
  setUserId(state, id) {
    state.userId = id
  },
  setAccess(state, access) {
    state.access = access
  },
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  setAvatar(state, avatarPath) {
    state.avatarImgPath = avatarPath
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
          commit('setToken', res.data.token)
          resolve()
        } else {
          reject(new Error('用户名错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserInfo({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      try {
        getUserInfo(state.token).then(res => {
          const data = res.data
          commit('setUserName', data.name)
          commit('setUserId', data.user_id)
          commit('setAvatar', data.avatar)
          commit('setAccess', data.access)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      } catch (e) {
        reject(e)
      }
    })
  },
  logout({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      }).catch(err => {
        reject(err)
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
          commit('setToken', res.data.token)
          resolve(res.data.rules.page)
          // commit('SET_RULES', res.data.rules.component)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
