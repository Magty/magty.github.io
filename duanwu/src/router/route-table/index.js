import Main from '_c/main'
import dashboardRouters from './dashboardRouters'
import settingRouters from './settingRouters'
// import userRouters from './userRouters'
import resultRouters from './resultRouters'
import toolRouters from './toolRouters'
export default [{
    path: '/',
    name: 'home',
    redirect: {
      name: 'dashboard-console'
    },
    component: Main,
    children: [{
        path: 'index',
        name: 'index',
        redirect: {
          name: 'dashboard-console'
        }
      },
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: () => import('@/views/log')
      },
      /* {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter: function (to, from, next) {
            next(to => to.$router.replace(from.fullpath))
          },
          render: function (func) {
            return func()
          }
        }
      },
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter: function (to, from, next) {
            next(to => to.$router.replace(JSON.parse(from.params.route)))
          }
        },
        render: function (func) {
          func()
        }
      }, */
      {
        path: 'i18n',
        name: 'i18n',
        meta: {
          title: '$t:menu.i18n',
          auth: true
        },
        component: () => import('@/views/i18n')
      }
    ]
  },
  dashboardRouters,
  settingRouters,
  resultRouters,
  toolRouters
]
