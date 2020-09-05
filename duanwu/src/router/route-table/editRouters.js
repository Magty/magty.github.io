import Main from '_c/main'
const auth = {
  auth: true
}
const preFix = 'editor-'

export default {
  path: '/editor',
  name: 'editor',
  redirect: {
    name: ''.concat(preFix, 'quill')
  },
  meta: auth,
  component: Main,
  children: [{
      path: 'quill',
      name: ''.concat(preFix, 'quill'),
      meta: {
        ...auth,
        title: 'Quill'
      },
      component: () => import('@/views/editor/quill')
    },
    {
      path: 'simpleMDE',
      name: ''.concat(preFix, 'simpleMDE'),
      meta: {
        ...auth,
        title: 'simpleMDE'
      },
      component: () => import('@/views/editor/simpleMDE')
    }
  ]
}
