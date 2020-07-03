<template>
  <div class="i-layout-tabs-main">
    <Tabs
      type="card"
      :value="getTabNameByRoute($route)"
      @on-click="handleClickTab"
      @on-tab-remove="handleTabRemove"
      :before-remove="beforeRemove"
      closable
      :animated="false"
    >
      <TabPane
        v-for="(tab,index) in tabsNavlist"
        :icon="getIcon(tab.meta)"
        :label="label(tab.meta)"
        :key="`tabPane-${index}`"
        :name="getTabNameByRoute(tab)"
      ></TabPane>
    </Tabs>
    <Dropdown class="i-layout-tabs-close" @on-click="handleBtnClick">
      <div class="i-layout-tabs-close-main">
        <common-icon type="ios-arrow-down" :size="16"></common-icon>
      </div>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="(item,index) in tabsButtons"
          :name="item.name"
          :key="`tabs-btn-${index}`"
        >
          <common-icon :type="item.icon"></common-icon>
          {{item.title}}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { getTabNameByRoute, getRouteByName } from '@/utils/util'

import commonIcon from '_c/common-icon'
import { mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      getTabNameByRoute,
      tabsButtons: [
        { name: 'left', title: '关闭左侧', icon: 'md-arrow-back' },
        { name: 'right', title: '关闭右侧', icon: 'md-arrow-forward' },
        { name: 'others', title: '关闭其他', icon: 'md-close' },
        { name: 'all', title: '全部关闭', icon: 'md-close-circle' }
      ]
    }
  },
  props: {
    fixTabs: Boolean,
    showTabsIcon: Boolean,
    tabsNavlist: {
      type: Array,
      default: () => [
        { meta: { title: 'windows', icon: 'logo-windows' } },
        { meta: { title: 'Mac', icon: 'logo-apple' } },
        { meta: { title: 'Linux', icon: 'logo-tux' } }
      ]
    }
  },
  components: {
    commonIcon
  },
  computed: {},
  watch: {
    tabsNavlist: (val, old) => {
      console.log(old.length + '====tabslist===' + val.length)
    }
  },
  methods: {
    ...mapMutations(['removeTab']),
    ...mapActions(['tabRemove']),
    getIcon(item) {
      return this.showTabsIcon && item.icon ? item.icon : ''
    },
    label: item => {
      return h => (
        <div class="i-layout-tabs-title">
          <span>{item.title}</span>
        </div>
      )
    },
    handleBtnClick(name) {
      console.log(name)
      this.removeTab({ route: this.$route, name })
      // this.$emit('on-closetabs', name)
    },
    beforeRemove(id) {
      console.log('before:' + id)
    },
    handleTabRemove(id) {
      console.log('==index:' + id)
      // this.removeTab({ route: this.$route })
      this.tabRemove({
        id,
        route: this.$route
      }).then(nextRoute => {
        if (nextRoute) {
          console.log(' 23232323=' + nextRoute && nextRoute.name)
          this.$router.push(nextRoute)
        }
      })
    },
    handleClickTab(name) {
      console.log('12333==tabclick')
      const route = getRouteByName(name)
      this.$router.push(route)
    }
  }
}
</script>

<style lang="scss">
.i-layout-tabs-main {
  background: #f5f7f9;
  padding: 6px 0;
  margin: 0 12px 0 12px;
  display: flex;
  .ivu-tabs {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
  }
  .ivu-tabs-nav-container {
    margin-bottom: 0;
  }
  .ivu-tabs-bar {
    border-bottom: none;
    margin-bottom: 0;
  }
  .ivu-tabs-ink-bar {
    display: none;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar {
    .ivu-tabs-tab {
      height: 32px;
      background: #fff;
      border-radius: 3px;
      border: none;
      margin-right: 6px;
      color: #808695;
      :hover {
        color: #515a6e;
      }
      .ivu-icon-ios-close {
        width: 22px;
        transform: translateZ(0);
        margin-right: -6px;
      }
    }
    .ivu-tabs-tab-active {
      height: 32px;
      background: #fff;
      color: #2d8cf0;
      :hover {
        color: #2d8cf0;
      }
    }
  }
  .ivu-tabs-nav-scrollable {
    padding: 0 32px;
  }
  .ivu-tabs-nav-next,
  .ivu-tabs-nav-prev {
    width: 32px;
    text-align: center;
    i {
      font-size: 16px;
    }
  }
}
.i-layout-tabs-title {
  display: inline-block;
  i,
  img {
    display: inline-block;
    height: 20px;
    vertical-align: middle;
    margin-right: 8px;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
}
.i-layout-tabs-close {
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  &-main {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
}
</style>
