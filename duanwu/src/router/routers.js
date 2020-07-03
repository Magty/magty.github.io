import Main from '_c/main'

/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login-登录',
      hideInMenu: true
    },
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register-注册',
      hideInMenu: true
    },
    component: () => import('../views/register/register.vue')
  },
  /* {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      // hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        // hideInMenu: true,
        title: '首页',
        icon: 'md-home'
      },
      component: () => import('@/views/single-page/home')
    }]
  }, */
  {
    path: '/',
    alias: '/home',
    name: 'home',
    meta: {
      hideInMenu: true,
      title: '首页',
      icon: 'md-home'
    },
    redirect: {
      name: 'console'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/console',
    meta: {
      // hideInMenu: true,
      icon: '_yibiaopan',
      title: 'Dashboard'
    },
    component: Main,
    children: [{
        path: 'console',
        name: 'console',
        meta: {
          title: '主控台'
        },
        component: () => import('@/views/single-page/console')
      },
      {
        path: 'monitor',
        name: 'monitor',
        meta: {
          title: '监控页'
        },
        component: () => import('@/views/single-page/monitor')
      },
      {
        path: 'workplace',
        name: 'workplace',
        meta: {
          title: '工作台'
        },
        component: () => import('@/views/single-page/workplace')
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {
      icon: 'md-settings',
      title: '设置中心'
    },
    component: Main,
    children: [{
        path: 'users',
        name: 'userd',
        meta: {
          title: '个人中心'
        },
        component: () => import('@/views/single-page/users')
      },
      {
        path: 'system',
        name: 'system',
        meta: {
          title: '系统设置'
        },
        component: () => import('@/views/single-page/home')
      }
    ]
  },
  {
    path: '/401',
    name: '401',
    meta: {
      hideInMenu: true
    },
    component: () => import('../views/error-page/401.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      hideInMenu: true
    },
    component: () => import('../views/error-page/404.vue')
  }
]
