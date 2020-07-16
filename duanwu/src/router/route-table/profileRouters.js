import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'profile-'

export default {
  path: '/profile',
  name: 'profile',
  redirect: {
    name: ''.concat(preFix, 'basic')
  },
  meta: auth,
  component: Main,
  children: [{
      path: 'basic',
      name: ''.concat(preFix, 'basic'),
      meta: {
        ...auth,
        title: '基础详情页'
      },
      component: () => import('')
    },
    {
      path: 'advanced',
      name: ''.concat(preFix, 'advanced'),
      meta: {
        ...auth,
        title: '高级详情页'
      },
      component: () => import('')
    }
  ]
}
