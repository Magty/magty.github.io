import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'setting-'

export default {
  path: '/setting',
  name: 'setting',
  redirect: {
    name: ''.concat(preFix, 'user')
  },
  meta: auth,
  component: Main,
  children: [{
      path: 'user',
      name: ''.concat(preFix, 'user'),
      meta: {
        ...auth,
        title: '个人中心'
      },
      component: () => import('@/views/single-page/user')
    },
    {
      path: 'account',
      name: ''.concat(preFix, 'account'),
      meta: {
        ...auth,
        title: '个人设置'
      },
      component: () => import('@/views/single-page/account')
    }
  ]
}
