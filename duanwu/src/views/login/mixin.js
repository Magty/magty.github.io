import I18n from '@/components/i18n'
import {
  mapState
} from 'vuex'
export default {
  components: {
    I18n
  },
  computed: {
    ...mapState('admin/layout', ['showI18n'])
  }
}
