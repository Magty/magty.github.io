<template>
  <div>
    <div class="i-layout-sider-logo" :class="{ 'i-layout-sider-logo-dark': 'dark' === siderTheme }">
      <transition name="fade-quick">
        <i-link to="/">
          <img v-if="menuCollapse" :src="minLogo" />
          <img v-else-if="'light' === siderTheme" :src="logo" />
          <img v-else :src="darkLogo" />
        </i-link>
      </transition>
    </div>
    <Menu
      ref="menu"
      class="i-layout-menu-side i-scrollbar-hide"
      :theme="siderTheme"
      :accordion="menuAccordion"
      :active-name="activePath"
      :open-names="openNames"
      width="auto"
    >
      <template v-for="(item, index) in filterSider">
        <template v-if="menuCollapse">
          <menu-side-collapse v-if="item.children" :key="index" :menu="item" top-level></menu-side-collapse>
          <Tooltip v-else :key="index" :content="tTitle(item.title)" placement="right">
            <menu-side-item :menu="item" hide-title></menu-side-item>
          </Tooltip>
        </template>
        <template v-else>
          <menu-side-submenu v-if="item.children" :key="index" :menu="item"></menu-side-submenu>
          <menu-side-item v-else :key="index" :menu="item"></menu-side-item>
        </template>
      </template>
    </Menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import logo from '@/assets/logo.png'
import darkLogo from '@/assets/logo-dark.png'
import minLogo from '@/assets/logo-small.png'
import mixin from '../menu-head/mixin'
import menuSideItem from './menu-side-item'
import menuSideSubmenu from './menu-side-submenu'
import menuSideCollapse from './menu-side-collapse'
export default {
  name: 'menuSide',
  mixins: [mixin],
  components: {
    menuSideItem,
    menuSideSubmenu,
    menuSideCollapse
  },
  data() {
    return {
      logo,
      darkLogo,
      minLogo
    }
  },
  props: {
    hideLogo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('admin/layout', [
      'siderTheme',
      'menuAccordion',
      'menuCollapse'
    ]),
    ...mapState('admin/menu', ['activePath', 'openNames']),
    ...mapGetters('admin/menu', ['filterSider'])
  },
  watch: {
    $route: {
      handler: function() {
        this.handleUpdateMenuState()
      },
      immediate: true
    },
    menuCollapse: function() {
      this.handleUpdateMenuState()
    }
  },
  methods: {
    isElmInwindow: function(elm) {
      const rect = elm.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    handleUpdateMenuState: function() {
      this.$nextTick(() => {
        if (this.$refs.menu) {
          this.$refs.menu.updateActiveName()
          if (this.menuAccordion) {
            this.$refs.menu.updateOpened()
          }
          this.$nextTick(() => {
            const selectedElms = document.getElementsByClassName(
              'ivu-menu-item ivu-menu-item-active ivu-menu-item-selected'
            )
            if (selectedElms && selectedElms.length && !this.isElmInwindow(selectedElms[0])) {
              const top = selectedElms[0].getBoundingClientRect().top
              const el = this.$refs.menu.$el
              setTimeout(() => {
                this.$ScrollTop(el, {
                  to: top,
                  time: 0
                })
              }, 300)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
  color: hsla(0, 0%, 100%, 0.7);
}
.i-layout-menu-side {
  position: static;
  :after {
    display: none !important;
  }
  .ivu-menu-item,
  .ivu-menu-submenu-title {
    height: 52px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ivu-menu-submenu-title-icon {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 50%;
    right: 8px;
    float: none;
  }
  .ivu-dropdown-menu {
    min-width: 160px;
  }
  .ivu-dropdown-item {
    font-size: 14px !important;
    padding-right: 32px;
    &-divided:before {
      margin: 0 -32px 0 -16px;
    }
  }
  .ivu-select-dropdown {
    margin: 5px 0 5px 3px;
  }
  .ivu-tooltip,
  .ivu-tooltip-rel {
    display: block;
    text-align: center;
  }
  &-arrow {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
  }
  &.ivu-menu-dark .ivu-menu-item-active {
    color: #fff !important;
  }
}
</style>
