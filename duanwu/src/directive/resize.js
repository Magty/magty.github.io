import elementResizeDetectorMaker from 'element-resize-detector'

export default {
  inserted: function (el, binding) {
    function handler(e) {
      // 这里判断点击的元素是否是本身，不是本身，则返回
      /* if (!el.contains(e.target)) {
        return false
      } */
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        return binding.value(el)
      }
    }
    el.__resizeHandler__ = handler
    // 为了兼容ie9
    el.__observer__ = elementResizeDetectorMaker({
      strategy: 'scroll'
    })
    el.__observer__.listenTo(el, handler)
  },
  update: function () {

  },
  unbind: function (el, binding) {
    el.__observer__.removeListener(el, el.__resizeHandler__)
    delete el.__resizeHandler__
    delete el.__observer__
  }
}
