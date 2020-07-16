export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: '$t:page.login.title'
  },
  component: () => import('')
}, {
  path: '/register',
  name: 'register',
  meta: {
    title: '$t:page.register.title'
  },
  component: () => import('')
}, {
  path: '/register/result',
  name: 'register-result',
  meta: {
    auth: !0,
    title: '注册结果'
  },
  component: () => import('')
}]
