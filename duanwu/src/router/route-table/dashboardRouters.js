import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'dashboard-'

export default {
  path: '/dashboard',
  name: 'dashboard',
  redirect: {
    name: ''.concat(preFix, 'console')
  },
  meta: auth,
  component: Main,
  children: [{
      path: 'console',
      name: ''.concat(preFix, 'console'),
      meta: {
        ...auth,
        title: '主控台',
        closable: false
      },
      component: () => import('@/views/single-page/console')
    },
    {
      path: 'monitor',
      name: ''.concat(preFix, 'monitor'),
      meta: {
        ...auth,
        title: '监控页'
      },
      component: () => import('@/views/single-page/monitor')
    },
    {
      path: 'workplace',
      name: ''.concat(preFix, 'workplace'),
      meta: {
        ...auth,
        title: '工作台'
      },
      component: () => import('@/views/single-page/workplace')
    }
  ]
}
