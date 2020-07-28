export default {
  inserted: function (el, binding) {
    function handler() {

    }
    el.__resizeHandler__ = handler
    // el.__observer__ =
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
