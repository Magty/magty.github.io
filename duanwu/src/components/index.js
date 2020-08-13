import Captcha from './captcha'
import Email from './email'
import Login from './login'
import Mobile from './mobile'
import Notification from './notification'
import NotificationTab from './notification-tab'
import NotificationItem from './notification-item'
import PageHeader from './page-header'
import Password from './password'
import Result from './result'
import Submit from './submit'
import UserName from './user-name'

import Copy from './base/copy'

import locale from '../local/index'

import resize from '../directive/resize'
import styles from '../directive/styles'
import lineClamp from '../directive/line-clamp'

/* const Notification = {
  install: function (Vue) {
    Vue.component('Notification', NotificationCom)
  }
} */

const components = {
  Captcha,
  Email,
  Login,
  Mobile,
  Notification,
  NotificationItem,
  NotificationTab,
  PageHeader,
  Password,
  Result,
  Submit,
  UserName
}

const directives = {
  display: styles.display,
  width: styles.width,
  height: styles.height,
  margin: styles.margin,
  padding: styles.padding,
  font: styles.font,
  color: styles.color,
  'bg-color': styles.bgColor,
  resize,
  'line-clamp': lineClamp
}

const filters = {

}

const install = (Vue, opts = {}) => {
  if (install.installed) return
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
  /* for (const [key, value] of entries(customComs)) {
    Vue.component(key, value)
  } */
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  Vue.prototype.$IVIEWPRO = {
    size: opts.size || '',
    transfer: 'transfer' in opts ? opts.transfer : ''
  }
  Vue.prototype.$Copy = Copy
  /* Vue.prototype.$ScrollIntoView = ScrollIntoView
  Vue.prototype.$ScrollTop = ScrollTop
  Vue.prototype.$Date = Date */
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  // version: process.env.VERSION,
  version: '2.0.0',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  ...components
}

API.lang = (code) => {
  const langObject = window['iview/locale'].default
  if (code === langObject.i.locale) locale.use(langObject)
  else console.log(`The ${code} language pack is not loaded.`) // eslint-disable-line no-console
}

// module.exports.default = module.exports = API

export default API
