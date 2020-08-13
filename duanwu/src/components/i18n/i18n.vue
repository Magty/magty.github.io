<template>
  <span class="i-layout-header-trigger i-layout-header-trigger-min">
    <Dropdown
      :trigger="isMobile ? 'click' : 'hover'"
      @on-click="handleClick"
      class="i-layout-header-i18n"
      :class="{'i-layout-header-user-mobile': isMobile}"
    >
      <Icon type="md-globe"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="(item,index) in languages"
          :key="index"
          :name="index"
          :selected="locale === index"
        >
          <span>{{item.language}}</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </span>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import languages from '@/lang'
export default {
  name: 'headerI18n',
  data() {
    return {
      languages
    }
  },
  computed: {
    ...mapState('admin/i18n', ['locale']),
    ...mapState('admin/layout', ['isMobile'])
  },
  methods: {
    ...mapActions('admin/i18n', ['setLocale']),
    handleClick: function(locale) {
      if (locale !== this.locale) {
        this.setLocale({ locale, vm: this })
      }
    }
  }
}
</script>

<style lang="scss">
.i-layout-header-i18n {
  .ivu-dropdown-item {
    text-align: left;
  }
  .ivu-notifications-rel {
    padding: 0 12px;
  }
  &-mobile {
    width: 100%;
    .ivu-select-dropdown {
      left: 0 !important;
      right: 0;
      border-radius: 0;
      margin: 0;
    }
  }
}
</style>
