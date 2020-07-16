import {
  mapState
} from 'vuex'
export default {
  computed: {
    ...mapState('admin/layout', ['menuSiderReload', 'menuHeaderReload'])
  },
  methods: {
    handleClick: function (name) {
      const block = arguments.length > 1 ? arguments[1] : 'sider'
      const path = this.$route.path
      if (path === name) {
        if (block === 'sider' && this.menuSiderReload) {
          this.handleReload()
        } else if (block === 'header' && this.menuHeaderReload) {
          this.handleReload()
        }
      }
    },
    handleReload: function () {
      this.$parent.handleReload()
    }
  }
}
