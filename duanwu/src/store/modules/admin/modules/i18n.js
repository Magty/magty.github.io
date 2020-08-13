import debug from '@/utils/debug'
import {
  pathInit
} from './db'
import lang from '@/lang'
import {
  i18n
} from '@/config/settings'
const {
  db,
  title
} = debug

const state = {
  locale: ''
}
const mutations = {
  setLocale: function (state, lang) {
    state.locale = lang
  }
}
const localName = 'i18n-locale'
const actions = {
  getLocale: function ({
    state,
    commit
  }) {
    let local = null
    const dbValue = db.get(pathInit({
      dbName: 'database',
      path: '',
      user: true,
      defaultValue: {}
    }))
    const localValue = dbValue.get(localName).value()
    if (localValue) {
      local = localValue
    } else {
      if (i18n.auto) {
        const language = navigator.language
        local = lang[language] ? language : i18n.default
        dbValue.set(localName, local).write()
      } else {
        local = i18n.default
      }
    }
    commit('setLocale', local)
  },
  setLocale: function ({
    commit
  }, {
    locale,
    vm
  }) {
    locale = locale || i18n.default
    const dbValue = db.get(pathInit({
      dbName: 'database',
      path: '',
      user: true,
      defaultValue: {}
    }))
    dbValue.set(localName, locale).write()
    commit('setLocale', locale)
    vm.$i18n.locale = locale
    title({
      title: vm.$route.meta.title
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
