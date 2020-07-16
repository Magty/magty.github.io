import {
  mapState
} from 'vuex'
export default {
  computed: {
    ...mapState('admin/menu', ['menuBadge']),
    badgeData: function () {
      const badge = this.menuBadge.find(item => item.path === this.menu.path)
      return badge || null
    }
  }
}
