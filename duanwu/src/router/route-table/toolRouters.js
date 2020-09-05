import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'tool-'
export default {
  path: '/tool',
  name: 'tool',
  redirect: {
    name: ''.concat(preFix, 'page-cache-on')
  },
  meta: auth,
  component: Main,
  children: [{
      path: 'frame/iview',
      name: ''.concat(preFix, 'frame-iview'),
      meta: {
        ...auth,
        title: 'View UI 官网'
      },
      component: () => import('@/views/tool/frame/iview.vue')
    },
    {
      path: 'frame/iqiyi',
      name: ''.concat(preFix, 'frame-iqiyi'),
      meta: {
        ...auth,
        title: '爱奇艺'
      },
      component: () => import('@/views/tool/frame/iqiyi.vue')
    },
    {
      path: 'page-cache/on',
      name: ''.concat(preFix, 'page-cache-on'),
      meta: {
        ...auth,
        cache: true,
        title: '开启缓存'
      },
      component: () => import('@/views/tool/page-cache/on')
    },
    {
      path: 'page-cache/off',
      name: ''.concat(preFix, 'page-cache-off'),
      meta: {
        ...auth,
        cache: false,
        title: '关闭缓存'
      },
      component: () => import('@/views/tool/page-cache/off')
    },
    {
      path: 'page-cache/params/:id',
      name: ''.concat(preFix, 'page-cache-params'),
      meta: {
        ...auth,
        cache: true,
        title: '带参路由缓存'
      },
      props: true,
      component: () => import('@/views/tool/page-cache/params')
    },
    {
      path: 'log/record',
      name: ''.concat(preFix, 'record'),
      meta: {
        ...auth,
        title: '日志记录'
      },
      component: () => import('@/views/tool/log/record')
    },
    {
      path: 'log/error',
      name: ''.concat(preFix, 'error'),
      meta: {
        ...auth,
        title: '错误捕捉'
      },
      component: () => import('@/views/tool/log/error')
    },
    {
      path: 'log/ajax',
      name: ''.concat(preFix, 'ajax'),
      meta: {
        ...auth,
        title: 'Ajax 错误'
      },
      component: () => import('@/views/tool/log/ajax')
    },
    {
      path: 'log/console',
      name: ''.concat(preFix, 'console'),
      meta: {
        ...auth,
        title: '控制台日志'
      },
      component: () => import('@/views/tool/log/console')
    }
  ]
}
