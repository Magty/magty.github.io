import cloneDeep from 'clone-deep'

function filterSiderByAccess(sider, access, target) {
  sider.forEach(item => {
    const auth = item.auth
    if (!auth || auth.includes(access)) {
      const clone = {}
      /* if (item.keys().includes('children')) {
        clone.children = cloneDeep(item.children)
      } */
      for (const key in item) {
        if (key !== 'children') {
          clone[key] = cloneDeep(item[key])
        }
      }
      if (item.children && item.children.length) {
        clone.children = []
      }
      target.push(clone)
      if (item.children) {
        filterSiderByAccess(item.children, access, clone.children)
      }
    }
  })
  return target
}
const state = {
  header: [],
  sider: [],
  headerName: '',
  activePath: '',
  openNames: [],
  menuSider: [],
  menuBadge: [{
    path: '/dashboard/monitor',
    count: 1
  }, {
    path: '/search',
    text: 'New',
    type: 'warning'
  }, {
    path: '/result',
    color: 'cyan'
  }]
}
const getters = {
  filterSider: function (state, getters, rootState) {
    const info = rootState.admin.user.info
    const access = info.access
    return (access && access.length) ? filterSiderByAccess(state.sider, access, []) : filterSiderByAccess(state.sider, [], [])
  },
  filterHeader: function (state, getters, rootState) {
    const info = rootState.admin.user.info
    const access = info.access
    if (access && access.length) {
      state.header.filter(item => {
        return item.auth && item.auth.includes(access)
      })
    } else {
      state.header.filter(item => {
        return !item.auth
      })
    }
  },
  currentHeader: function (state) {
    return state.header.find(item => item.name === state.headerName)
  },
  hideSider: function (state, getters) {
    let isHide = false
    if (getters.currentHeader && 'hideSider' in getters.currentHeader) {
      isHide = getters.currentHeader.hideSider
    }
    return isHide
  }
}
const mutations = {
  setSider: function (state, sider) {
    state.sider = sider
  },
  setHeader: function (state, header) {
    state.header = header
  },
  setHeaderName: function (state, headerName) {
    state.headerName = headerName
  },
  setActivePath: function (state, path) {
    state.activePath = path
  },
  setOpenNames: function (state, names) {
    state.openNames = names
  },
  setMenuSider: function (state, sider) {
    state.menuSider = sider
  },
  setMenuBadge: function (state, menuBadge) {
    const {
      path,
      badge
    } = menuBadge
    const cloneBadge = cloneDeep(state.menuBadge)
    const index = cloneBadge.findIndex(item => item.path === path)
    if (index >= 0) {
      cloneBadge[index] = badge
      state.menuBadge = cloneBadge
    } else {
      state.menuBadge.push(badge)
    }
  },
  removeMenuBadge: function (state, path) {
    const index = state.menuBadge.findIndex(item => item.path === path)
    if (index >= 0) {
      state.menuBadge.splice(index, 1)
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations
}
