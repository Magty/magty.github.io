import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ViewUI from 'view-design'

import messages from '@/lang'

import 'view-design/dist/styles/iview.css'
import '@/assets/font/iconfont.css'

import customComponent from '_c'

import link from '_c/i-link'

import App from './App.vue'
import router from './router'
import routers from './router/routers'
import siderRouters from './router/config/routers'
import headerRouters from './router/config'
import store from './store'
import MyPlugin from '@/plugin'

import {
  dynamicSiderMenu
} from './config/settings'

import {
  getHeaderByPath,
  getRouteByHeader,
  getOpenNamesByPath
} from './utils/route'

store.dispatch('admin/i18n/getLocale')
const locale = store.state.admin.i18n.locale
Vue.use(VueI18n)
Vue.use(ViewUI)
const i18n = new VueI18n({
  locale,
  /* fallbackLocale: 'en',
  silentFallbackWarn: true, */
  messages
})
Vue.use(MyPlugin)
Vue.use(customComponent)
Vue.component('i-link', link)

Vue.config.productionTip = false

function appRouteChange(newRoute, oldRoute) {

}
new Vue({
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
      const path = newRoute.matched[newRoute.matched.length - 1].path
      if (!dynamicSiderMenu) {
        const header = getHeaderByPath(path, siderRouters)
        if (header && path === newRoute.path) {
          this.$store.commit('admin/menu/setHeaderName', header)
          this.$store.commit('admin/menu/setMenuSider', siderRouters)
          const route = getRouteByHeader(siderRouters, header)
          this.$store.commit('admin/menu/setSider', route)
          this.$store.commit('admin/menu/setActivePath', newRoute.path)
          const openNames = getOpenNamesByPath(path, siderRouters)
          this.$store.commit('admin/menu/setOpenNames', openNames)
        }
      }
      appRouteChange(newRoute, oldRoute)
    }
  }
}).$mount('#app')
