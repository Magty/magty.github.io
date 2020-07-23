import Vue from 'vue'
import NotificationCom from './notification'
import PageHeader from './page-header'

/* const Notification = {
  install: function (Vue) {
    Vue.component('Notification', NotificationCom)
  }
} */

const customComs = {
  Notification: NotificationCom,
  PageHeader
}

const install = () => {
  Object.keys(customComs).forEach(key => {
    Vue.component(key, customComs[key])
  })
  /* for (const [key, value] of entries(customComs)) {
    Vue.component(key, value)
  } */
}

export default {
  install
}
