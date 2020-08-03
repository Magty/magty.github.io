<template>
  <div :class="['i-layout-tabs',classes]" :style="styles">
    <div class="i-layout-tabs-main">
      <Tabs
        @on-click="handleClickTab"
        @on-tab-remove="handleClickClose"
        @on-drag-drop="handleDragDrop"
        type="card"
        :value="current"
        :animated="false"
        :draggable="tabsOrder"
        closable
      >
        <TabPane
          v-for="(item,index) in opened"
          :key="`${random()}_${index}`"
          :label="tabLabel(item)"
          :name="item.fullPath"
          :closable="item.meta && item.meta.closable"
        ></TabPane>
      </Tabs>
      <Dropdown @on-click="handleClose" class="i-layout-tabs-close">
        <div class="i-layout-tabs-close-main">
          <Icon type="ios-arrow-down"></Icon>
        </div>
        <DropdownMenu slot="list">
          <DropdownItem name="left">
            <Icon type="md-arrow-back"></Icon>
            {{$t('basicLayout.tabs.left')}}
          </DropdownItem>
          <DropdownItem name="right">
            <Icon type="md-arrow-forward"></Icon>
            {{$t('basicLayout.tabs.right')}}
          </DropdownItem>
          <DropdownItem name="other">
            <Icon type="md-close"></Icon>
            {{$t('basicLayout.tabs.other')}}
          </DropdownItem>
          <DropdownItem name="all">
            <Icon type="md-close-circle"></Icon>
            {{$t('basicLayout.tabs.all')}}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import { mapState, mapGetters, mapActions } from 'vuex'
import { menuSideWidth } from '@/config/settings'
import randomStr from '@/utils/random_str'
import { arrayRoutes } from '@/utils/route'
import routers from '@/router/config/routers'

import mixin from '../mixin'
export default {
  name: 'iTabs',
  data() {
    return {
      scrollTop: 0,
      allSiderMenu: arrayRoutes(routers)
    }
  },
  mixins: [mixin],
  computed: {
    ...mapState('admin/page', ['opened', 'current']),
    ...mapState('admin/layout', [
      'showTabsIcon',
      'tabsFix',
      'tabsReload',
      'tabsOrder',
      'headerFix',
      'headerStick',
      'isMobile',
      'menuCollapse'
    ]),
    ...mapGetters('admin/menu', ['hideSider']),
    classes: function() {
      return { 'i-layout-tabs-fix': this.tabsFix }
    },
    isHeaderStick: function() {
      return this.hideSider
    },
    styles: function() {
      const style = {}
      if (this.tabsFix && !this.headerFix) {
        style.top = ''.concat(64 - this.scrollTop, 'px')
      }
      if (!this.isMobile && this.tabsFix) {
        const left = this.isHeaderStick
          ? 0
          : this.menuCollapse
          ? 80
          : menuSideWidth
        style.width = 'calc(100% - '.concat(left, 'px)')
        style.left = ''.concat(left, 'px')
      }
      return style
    }
  },
  methods: {
    ...mapActions('admin/page', [
      'close',
      'closeLeft',
      'closeRight',
      'closeOther',
      'closeAll',
      'updateOpened'
    ]),
    tabLabel: function(item) {
      var path =
        item.fullPath.indexOf('?') >= 0
          ? item.fullPath.split('?')[0]
          : item.fullPath
      var sideMenu = this.allSiderMenu.find(item => item.path === path)
      return h => {
        return (
          <div class="i-layout-tabs-title">
            {this.showTabsIcon ? (
              sideMenu.icon ? (
                <Icon type={sideMenu.icon}></Icon>
              ) : sideMenu.custom ? (
                <Icon custom={sideMenu.custom}></Icon>
              ) : sideMenu.img ? (
                <img src={sideMenu.img} />
              ) : (
                ''
              )
            ) : (
              ''
            )}
            <span>{this.tTitle(item.meta.title) || '未命名'}</span>
          </div>
        )
      }
    },
    handleClickTab: function(id) {
      if (id === this.current) {
        if (this.tabsReload) {
          this.$emit('on-reload')
        }
      } else {
        const tab = this.opened.find(item => item.fullPath === id)
        if (tab) {
          const { name, params, query } = tab
          this.$router.push({ name, params, query })
        }
      }
    },
    handleClickClose: function(tagName) {
      // console.log(tagName)
      this.close({ tagName })
    },
    handleScroll: function() {
      if (this.tabsFix && !this.headerFix) {
        var e = document.body.scrollTop + document.documentElement.scrollTop
        this.scrollTop = e > 64 ? 64 : e
      }
    },
    handleClose: function(name) {
      var tab = { pageSelect: this.current }
      switch (name) {
        case 'left':
          this.closeLeft(tab)
          break
        case 'right':
          this.closeRight(tab)
          break
        case 'other':
          this.closeOther(tab)
          break
        case 'all':
          this.closeAll(tab)
          break
      }
    },
    handleDragDrop: function(name1, name2, index1, index2, names) {
      const cloneOpened = lodash.cloneDeep(this.opened)
      cloneOpened.splice(
        index2,
        1,
        ...cloneOpened.splice(index1, 1, cloneOpened[index2])
      )
      this.updateOpened({
        opened: cloneOpened
      })
    },
    random: function() {
      return randomStr(6)
    }
  },
  mounted: function() {
    // console.log('%c======itabs==mounted===', 'color: red')
    // console.log(this.opened.length)
    document.addEventListener('scroll', this.handleScroll, {
      passive: true
    })
    this.handleScroll()
  },
  beforeDestroy: function() {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss">
.i-layout-tabs {
  width: 100%;
  background-color: #f5f7f9;
  transition: all 0.2s ease-in-out;
  &-fix {
    position: fixed;
    z-index: 3;
  }
  &-main {
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
      &:hover {
        color: #515a6e;
      }
      &-active {
        height: 32px;
        background: #fff;
        color: #2d8cf0;
        &:hover {
          color: #2d8cf0;
        }
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
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar {
    .ivu-tabs-tab {
      .ivu-icon-ios-close {
        width: 22px;
        transform: translateZ(0);
        margin-right: -6px;
      }
    }
  }
  &-title {
    /* width: 22px;
    transform: translateZ(0);
    margin-right: -6px; */
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
  &-close {
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
      i {
        font-size: 16px;
      }
    }
  }
}
</style>
