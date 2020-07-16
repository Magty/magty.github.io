<template>
  <Dropdown :class="dropdownClasses" placement="right-start">
    <li v-if="topLevel" :class="menuItemClasses">
      <menu-side-title :menu="menu" hide-title></menu-side-title>
    </li>
    <DropdownItem v-else>
      <menu-side-title :menu="menu" :selected="openNames.indexOf(menu.path) >= 0"></menu-side-title>
      <Icon class="i-layout-menu-side-arrow" type="ios-arrow-forward"></Icon>
    </DropdownItem>
    <DropdownMenu slot="list">
      <div v-if="showCollapseMenuTitle" class="i-layout-menu-side-collapse-title">
        <menu-side-title :menu="menu"></menu-side-title>
      </div>
      <template v-for="(item,index) in menu.children">
        <menu-side-collapse v-if="item.children && item.children.length" :key="index" :menu="item"></menu-side-collapse>
        <i-link v-else :key="index" :to="item.path" :target="item.target">
          <DropdownItem
            :class="{'i-layout-menu-side-collapse-item-selected': item.path===activePath}"
            :divided="item.divided"
          >
            <menu-side-title :menu="item"></menu-side-title>
          </DropdownItem>
        </i-link>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import { mapState } from 'vuex'
import menuSideTitle from './menu-side-title.vue'
export default {
  name: 'menuSideCollapse',
  components: {
    menuSideTitle
  },
  props: {
    menu: {
      type: Object,
      default: () => {}
    },
    topLevel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('admin/layout', ['siderTheme', 'showCollapseMenuTitle']),
    ...mapState('admin/menu', ['activePath', 'openNames']),
    dropdownClasses: function() {
      return {
        'i-layout-menu-side-collapse-top': this.topLevel,
        'i-layout-menu-side-collapse-dark': this.siderTheme === 'dark'
      }
    },
    menuItemClasses: function() {
      return [
        'ivu-menu-item i-layout-menu-side-collapse-top-item',
        {
          'ivu-menu-item-selected ivu-menu-item-active':
            this.openNames.indexOf(this.menu.path) >= 0
        }
      ]
    }
  }
}
</script>

<style lang='scss'>
.i-layout-menu-side-collapse {
  &-top {
    display: block;
    &-item {
      text-align: center;
      &-select,
      &-select:hover {
        background-color: #f0faff;
        color: #2d8cf0;
      }
    }
  }
  &-title {
    text-align: center;
    padding: 6px 0;
    border-bottom: 1px solid #e8eaec;
  }
  &-dark {
    .ivu-select-dropdown {
      background-color: #191a23;
    }
    .ivu-dropdown-item {
      color: hsla(0, 0%, 100%, 0.7);
      transition: all 0.2s ease-in-out;
      &:hover {
        background: transparent;
        color: #fff;
      }
    }
    .ivu-dropdown-item-divided {
      border-color: #101117;
      &:before {
        background-color: #191a23;
      }
    }
    .i-layout-menu-side-collapse-item-selected,
    .i-layout-menu-side-collapse-item-selected:hover {
      background-color: #2d8cf0;
      color: #fff;
    }
    .i-layout-menu-side-collapse-title {
      border-bottom: 1px solid #101117;
      color: hsla(0, 0%, 100%, 0.7);
    }
  }
}
</style>
