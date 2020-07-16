import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'exception-'

export default {
  path: '/exception',
  name: 'exception',
  redirect: {
    name: ''.concat(preFix, '403')
  },
  meta: auth,
  component: Main,
  children: [{
      path: '403',
      name: ''.concat(preFix, '403'),
      meta: {
        ...auth,
        title: '403'
      },
      component: () => import('')
    },
    {
      path: '404',
      name: ''.concat(preFix, '404'),
      meta: {
        ...auth,
        title: '404'
      },
      component: () => import('')
    },
    {
      path: '500',
      name: ''.concat(preFix, '500'),
      meta: {
        ...auth,
        title: '500'
      },
      component: () => import('')
    }
  ]
}
