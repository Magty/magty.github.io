import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'result-'

export default {
  path: '/result',
  name: 'result',
  redirect: {
    name: ''.concat(preFix, 'success')
  },
  meta: auth,
  component: Main,
  children: [{
      path: 'success',
      name: ''.concat(preFix, 'success'),
      meta: {
        ...auth,
        title: '成功页'
      },
      component: () => import('@/views/result/success.vue')
    },
    {
      path: 'fail',
      name: ''.concat(preFix, 'fail'),
      meta: {
        ...auth,
        title: '失败页'
      },
      component: () => import('@/views/result/fail')
    }
  ]
}
