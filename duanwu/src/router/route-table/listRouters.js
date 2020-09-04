import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'list-'

export default {
  path: '/list',
  name: 'list',
  redirect: {
    name: ''.concat(preFix, 'basic-list')
  },
  meta: auth,
  component: Main,
  children: [{
      path: 'basic-list',
      name: ''.concat(preFix, 'basic-list'),
      meta: {
        ...auth,
        title: '基础列表'
      },
      component: () => import('@/views/list/basic-list')
    },
    {
      path: 'card-list',
      name: ''.concat(preFix, 'card-list'),
      meta: {
        ...auth,
        title: '卡片列表'
      },
      component: () => import('@/views/list/card-list')
    },
    {
      path: 'user-list',
      name: ''.concat(preFix, 'user-list'),
      meta: {
        ...auth,
        title: '用户列表'
      },
      component: () => import('@/views/list/user-list')
    },
    {
      path: 'goods-list',
      name: ''.concat(preFix, 'goods-list'),
      meta: {
        ...auth,
        title: '商品列表'
      },
      component: () => import('@/views/list/goods-list')
    },
    {
      path: 'table-list',
      name: ''.concat(preFix, 'table-list'),
      meta: {
        ...auth,
        title: '查询表格'
      },
      component: () => import('@/views/list/table-list')
    }
  ]
}
