import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'form-'

export default {
  path: '/form',
  name: 'form',
  redirect: {
    name: ''.concat(preFix, 'basic-form')
  },
  meta: auth,
  component: Main,
  children: [{
      path: 'basic-form',
      name: ''.concat(preFix, 'basic-form'),
      meta: {
        ...auth,
        title: '基础表单'
      },
      component: () => import('')
    },
    {
      path: 'advanced-form',
      name: ''.concat(preFix, 'advanced-form'),
      meta: {
        ...auth,
        title: '高级表单'
      },
      component: () => import('')
    },
    {
      path: 'step-form',
      name: ''.concat(preFix, 'step-form'),
      meta: {
        ...auth,
        title: '分步表单'
      },
      component: () => import('')
    },
    {
      path: 'detail',
      name: ''.concat(preFix, 'detail'),
      meta: {
        ...auth,
        title: '表单详情'
      },
      component: () => import('')
    }
  ]
}
