import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'view-design'

import {
  homeName,
  routerMode,
  routerBase,
  showProgressBar
} from '@/config/settings'
import {
  setTitles
} from '@/utils/util'
/* import {
  getToken
} from '../utils/auth' */
import debug from '@/utils/debug'
import routes from './routers'
import store from '@/store'
const {
  cookies
} = debug

Vue.use(VueRouter)

const LOGIN_PAGE_NAME = 'dashboard-console'
const router = new VueRouter({
  routes,
  mode: routerMode,
  base: routerBase
})

router.beforeEach((to, from, next) => {
  if (showProgressBar) {
    iView.LoadingBar.start()
  }
  if (to.matched.some(item => item.meta.auth)) {
    const token = cookies.get('token')
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      /* next({
        name: LOGIN_PAGE_NAME,
        query: {
          redirect: to.fullPath
        }
      }) */
      next()
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      next()
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      next({
        name: homeName
      })
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  if (showProgressBar) {
    iView.LoadingBar.finish()
    console.log(to)
    store.dispatch('admin/page/open', to)
    setTitles({
      title: to.meta.title
    })
    window.scrollTo(0, 0)
  }
})

export default router
