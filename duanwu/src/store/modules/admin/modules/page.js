import lodash from 'lodash'
import router from '@/router'
import {
  page
} from '@/config/settings'

var getCache = function (route) {
  return lodash.get(route, 'meta.cache', false)
}

console.log(page.opened)
const state = {
  pool: [],
  opened: page.opened,
  current: '',
  keepAlive: []
}
const mutations = {
  keepAliveRefresh: function (state) {
    state.keepAlive = state.opened.filter((item) => {
      return getCache(item)
    }).map(item => {
      return item.name
    })
  },
  keepAliveRemove: function (state, alive) {
    const aliveArray = [...state.keepAlive]
    const index = aliveArray.findIndex(item => item === alive)
    if (index !== -1) {
      aliveArray.splice(index, 1)
      state.keepAlive = aliveArray
    }
  },
  replaceOpened: function (state, {
    index,
    replace
  }) {
    console.log('replace:' + index)
    if (replace) {
      state.opened.splice(index, 1, replace)
    } else {
      state.opened.splice(index, 1)
    }
  },
  addOpened: function (state, open) {
    console.log('addopened' + open)
    state.opened.push(open)
  },
  keepAlivePush: function (state, alive) {
    const aliveArray = [...state.keepAlive]
    aliveArray.push(alive)
    state.keepAlive = aliveArray
  },
  keepAliveClean: function (state) {
    state.keepAlive = []
  },
  currentSet: function (state, current) {
    state.current = current
  },
  setOpened: function (state, opened) {
    console.log('setopened')
    state.opened = opened
  },
  init: function (state, routers) {
    const pool = []
    const getPool = (orignRouters) => {
      orignRouters.forEach(route => {
        if (route.children) {
          getPool(route.children)
        } else if (!route.hidden) {
          const {
            meta,
            name,
            path
          } = route
          pool.push({
            meta,
            name,
            path
          })
        }
      })
    }
    getPool(routers)
    state.pool = pool
  }
}
const actions = {
  openedLoad: function ({
    stae,
    commit,
    dispatch,
    rootState
  }) {
    return new Promise(() => {

    })
  },
  opened2db: function ({
    state,
    dispatch
  }) {
    return new Promise(() => {

    })
  },
  openedUpdate: function ({
    state,
    commit,
    dispatch
  }, {
    index,
    params,
    query,
    fullPath,
    meta,
    keepMeta
  }) {
    return new Promise((resolve) => {
      const replace = lodash.cloneDeep(state.opened[index])
      replace.params = params || replace.params
      replace.query = query || replace.query
      replace.fullPath = fullPath || replace.fullPath
      replace.meta = meta || replace.meta
      replace.keepMeta = keepMeta
      commit('replaceOpened', {
        index,
        replace
      })
      // state.opened.splice(index, 1, replace)
      resolve()
      // dispatch('opened2db')
    })
  },
  add: function ({
    state,
    commit,
    dispatch
  }, {
    tag,
    params,
    query,
    fullPath
  }) {
    return new Promise((resolve) => {
      const temp = tag
      temp.params = params || temp.params
      temp.query = query || temp.query
      temp.fullPath = fullPath || temp.fullPath
      commit('addOpened', temp)
      // state.opened.push(temp)
      dispatch('opened2db')
      resolve()
    })
  },
  open: async function ({
    state,
    commit,
    dispatch
  }, {
    name,
    params,
    query,
    fullPath
  }) {
    const openedClone = state.opened
    let index = 0
    const find = openedClone.find((item, idx) => {
      const flag = item.fullPath === fullPath
      if (flag) {
        index = idx
      }
      return flag
    })
    commit('currentSet', fullPath)
    if (find) {
      await dispatch('openedUpdate', {
        index,
        params,
        query,
        fullPath
      })
    } else {
      const findPool = state.pool.find(item => item.name === name)
      console.log(findPool)
      if (findPool) {
        dispatch('add', {
          tag: Object.assign({}, findPool),
          params,
          query,
          fullPath
        })
      }
    }
  },
  close: async function ({
    state,
    commit,
    dispatch
  }, {
    tagName
  }) {
    // const opened0 = state.opened[0]
    if (tagName !== state.current) {
      const index = state.opened.findIndex(item => item.fullPath === tagName)
      if (index >= 0) {
        commit('keepAliveRemove', state.opened[index].name)
        commit('replaceOpened', {
          index
        })
      }
      await dispatch('opened2db')
    } else {
      const length = state.opened.length
      let open = state.opened[0]
      for (let i = 0; i < length; i++) {
        if (state.opened[i].fullPath === tagName) {
          commit('keepAliveRemove', state.opened[i].name)
          commit('replaceOpened', {
            index: i
          })
          open = length > 1 ? i === length - 1 ? state.opened[i - 1] : state.opened[i + 1] : {}
          const name = open.name ? open.name : 'index'
          const params = open.params ? open.params : {}
          const query = open.query ? open.query : {}
          router.push({
            name,
            params,
            query
          })
          break
        }
      }
    }
  },
  closeLeft: function ({
    state,
    commit,
    dispatch
  }) {
    /* const {
      pageSelect
    } = arguments.length > 1 && arguments[1] ? arguments[1] : {} */
    return new Promise(() => {

    })
  },
  closeRight: function ({
    state,
    commit,
    dispatch
  }) {
    /* const {
      pageSelect
    } = arguments.length > 1 && arguments[1] ? arguments[1] : {} */
    return new Promise(() => {

    })
  },
  closeOther: function ({
    state,
    commit,
    dispatch
  }) {
    /* const {
      pageSelect
    } = arguments.length > 1 && arguments[1] ? arguments[1] : {} */
    return new Promise(() => {

    })
  },
  closeAll: function ({
    state,
    commit,
    dispatch
  }) {
    return new Promise(() => {

    })
  },
  updateOpened: function ({
    state,
    commit,
    dispatch
  }, {
    opened
  }) {
    return new Promise(() => {
      commit('setOpened', opened)
      dispatch('opened2db')
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
