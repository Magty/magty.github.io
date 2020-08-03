export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: '$t:page.login.title'
    },
    component: () => import('@/views/login/login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '$t:page.register.title'
    },
    component: () => import('@/views/register/register')
  },
  {
    path: '/register/result',
    name: 'register-result',
    meta: {
      auth: true,
      title: '注册结果'
    },
    component: () => import('@/views/register/result')
  }
]
