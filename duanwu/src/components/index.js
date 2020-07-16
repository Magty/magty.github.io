import Vue from 'vue'
import NotificationCom from './notification'

/* const Notification = {
  install: function (Vue) {
    Vue.component('Notification', NotificationCom)
  }
} */

const customComs = {
  Notification: NotificationCom
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
