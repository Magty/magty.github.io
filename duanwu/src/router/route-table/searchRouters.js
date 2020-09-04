import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'search-'

export default {
  path: '/search',
  name: 'search',
  redirect: {
    name: ''.concat(preFix, 'search-article')
  },
  meta: auth,
  component: Main,
  children: [{
      path: 'search-article',
      name: ''.concat(preFix, 'search-article'),
      meta: {
        ...auth,
        title: '搜索列表（文章）'
      },
      component: () => import('@/views/search/search-article')
    },
    {
      path: 'search-projects',
      name: ''.concat(preFix, 'search-projects'),
      meta: {
        ...auth,
        title: '搜索列表（项目）'
      },
      component: () => import('@/views/search/search-projects')
    },
    {
      path: 'search-apps',
      name: ''.concat(preFix, 'search-apps'),
      meta: {
        ...auth,
        title: '搜索列表（应用）'
      },
      component: () => import('@/views/search/search-apps')
    }
  ]
}
