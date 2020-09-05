<template>
  <Layout class="i-layout">
    <Sider
      v-if="!isMobile && !hideSider"
      class="i-layout-sider"
      :class="siderClasses"
      :width="menuSideWidth"
    >
      <menu-side :hide-logo="isHeaderStick && headerFix && showHeader"></menu-side>
    </Sider>
    <Layout class="i-layout-inside" :class="insideClasses">
      <transition name="fade-quick">
        <Header
          v-show="showHeader"
          class="i-layout-header"
          :class="headerClasses"
          :style="headerStyle"
        >
          <header-logo v-if="isMobile && showMobileLogo"></header-logo>
          <header-logo v-if="!isMobile && isHeaderStick && headerFix"></header-logo>
          <header-collapse
            v-if="!(!isMobile && !showSiderCollapse || hideSider)"
            @on-toggle-drawer="handleToggleDrawer"
          ></header-collapse>
          <header-reload v-if="!isMobile && showReload" @on-reload="handleReload"></header-reload>
          <menu-head ref="menuHead" v-if="headerMenu && !isMobile"></menu-head>
          <header-breadcrumb ref="breadcrumb" v-if="showBreadcrumb && !headerMenu && !isMobile"></header-breadcrumb>
          <header-search v-if="!(!showSearch || headerMenu || isMobile || showBreadcrumb)"></header-search>
          <div class="i-layout-header-right">
            <header-search
              v-if="
                (showSearch && isMobile) ||
                  (showSearch && (headerMenu || showBreadcrumb))
              "
            ></header-search>
            <menu-head v-if="headerMenu && isMobile"></menu-head>
            <header-log v-if="isDesktop && showLog"></header-log>
            <header-fullscreen v-if="isDesktop && showFullscreen"></header-fullscreen>
            <header-notice v-if="showNotice"></header-notice>
            <header-user></header-user>
            <header-i18n v-if="showI18n"></header-i18n>
            <header-setting v-if="enableSetting && !isMobile"></header-setting>
          </div>
        </Header>
      </transition>
      <Content class="i-layout-content" :class="contentClasses">
        <transition name="fade-quick">
          <i-tabs v-if="tabs" v-show="showHeader"></i-tabs>
        </transition>
        <div class="i-layout-content-main">
          <keep-alive :include="keepAlive">
            <router-view v-if="loadRouter" />
          </keep-alive>
        </div>
      </Content>
      <copyright></copyright>
    </Layout>
    <div v-if="isMobile && !hideSider">
      <Drawer placement="left" :closable="false" :class-name="drawerClasses" v-model="showDrawer">
        <menu-side></menu-side>
      </Drawer>
    </div>
  </Layout>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { menuSideWidth, sameRouteForceUpdate } from '@/config/settings'

import menuHead from './components/menu-head'
import menuSide from './components/menu-side'
import copyright from '_c/copyright'
import headerLogo from './components/menu-head/header-logo'
import headerCollapse from './components/header-collapse'
import headerReload from './components/menu-head/header-reload'
import headerBreadcrumb from './components/menu-head/header-breadcrumb'
import headerSearch from './components/menu-head/header-search'
import headerUser from './components/menu-head/header-user'
import headerI18n from '../i18n'
import headerLog from './components/menu-head/header-log'
import headerFullscreen from './components/menu-head/header-fullscreen'
import headerSetting from './components/menu-head/header-setting'
import headerNotice from './components/menu-head/header-notice'
import iTabs from './components/menu-head/i-tabs'

import { animationFrame } from '@/utils/debug'

