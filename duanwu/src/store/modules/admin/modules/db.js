import debug from '@/utils/debug'
import lodash from 'lodash'
import router from '@/router'

const {
  cookies,
  db
} = debug

export function pathInit() {
  return format
}

function format({
  dbName = 'database',
  path = '',
  user,
  validator = () => true,
  defaultValue = ''
}) {
  const uuid = cookies.get('uuid') || 'ghost-uuid'
  const tableName = ''.concat(dbName, '.').concat(user ? 'user.'.concat(uuid) : 'public').concat(path ? '.'.concat(path) : '')
  const value = db.get(tableName).value()
  if (value && validator(value)) {
    return tableName
  }
  db.set(tableName, defaultValue).write()
  return tableName
}
const actions = {
  set: function (context, {
    dbName = 'database',
    path = '',
    value = '',
    user
  }) {
    db.set(format({
      dbName,
      path,
      user
    }), value).write()
  },
  get: function (context, {
    dbName = 'database',
    path = '',
    defaultValue = '',
    user
  }) {
    // console.log('====db==path:' + path)
    return new Promise(resolve => resolve(lodash.cloneDeep(db.get(format({
      dbName,
      path,
      user,
      defaultValue
    })).value())))
  },
  database: function (context, {
    user
  }) {
    return new Promise(resolve => resolve(db.get(format({
      dbName: 'database',
      path: '',
      user,
      defaultValue: {}
    }))))
  },
  databaseClear: function (context, {
    user
  }) {
    return new Promise(resolve => resolve(db.get(format({
      dbName: 'database',
      path: '',
      user,
      validator: () => false,
      defaultValue: {}
    }))))
  },
  databasePage: function (context, {
    basis = 'fullPath',
    user
  }) {
    return new Promise(resolve => resolve(db.get(format({
      dbName: 'database',
      path: '$page.'.concat(router.app.$route[basis]),
      user,
      defaultValue: {}
    }))))
  },
  databasePageClear: function (context, {
    basis = 'fullPath',
    user
  }) {
    return new Promise(resolve => resolve(db.get(format({
      dbName: 'database',
      path: '$page.'.concat(router.app.$route[basis]),
      user,
      validator: () => false,
      defaultValue: {}
    }))))
  },
  pageSet: function (context, {
    instance,
    basis = 'fullPath',
    user
  }) {
    return new Promise(resolve => resolve(db.get(format({
      dbName: 'database',
      path: '$page.'.concat(router.app.$route[basis], '.$data'),
      user,
      validator: () => false,
      defaultValue: lodash.cloneDeep(instance.$data)
    }))))
  },
  pageGet: function (context, {
    instance,
    basis = 'fullPath',
    user
  }) {
    return new Promise(resolve => resolve(lodash.cloneDeep(db.get(format({
      dbName: 'database',
      path: '$page.'.concat(router.app.$route[basis], '.$data'),
      user,
      defaultValue: lodash.cloneDeep(user.$data)
    })).value())))
  },
  pageClear: function (context, {
    basis = 'fullPath',
    user
  }) {
    return new Promise(resolve => resolve(db.get(format({
      dbName: 'database',
      path: '$page.'.concat(router.app.$route[basis], '.$data'),
      user,
      validator: () => false,
      defaultValue: {}
    }))))
  }
}
export default {
  namespaced: true,
  actions
}
