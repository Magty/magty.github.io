import lodash from 'lodash'
import routers from '@/router/config/routers'
import router from '@/router'
import {
  arrayRoutes,
  isInArray
} from '@/utils/route.js'
import {
  page
} from '@/config/settings'

var getCache = function (route) {
  return lodash.get(route, 'meta.cache', false)
}

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
    // console.log('==alive' + alive)
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
    // console.log(index + '====replaceOpenedset:' + replace)
    if (replace) {
      state.opened.splice(index, 1, replace)
    } else {
      state.opened.splice(index, 1)
    }
  },
  addOpened: function (state, open) {
    // console.log('=====addopenedset')
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
    // console.log('====set---openedset')
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
  openedLoad: async function ({
    state,
    commit,
    dispatch,
    rootState
  }) {
    const pageOpened = await dispatch('admin/db/get', {
      dbName: 'sys',
      path: 'page.opened',
      defaultValue: page.opened,
      user: true
    }, {
      root: true
    })
    const opened = []
    const arrRouter = arrayRoutes(routers)
    const load = pageOpened.map(item => {
      if (item.fullPath === '/index') {
        opened.push(1)
        return item
      }
      const current = state.pool.find(pool => pool.name === item.name)
      if (item.keepMeta) {
        current.meta = Object.assign({}, item.meta)
      }
      opened.push(current ? 1 : 0)
      return Object.assign({}, item, current)
    }).filter((item, index) => {
      return opened[index] === 1
    }).filter(item => {
      const find = arrRouter.find(route => {
        return route.path === item.fullPath
      })
      let flag = true
      if (find && find.auth) {
        const info = rootState.admin.user.info
        const access = info.access
        if (access && isInArray(find.auth, access)) {
          flag = false
        }
      }
      return flag
    })
    // console.log('load:' + load)
    commit('setOpened', load)
    commit('keepAliveRefresh')
  },
  opened2db: async function ({
    state,
    dispatch
  }) {
    await dispatch('admin/db/set', {
      dbName: 'sys',
      path: 'page.opened',
      value: state.opened,
      user: true
    }, {
      root: true
    })
  },
  openedUpdate: async function ({
    state,
    commit,
    dispatch
  }, {
    index,
    params,
    query,
    fullPath,
    keepMeta = false
  }) {
    const replace = Object.assign({}, state.opened[index], {
      params,
      query,
      fullPath,
      keepMeta
    })
    // console.log('==replaceparams:' + replace.params)
    // replace.params = params || replace.params
    /* replace.query = query || replace.query
    replace.fullPath = fullPath || replace.fullPath
    replace.meta = meta || replace.meta
    replace.keepMeta = keepMeta */
    // state.opened.splice(index, 1, replace)
    commit('replaceOpened', {
      index,
      replace
    })
    await dispatch('opened2db')
  },
  currentUpdate: async function ({
    state,
    commit,
    dispatch
  }, {
    params,
    query,
    fullPath,
    meta,
    keepMeta = false
  }) {
    const index = state.opened.findIndex(item => item.fullPath === state.current)
    /* const replace = state.opened[index]
    replace.params = params || replace.params
    replace.query = query || replace.query
    replace.fullPath = fullPath || replace.fullPath
    replace.meta = meta || replace.meta
    replace.keepMeta = keepMeta */
    const replace = Object.assign({}, state.opened[index], {
      params,
      query,
      fullPath,
      meta,
      keepMeta
    })
    state.opened.splice(index, 1, replace)
    commit('replaceOpened', {
      index,
      replace
    })
    await dispatch('opened2db')
  },
  add: async function ({
    state,
    commit,
    dispatch
  }, {
    tag,
    params,
    query,
    fullPath
  }) {
    const temp = tag
    temp.params = params || temp.params
    temp.query = query || temp.query
    temp.fullPath = fullPath || temp.fullPath
    commit('addOpened', temp)
    await dispatch('opened2db')
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
    let index = 0
    const find = state.opened.find((item, idx) => {
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
  closeLeft: async function ({
    state,
    commit,
    dispatch
  }, {
    pageSelect
  }) {
    /* const {
      pageSelect
    } = arguments.length > 1 && arguments[1] ? arguments[1] : {} */
    const current = pageSelect || state.current
    let index = 0
    state.opened.forEach((item, idx) => {
      if (item.fullPath === current) {
        index = idx
      }
    })
    console.log('index:' + index)
    if (index > 0) {
      const cloneOpened = lodash.cloneDeep(state.opened)
      cloneOpened.splice(1, index - 1).forEach(item => {
        commit('keepAliveRemove', item.name)
      })
      commit('setOpened', cloneOpened)
    }
    state.current = current
    console.log(router)
    if (router.app.$route.fullPath !== current) {
      router.push(current)
    }
    await dispatch('opened2db')
  },
  closeRight: async function ({
    state,
    commit,
    dispatch
  }, {
    pageSelect
  }) {
    const current = pageSelect || state.current
    let index = 0
    state.opened.forEach((item, idx) => {
      if (item.fullPath === current) {
        index = idx
      }
    })
    // console.log('closeRightindex:' + index)
    const cloneOpened = lodash.cloneDeep(state.opened)
    cloneOpened.splice(index + 1).forEach(item => {
      commit('keepAliveRemove', item.name)
    })
    commit('setOpened', cloneOpened)
    state.current = current
    if (router.app.$route.fullPath !== current) {
      router.push(current)
    }
    await dispatch('opened2db')
  },
  closeOther: async function ({
    state,
    commit,
    dispatch
  }, {
    pageSelect
  }) {
    /* const {
      pageSelect
    } = arguments.length > 1 && arguments[1] ? arguments[1] : {} */
    const current = pageSelect || state.current
    let index = 0
    state.opened.forEach((item, idx) => {
      if (item.fullPath === current) {
        index = idx
      }
    })
    const cloneOpened = lodash.cloneDeep(state.opened)
    if (index === 0) {
      cloneOpened.splice(1).forEach(item => commit('keepAliveRemove', item.name))
    } else {
      cloneOpened.splice(index + 1).forEach(item => commit('keepAliveRemove', item.name))
      cloneOpened.splice(1, index - 1).forEach(item => {
        commit('keepAliveRemove', item.name)
      })
    }
    commit('setOpened', cloneOpened)
    state.current = current
    console.log(router)
    if (router.app.$route.fullPath !== current) {
      router.push(current)
    }
    await dispatch('opened2db')
  },
  closeAll: async function ({
    state,
    commit,
    dispatch
  }) {
    const cloneOpened = lodash.cloneDeep(state.opened)
    cloneOpened.splice(1).forEach(item => commit('keepAliveRemove', item.name))
    commit('setOpened', cloneOpened)
    await dispatch('opened2db')
    if (router.app.$route.name !== 'index') {
      router.push({
        name: 'index'
      })
    }
  },
  updateOpened: async function ({
    state,
    commit,
    dispatch
  }, {
    opened
  }) {
    commit('setOpened', opened)
    await dispatch('opened2db')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
