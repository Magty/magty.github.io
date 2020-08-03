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

// const LOGIN_PAGE_NAME = 'dashboard-console'
const LOGIN_PAGE_NAME = 'login'
// console.log(routes)
const router = new VueRouter({
  routes,
  mode: routerMode,
  base: routerBase
})

router.beforeEach((to, from, next) => {
  if (showProgressBar) {
    iView.LoadingBar.start()
  }
  // console.log('==to:' + to.name)
  if (to.matched.some(item => item.meta.auth)) {
    const token = cookies.get('token')
    // console.log(token)
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      next({
        name: LOGIN_PAGE_NAME,
        query: {
          redirect: to.fullPath
        }
      })
      next()
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      console.log(222)
      next()
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      next({
        name: homeName
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(to => {
  if (showProgressBar) {
    iView.LoadingBar.finish()
    store.dispatch('admin/page/open', to)
    setTitles({
      title: to.meta.title
    })
    window.scrollTo(0, 0)
  }
})

export default router
