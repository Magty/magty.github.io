import {
  getMenuByRouter,
  getHomeRoute,
  getBreadCrumbList,
  getTabsListFromLocalstorage,
  setTabsListInLocalstorage,
  getNextRoute,
  routeEqual,
  getRouteTitleHandled,
  routeHasExist
  /* ,
    getRouteByName,
    getTabNameByRoute */
  ,
  getRouteByName
} from '@/utils/util'

import routers from '@/router/routers'
import config from '@/config/settings'

import router from '../../router'

const {
  homeName
} = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tabsNavList, route)
  state.tabsNavList = state.tabsNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    homeRoute: {},
    breadCrumbList: [],
    tabsNavList: []
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
  },
  mutations: {
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTabsNavList(state, list) {
      let tabsList = []
      if (list) {
        tabsList = [...list]
      } else {
        tabsList = getTabsListFromLocalstorage() || []
      }
      // 将home放到最前面
      /* if (tabsList[0] && tabsList[0].name !== homeName) {
        tabsList.shift()
      } */
      const homeTabIndex = tabsList.findIndex(item => {
        return (item.name === homeName || (state.homeRoute.redirect && item.name === state.homeRoute.redirect.name))
      })
      if (homeTabIndex > 0) {
        const homeTab = tabsList.splice(homeTabIndex, 1)[0]
        tabsList.unshift(homeTab)
      }
      state.tabsNavList = tabsList
      setTabsListInLocalstorage([...tabsList])
    },
    closeTab(state, route) {
      const tab = state.tabsNavList.filter(item => routeEqual(item, route))
      route = tab[0] ? tab[0] : null
      if (route) {
        closePage(state, route)
      }
    },

    removeTab(state, payload) {
      const {
        route,
        name
      } = payload
      const index = state.tabsNavList.findIndex(item => routeEqual(item, route))
      console.log(name + '===del:' + index)
      if (name === 'left') {
        if (index > 1) {
          state.tabsNavList.splice(0, index)
        } else {
          return
        }
      } else if (name === 'right') {
        if ((state.tabsNavList.length - 1) > index) {
          state.tabsNavList.splice(index + 1, state.tabsNavList.length - 1 - index)
        } else {
          return
        }
      } else if (name === 'others') {
        if (state.tabsNavList.length === 1) {
          return
        } else {
          state.tabsNavList = [state.tabsNavList.splice(index, 1)[0]]
        }
      } else if (name === 'all') {
        state.tabsNavList.splice(0, state.tabsNavList.length)
      } else {
        state.tabsNavList.splice(index, 1)
      }
      setTabsListInLocalstorage([...state.tabsNavList])
    },
    addTab(state, {
      route,
      type = 'unshift'
    }) {
      const router = getRouteTitleHandled(route)
      console.log('add:' + route.name)
      if (!routeHasExist(state.tabsNavList, router)) {
        if (type === 'push') {
          state.tabsNavList.push(router)
        } else {
          if (router.name === homeName) {
            state.tabsNavList.unshift(router)
          } else {
            state.tabsNavList.splice(1, 0, router)
          }
        }
      }
      setTabsListInLocalstorage([...state.tabsNavList])
    },
    updateRoute(state, route) {
      this.setBreadCrumb(state, route)
      const {
        name,
        query,
        params,
        meta
      } = route
      this.addTab({
        route: {
          name,
          query,
          params,
          meta
        },
        type: 'push'
      })
    }
  },
  actions: {
    tabRemove({
      commit,
      state
    }, {
      id,
      route
    }) {
      return new Promise(resolve => {
        const delRoute = getRouteByName(id)
        console.log(state.tabsNavList.length)
        console.log(delRoute)
        let nextRoute = {}

        if ((state.tabsNavList.length === 1 && routeEqual(delRoute, state.homeRoute)) || (state.tabsNavList.length > 1 && !routeEqual(delRoute, route))) {
          commit('removeTab', {
            route: delRoute
          })
          resolve()
        } else {
          nextRoute = getNextRoute(state.tabsNavList, route, delRoute)
          commit('removeTab', {
            route: delRoute
          })
          const {
            name,
            params,
            query
          } = Object.keys(nextRoute).length > 0 ? nextRoute : state.homeRoute
          resolve({
            name,
            params,
            query
          })
        }
      })
    }
  }
}
