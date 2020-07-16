<template>
  <div class="i-layout-menu-head" :class="{ 'i-layout-menu-head-mobile': isMobile }">
    <div
      v-if="isMobile || isMenuLimit"
      class="i-layout-header-trigger i-layout-header-trigger-min i-layout-header-trigger-in i-layout-header-trigger-no-height"
    >
      <Dropdown trigger="click" :class="{ 'i-layout-menu-head-mobile-drop': isMobile }">
        <Icon type="ios-apps"></Icon>
        <DropdownMenu slot="list">
          <i-link
            v-for="item in filterHeader"
            :key="item.path"
            :to="item.path"
            :replace="item.replace"
            :target="item.target"
          >
            <DropdownItem>
              <menu-head-title :item="item"></menu-head-title>
            </DropdownItem>
          </i-link>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Menu v-else ref="menu" mode="horizontal" :active-name="headerName">
      <MenuItem
        v-for="item in filterHeader"
        :key="item.path"
        :to="item.path"
        :replace="item.replace"
        :target="item.target"
        :name="item.name"
      >
        <menu-head-title :item="item"></menu-head-title>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
import { on, off, throttle } from '@/utils/tools'
import { mapState, mapGetters } from 'vuex'
import menuHeadTitle from './menu-head-title'
export default {
  name: 'menuHead',
  components: {
    menuHeadTitle
  },
  data() {
    return {
      handleResize: () => {},
      isMenuLimit: false,
      menuMaxWidth: 0
    }
  },
  computed: {
    ...mapState('admin/layout', ['isMobile']),
    ...mapState('admin/menu', ['headerName']),
    ...mapGetters('admin/menu', ['filterHeader'])
  },
  methods: {
    handleGetMenuHeight: function() {
      //
    }
  },
  watch: {
    filterHeader: function() {
      this.handleGetMenuHeight()
    },
    isMobile: function() {
      this.handleGetMenuHeight()
    }
  },
  mounted: function() {
    this.handleResize = throttle(this.handleGetMenuHeight, 100)
    on(window, 'resize', this.handleResize)
    this.handleGetMenuHeight()
  },
  beforeDestroy: function() {
    off(window, 'resize', this.handleResize)
  }
}
</script>

<style lang="scss">
.i-layout-menu-head {
  display: inline-block;
  overflow: hidden;
  flex: 1;
  .ivu-menu-horizontal.ivu-menu-light:after {
    display: none;
  }
  .ivu-menu-horizontal {
    display: inline-block;
    vertical-align: middle;
    height: auto;
    line-height: 58px;
  }
  &-logo {
    display: inline-block;
    height: 64px;
    text-align: center;
    vertical-align: middle;
    img {
      height: 80%;
      vertical-align: middle;
    }
  }
  .ivu-dropdown-rel {
    padding: 0 12px;
  }
  .ivu-dropdown-item {
    text-align: left;
  }
  &-mobile {
    vertical-align: baseline;
    overflow: visible;
    .ivu-dropdown-item {
      font-size: 14px !important;
      text-align: left;
      i,
      span {
        vertical-align: middle;
      }
      i {
        margin-right: 6px;
      }
    }
    &-drop {
      width: 100%;
      .ivu-select-dropdown {
        left: 0 !important;
        right: 0;
        border-radius: 0;
        margin: 0;
      }
    }
  }
}
</style>
