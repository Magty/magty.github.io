import user from './modules/user'
import page from './modules/page'
import menu from './modules/menu'
import log from './modules/log'
import layout from './modules/layout'
import i18n from './modules/i18n'
import account from './modules/account'
import db from './modules/db'
export default {
  namespaced: true,
  modules: {
    user,
    page,
    menu,
    log,
    layout,
    i18n,
    db,
    account
  }
}
