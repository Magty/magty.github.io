import Cookies from 'js-cookie'
// import lowdb from 'lowdb'

import {
  cookiesExpires,
  titleSuffix
} from '@/config/settings'

const cookies = {
  set: function () {
    const name = (arguments.length > 0 && arguments[0]) ? arguments[0] : 'default'
    const cook = (arguments.length > 1 && arguments[1]) ? arguments[1] : ''
    const config = (arguments.length > 2 && arguments[2]) ? arguments[2] : {}
    const baseCfg = {
      expires: cookiesExpires
    }
    Object.assign(baseCfg, config)
    Cookies.set('admin-'.concat(name), cook, baseCfg)
  },
  get: function () {
    const name = (arguments.length > 0 & arguments[0]) ? arguments[0] : 'default'
    return Cookies.get('admin-'.concat(name))
  },
  getAll: function () {
    return Cookies.get()
  },
  remove: function () {
    const name = (arguments.length > 0 & arguments[0]) ? arguments[0] : 'default'
    return Cookies.remove('admin-'.concat(name))
  }
}

function makeIterator(array) {
  return mapArray(array) || mapIterator(array) || throwErr
}

function throwErr() {
  throw new TypeError('Invalid attempt to spread non-iterable instance')
}

function mapIterator(array) {
  if (Symbol.iterator in Object(array) || Object.prototype.toString.call(array) === '[object Arguments]') {
    return Array.from(array)
  }
}

function mapArray(array) {
  if (Array.isArray(array)) {
    const copyArr = []
    for (let i = 0; i < array.length; i++) {
      copyArr[i] = array[i]
    }
    return copyArr
  }
}

function color() {
  const colorAlias = arguments.length > 0 ? arguments[0] : 'default'
  let colorHash = ''
  switch (colorAlias) {
    case 'default':
      colorHash = '#515a6e'
      break
    case 'primary':
      colorHash = '#2d8cf0'
      break
    case 'success':
      colorHash = '#19be6b'
      break
    case 'warning':
      colorHash = '#ff9900'
      break
    case 'error':
      colorHash = '#ed4014'
      break
    default:
      break
  }
  return colorHash
}
const log = {
  capsule: function (alias, txt) {
    const content = arguments.length > 2 ? arguments[2] : 'primary'
    console.log('%c '.concat(alias, '%c ').concat(txt, '%c'), 'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;', 'background:'.concat(color(content), '; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;'), 'background:transparent')
  },
  colorful: function (logArray) {
    const print = console
    print.log.apply(print, ['%c'.concat(logArray.map(item => item.text || '').join('%c'))].concat(makeIterator(logArray.map(item => 'color: '.concat(color(logArray.type), ';')))))
  },
  default: function (log) {
    this.colorful([{
      text: log
    }])
  },
  primary: function (log) {
    this.colorful([{
      text: log,
      type: 'primary'
    }])
  },
  success: function (log) {
    this.colorful([{
      text: log,
      type: 'success'
    }])
  },
  warning: function (log) {
    this.colorful([{
      text: log,
      type: 'warning'
    }])
  },
  error: function (log) {
    this.colorful([{
      text: log,
      type: 'error'
    }])
  }
}
/* const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = lowdb(adapter)
db.default({
  sys: {},
  database: {}
}).write() */

function i18nTitle(title) {
  return window && window.$t && title.indexOf('$t:') === 0 ? window.$t(title.split('$t:')[1]) : title
}
const title = function ({
  title,
  count
}) {
  title = i18nTitle(title)
  title = title ? ''.concat(title, '-').concat(titleSuffix) : titleSuffix
  title = count ? '('.concat(count, '条消息)').concat(title) : title
  window.document.title = title
}
export default {
  cookies,
  log,
  // db,
  title
}