export default {
  name: 'BasicLayout',
  components: {
    menuHead,
    menuSide,
    copyright,
    headerLogo,
    headerCollapse,
    headerReload,
    headerBreadcrumb,
    headerSearch,
    headerUser,
    headerI18n,
    headerLog,
    headerFullscreen,
    headerSetting,
    headerNotice,
    iTabs
  },
  data() {
    return {
      showDrawer: false,
      ticking: false,
      headerVisible: false,
      oldScrollTop: 0,
      isDelayHideSider: false,
      loadRouter: true
    }
  },
  computed: {
    ...mapState('admin/layout', [
      'siderTheme',
      'headerTheme',
      'headerStick',
      'tabs',
      'tabsFix',
      'siderFix',
      'headerFix',
      'headerHide',
      'headerMenu',
      'isMobile',
      'isTablet',
      'isDesktop',
      'menuCollapse',
      'showMobileLogo',
      'showSearch',
      'showNotice',
      'showFullscreen',
      'showSiderCollapse',
      'showBreadcrumb',
      'showLog',
      'showI18n',
      'showReload',
      'enableSetting'
    ]),
    ...mapState('admin/page', ['keepAlive']),
    ...mapGetters('admin/menu', ['hideSider']),
    isHeaderStick: function () {
      return this.hideSider ? true : this.headerStick
    },
    showHeader: function () {
      let flag = true
      if (this.headerFix && this.headerHide && !this.headerVisible) {
        flag = false
      }
      return flag
    },
    headerClasses: function () {
      return [
        'i-layout-header-color-'.concat(this.headerTheme),
        {
          'i-layout-header-fix': this.headerFix,
          'i-layout-header-fix-collapse': this.headerFix && this.menuCollapse,
          'i-layout-header-mobile': this.isMobile,
          'i-layout-header-stick': this.isHeaderStick && !this.isMobile,
          'i-layout-header-with-menu': this.headerMenu,
          'i-layout-header-with-hide-sider':
            this.hideSider || this.isDelayHideSider
        }
      ]
    },
    headerStyle: function () {
      const width = this.isHeaderStick
        ? 0
        : this.menuCollapse
        ? 80
        : menuSideWidth
      return this.isMobile || !this.headerFix
        ? {}
        : { width: 'calc(100% - '.concat(width, 'px)') }
    },
    siderClasses: function () {
      return {
        'i-layout-sider-fix': this.siderFix,
        'i-layout-sider-dark': this.siderTheme === 'dark'
      }
    },
    contentClasses: function () {
      return {
        'i-layout-content-fix-with-header': this.headerFix,
        'i-layout-content-with-tabs': this.tabs,
        'i-layout-content-with-tabs-fix': this.tabs && this.tabsFix
      }
    },
    insideClasses: function () {
      return {
        'i-layout-inside-fix-with-sider': this.siderFix,
        'i-layout-inside-fix-with-sider-collapse':
          this.siderFix && this.menuCollapse,
        'i-layout-inside-with-hide-sider': this.hideSider,
        'i-layout-inside-mobile': this.isMobile
      }
    },
    drawerClasses: function () {
      const classes = 'i-layout-drawer'
      return this.siderTheme === 'dark'
        ? `${classes} i-layout-drawer-dark`
        : classes
    },
    menuSideWidth: function () {
      return this.menuCollapse ? 80 : menuSideWidth
    }
  },
  watch: {
    hideSider: function () {
      this.isDelayHideSider = true
      setTimeout(() => {
        this.isDelayHideSider = false
      }, 0)
    },
    $route: function (newRoute, oldRoute) {
      if (newRoute.path === oldRoute.path && sameRouteForceUpdate) {
        this.handleReload()
      }
    }
  },
  methods: {
    ...mapMutations('admin/layout', ['updateMenuCollapse']),
    ...mapMutations('admin/page', ['keepAlivePush', 'keepAliveRemove']),
    handleToggleDrawer: function (toggle) {
      this.showDrawer = typeof toogle === 'boolean' ? toggle : !this.showDrawer
    },
    handleScroll: function () {
      if (this.headerHide) {
        const scrollTop =
          document.body.scrollTop + document.documentElement.scrollTop
        if (!this.ticking) {
          this.ticking = true
          animationFrame(() => {
            if (this.oldScrollTop > scrollTop) {
              this.headerVisible = true
            } else {
              if (scrollTop > 300 && this.headerVisible) {
                this.headerVisible = false
              } else if (scrollTop < 300 && !this.headerVisible) {
                this.headerVisible = true
              }
            }
            this.oldScrollTop = scrollTop
            this.ticking = false
          })
        }
      }
    },
    handleHeaderWidthChange: function () {
      const breadcrumb = this.$refs.breadcrumb
      if (breadcrumb) {
        breadcrumb.handleGetWidth()
        breadcrumb.handleCheckWidth()
      }
      // this.$refs.menuHead
    },
    handleReload: function () {
      const isCurrentAlive = this.keepAlive.indexOf(this.$route.name) > -1
      const routeName = this.$route.name
      if (isCurrentAlive) {
        this.keepAliveRemove(routeName)
      }
      this.loadRouter = false
      this.$nextTick(() => {
        this.loadRouter = true
        if (isCurrentAlive) {
          this.keepAlivePush(routeName)
        }
      })
    }
  },
  mounted: function () {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  beforeDestroy: function () {
    document.removeEventListener('scroll', this.handleScroll)
  },
  created: function () {
    this.isTablet && this.showSiderCollapse && this.updateMenuCollapse(true)
  }
}
</script>

<style lang="scss">
.i-link {
  cursor: pointer;
  &-color {
    :active,
    :hover {
      color: inherit;
    }
  }
}

.i-layout {
  &-sider {
    min-height: 100vh;
    background: #fff;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
    position: relative;
    z-index: 13;

    &-dark {
      background: #191a23;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    }

    &-fix {
      position: fixed;
      top: 0;
      left: 0;
      .i-layout-menu-side {
        height: calc(100vh - 64px);
        overflow-y: auto;
      }
    }

    &-logo {
      height: 63px;
      line-height: 63px;
      text-align: center;
      border-bottom: 1px solid #f8f8f9;
      overflow: hidden;

      &-dark {
        border-bottom: 1px solid #101117;
        background: #191a23;
      }

      img {
        height: 80%;
        vertical-align: middle;
      }
    }
  }

  &-inside {
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
    &-fix-with-sider {
      padding-left: 256px;
      &-collapse {
        padding-left: 80px;
      }
    }
    &-mobile,
    &-with-hide-sider {
      padding-left: 0;
    }
  }

  &-header {
    width: 100%;
    background: #fff;
    padding: 0;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    transition: all 0.2s ease-in-out;
    z-index: 3;
    display: block;
    &-with-hide-sider {
      transition: none;
    }
    &-with-menu {
      display: flex;
    }
    &-color-dark {
      background: #191a23;
    }
    &-color-primary {
      background: #2173dc;
      background: -webkit-linear-gradient(90deg, #1d42ab, #2173dc, #1e93ff);
      background: -moz-linear-gradient(to right, #1d42ab, #2173dc, #1e93ff);
      background: -o-linear-gradient(to right, #1d42ab, #2173dc, #1e93ff);
      background: linear-gradient(90deg, #1d42ab, #2173dc, #1e93ff);
      .i-layout-header-search::-moz-placeholder {
        color: hsla(0, 0%, 100%, 0.7);
        opacity: 1;
      }
      .i-layout-header-search:-ms-input-placeholder {
        color: hsla(0, 0%, 100%, 0.7);
      }
      .i-layout-header-search::-webkit-input-placeholder {
        color: hsla(0, 0%, 100%, 0.7);
      }
    }
    &-fix {
      position: fixed;
      top: 0;
      right: 0;
      left: 256px;
      z-index: 11;
      &-collapse {
        left: 80px;
      }
    }
    &-stick {
      left: 0;
      z-index: 14;
    }
    &-mobile {
      left: 0;
      display: block;
    }
    &-logo {
      display: inline-block;
      height: 64px;
      line-height: 64px;
      &-stick {
        width: 256px;
        text-align: center;
      }
      img {
        height: 80%;
        vertical-align: middle;
      }
    }
    &-title {
      display: inline-block;
    }
    &-color-dark,
    &-color-primary {
      color: #fff;
      .i-layout-header-trigger:hover {
        background: hsla(0, 0%, 100%, 0.05);
      }
      .ivu-menu {
        background: transparent;
      }
      .ivu-item {
        border-width: 3px !important;
      }
      .ivu-menu-light.ivu-menu-horizontal {
        .ivu-item,
        .ivu-menu-submenu {
          color: hsla(0, 0%, 100%, 0.7);
        }
        .ivu-menu-item-active,
        .ivu-menu-item:hover {
          color: #fff;
          border-bottom-color: #4fe3c1;
        }
      }
      .i-layout-header-breadcrumb {
        .ivu-breadcrumb-item-link {
          color: hsla(0, 0%, 100%, 0.7);
        }
        & > span:last-child {
          .ivu-breadcrumb-item-link {
            color: #fff;
          }
        }
      }
    }
    &-trigger {
      display: inline-block;
      width: 64px;
      height: 64px;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: #f8f8f9;
      }
      i {
        font-size: 20px;
      }
      &-min {
        width: auto;
        padding: 0 12px;
        i {
          font-size: 18px;
        }
      }
      &-in {
        padding: 0;
      }
      &-no-height {
        height: auto;
      }
      &-nohover:hover {
        background: transparent !important;
      }
    }
    &-right {
      height: 64px;
      float: right;
    }
  }
  &-content {
    &-flex {
      display: flex;
    }
    &-fix-with-header {
      padding-top: 64px;
    }
    &-main {
      margin: 24px;
      position: relative;
      &-flex {
        flex: auto;
      }
      &-no-margin {
        margin: 0;
      }
    }
    &-with-tabs {
      .i-layout-content-main {
        margin-top: 0;
      }
      &-fix {
        .i-layout-content-main {
          margin-top: 44px;
          .i-layout-page-header {
            margin-top: 0;
          }
        }
      }
    }
  }
  &-drawer {
    .ivu-drawer-body {
      padding: 0;
      overflow: visible;
    }
    .i-layout-menu-side {
      height: calc(100vh - 64px);
      overflow-y: auto;
    }
    &-dark {
      .ivu-drawer-body {
        background: #191a23;
      }
    }
  }
}
.fade-quick-enter-active,
.fade-quick-leave-active {
  transition: opacity 0.2s;
}

.fade-quick-enter,
.fade-quick-leave-to {
  opacity: 0;
}
</style>
