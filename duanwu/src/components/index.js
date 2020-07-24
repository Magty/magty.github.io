import Vue from 'vue'
import Notification from './notification'
import NotificationTab from './notification-tab'
import NotificationItem from './notification-item'
import PageHeader from './page-header'

/* const Notification = {
  install: function (Vue) {
    Vue.component('Notification', NotificationCom)
  }
} */

const customComs = {
  Notification,
  NotificationItem,
  NotificationTab,
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
