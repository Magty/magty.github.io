import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ViewUI from 'view-design'

import messages from '@/lang'
import 'view-design/dist/styles/iview.css'
import '@/assets/font/iconfont.css'
// import importDirective from '@/directive'

import customComponent from '_c'

import link from '_c/i-link'
import iFrame from '_c/i-frame'

import App from './App.vue'
import router from './router'
import routers from './router/route-table'
import siderRouters from './router/config/routers'
import headerRouters from './router/config'
import store from './store'
import MyPlugin from '@/plugin'
import mixin from '@/mixins/appRouteChange.js'

import {
  dynamicSiderMenu
} from './config/settings'

import {
  getHeaderByPath,
  getRouteByHeader,
  getOpenNamesByPath
} from './utils/route'

// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  require('./mock')
}

store.dispatch('admin/i18n/getLocale')
const locale = store.state.admin.i18n.locale
Vue.use(VueI18n)
Vue.locale = () => {}
Vue.config.lang = locale
const i18n = new VueI18n({
  locale,
  /* fallbackLocale: 'en',
  silentFallbackWarn: true, */
  messages
})

window && (window.$t = (key, value) => {
  return i18n.t(key, value)
})

Vue.use(MyPlugin)
Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(customComponent)
Vue.component('i-link', link)
Vue.component('i-frame', iFrame)

Vue.config.productionTip = false
// importDirective(Vue)

new Vue({
  mixins: [mixin],
  router,
  store,
  i18n,
  render: h => h(App),
  created: function () {
    this.$store.commit('admin/page/init', routers)
    this.$store.commit('admin/menu/setHeader', headerRouters)
    this.$store.dispatch('admin/account/load')
    this.$store.dispatch('admin/layout/listenFullscreen')
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      let path = newRoute.matched[newRoute.matched.length - 1].path
      if (!dynamicSiderMenu) {
        let header = getHeaderByPath(path, siderRouters)
        if (header === null) {
          path = newRoute.path
          header = getHeaderByPath(path, siderRouters)
        }
        if (header) {
          this.$store.commit('admin/menu/setHeaderName', header)
          this.$store.commit('admin/menu/setMenuSider', siderRouters)
          const route = getRouteByHeader(siderRouters, header)
          this.$store.commit('admin/menu/setSider', route)
          this.$store.commit('admin/menu/setActivePath', newRoute.path)
          const openNames = getOpenNamesByPath(path, siderRouters)
          this.$store.commit('admin/menu/setOpenNames', openNames)
        }
      }
      this.appRouteChange(newRoute, oldRoute)
    }
  }
}).$mount('#app')
