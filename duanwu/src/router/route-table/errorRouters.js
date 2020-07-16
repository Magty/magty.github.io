export default [{
  path: '/403',
  name: '403',
  meta: {
    title: '403'
  },
  component: () => import('')
}, {
  path: '/500',
  name: '500',
  meta: {
    title: '500'
  },
  component: () => import('')
}, {
  path: '*',
  name: '404',
  meta: {
    title: '404'
  },
  component: () => import('')
}]
