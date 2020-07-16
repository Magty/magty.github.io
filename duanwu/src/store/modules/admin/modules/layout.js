import settings from '@/config/settings'
import screenfull from 'screenfull'
const state = {
  ...settings.layout,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isFullscreen: false
}
const mutations = {
  setDevice: function (state, deviceName) {
    state.isMobile = false
    state.isTablet = false
    state.isDesktop = false
    state['is'.concat(deviceName)] = true
  },
  updateMenuCollapse: function (state, collapsed) {
    state.menuCollapse = collapsed
  },
  setFullscreen: function (state, isFull) {
    state.isFullscreen = isFull
  },
  updateLayoutSetting: function (state, setting) {
    console.log(setting)
    const {
      key,
      value
    } = setting
    state[key] = value
  }
}
const actions = {
  listenFullscreen: function ({
    commit
  }) {
    return new Promise(resolve => {
      if (screenfull.isEnabled) {
        screenfull.on('change', () => {
          if (!screenfull.isFullscreen) {
            commit('setFullscreen', false)
          }
        })
      }
      resolve()
    })
  },
  toggleFullscreen: function ({
    commit
  }) {
    return new Promise(resolve => {
      if (screenfull.isFullscreen) {
        screenfull.exit()
        commit('setFullscreen', false)
      } else {
        screenfull.request()
        commit('setFullscreen', true)
      }
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
