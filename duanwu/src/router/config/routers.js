const preFixDashboard = '/dashboard/'
export const dashboard = {
  path: '/dashboard',
  title: 'Dashboard',
  header: 'home',
  custom: 'iconfont icon-dashboard',
  children: [{
    path: ''.concat(preFixDashboard, 'console'),
    title: '主控台'
  }, {
    path: ''.concat(preFixDashboard, 'monitor'),
    title: '监控页'
  }, {
    path: ''.concat(preFixDashboard, 'workplace'),
    title: '工作台'
  }]
}

const preFixForm = '/form/'
export const form = {
  path: '/form',
  title: '表单页面',
  header: 'home',
  custom: 'iconfont icon-form',
  children: [{
    path: ''.concat(preFixForm, 'basic-form'),
    title: '基础表单'
  }, {
    path: ''.concat(preFixForm, 'advanced-form'),
    title: '高级表单'
  }, {
    path: ''.concat(preFixForm, 'step-form'),
    title: '分步表单'
  }, {
    path: ''.concat(preFixForm, 'detail'),
    title: '表单详情'
  }]
}

const preFixList = '/list/'
export const list = {
  path: '/list',
  title: '列表页面',
  header: 'home',
  icon: 'ios-list-box-outline',
  children: [{
    path: ''.concat(preFixList, 'basic-list'),
    title: '基础列表'
  }, {
    path: ''.concat(preFixList, 'card-list'),
    title: '卡片列表'
  }, {
    path: ''.concat(preFixList, 'user-list'),
    title: '用户列表'
  }, {
    path: ''.concat(preFixList, 'goods-list'),
    title: '商品列表'
  }, {
    path: ''.concat(preFixList, 'table-list'),
    title: '查询表格'
  }]
}

const preFixSearch = '/search/'
export const search = {
  path: '/search',
  title: '搜索页面',
  header: 'home',
  icon: 'ios-search',
  children: [{
    path: ''.concat(preFixSearch, 'search-article'),
    title: '搜索列表（文章）'
  }, {
    path: ''.concat(preFixSearch, 'search-projects'),
    title: '搜索列表（项目）'
  }, {
    path: ''.concat(preFixSearch, 'search-apps'),
    title: '搜索列表（应用）'
  }]
}
const preFixProfile = '/profile'
export const profile = {
  path: '/profile',
  title: '详情页面',
  header: 'home',
  icon: 'md-list',
  children: [{
    path: ''.concat(preFixProfile, 'basic'),
    title: '基础详情页'
  }, {
    path: ''.concat(preFixProfile, 'advanced'),
    title: '高级详情页'
  }]
}

const preFixResult = '/result/'
export const result = {
  path: '/result',
  title: '结果页面',
  header: 'home',
  custom: 'iconfont icon-tijianjieguo',
  children: [{
    path: ''.concat(preFixResult, 'success'),
    title: '成功页'
  }, {
    path: ''.concat(preFixResult, 'fail'),
    title: '失败页'
  }]
}

const preFixException = '/exception'
export const exception = {
  path: '/exception',
  title: '异常页面',
  header: 'home',
  custom: 'iconfont icon-jinggao',
  children: [{
    path: ''.concat(preFixException, '403'),
    title: '403'
  }, {
    path: ''.concat(preFixException, '404'),
    title: '404'
  }, {
    path: ''.concat(preFixException, '500'),
    title: '500'
  }]
}

const freFixSetting = '/setting/'
export const setting = {
  path: '/setting',
  title: '设置页面',
  header: 'home',
  custom: 'iconfont icon-Setting',
  children: [{
    path: ''.concat(freFixSetting, 'user'),
    title: '个人中心'
  }, {
    path: ''.concat(freFixSetting, 'account'),
    title: '个人设置'
  }]
}

const preFixEditor = '/editor'
export const editor = {
  path: '/editor',
  title: '编辑器',
  header: 'home',
  custom: 'iconfont icon-editor',
  children: [{
    path: ''.concat(preFixEditor, 'quill'),
    title: 'Quill'
  }, {
    path: ''.concat(preFixEditor, 'simpleMDE'),
    title: 'simpleMDE'
  }]
}

const preFixTool = '/tool/'
export const tool = {
  path: '/tool',
  title: '工具',
  header: 'home',
  custom: 'iconfont icon-tool',
  children: [{
    path: ''.concat(preFixTool, 'frame'),
    title: '内嵌页面',
    children: [{
      path: ''.concat(preFixTool, 'frame/iview'),
      title: 'View UI 官网'
    }, {
      path: ''.concat(preFixTool, 'frame/iqiyi'),
      title: '爱奇艺'
    }]
  }, {
    path: ''.concat(preFixTool, 'page-cache'),
    title: '页面缓存',
    children: [{
      path: ''.concat(preFixTool, 'page-cache/on'),
      title: '开启缓存'
    }, {
      path: ''.concat(preFixTool, 'page-cache/off'),
      title: '关闭缓存'
    }, {
      path: ''.concat(preFixTool, 'page-cache/params/1'),
      title: '带参路由缓存1'
    }, {
      path: ''.concat(preFixTool, 'page-cache/params/2'),
      title: '带参路由缓存2'
    }]
  }, {
    path: ''.concat(preFixTool, 'log'),
    title: '日志',
    children: [{
      path: ''.concat(preFixTool, 'log/record'),
      title: '日志记录'
    }, {
      path: ''.concat(preFixTool, 'log/error'),
      title: '错误捕捉'
    }, {
      path: ''.concat(preFixTool, 'log/ajax'),
      title: 'Ajax 错误'
    }, {
      path: ''.concat(preFixTool, 'log/console'),
      title: '控制台日志'
    }]
  }]
}

export const log = {
  path: '/log',
  title: '前端日志',
  header: 'system',
  icon: 'md-locate'
}

export const i18n = {
  path: '/i18n',
  title: '$t:menu.i18n',
  header: 'home',
  custom: 'iconfont icon-language'
}

export default [
  dashboard, form, list, search, profile, result, exception, setting, editor, tool, i18n, log
]
