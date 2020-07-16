const state = {
  locale: ''
}
const mutations = {
  setLocale: function (state, lang) {
    state.locale = lang
  }
}
const actions = {
  getLocale: function ({
    commit
  }) {
    commit('setLocale', 'zh-CN')
  },
  setLocale: function ({
    commit
  }, {
    lang,
    vm
  }) {
    commit('setLocale', lang)
    vm.$i18n.locale = lang
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
