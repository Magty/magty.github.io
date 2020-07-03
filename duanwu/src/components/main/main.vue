<template>
  <Layout class="i-layout">
    <Sider
      v-if="screenWidth>600"
      hide-trigger
      collapsible
      width="256"
      collapsed-width="80"
      v-model="collapsed"
      class="i-layout-sider"
      @on-collapse="handleCollapse"
      :class="{'i-layout-sider-fix': settings.fixSider,'i-layout-sider-dark': settings.darkSider}"
    >
      <side-menu
        accordion
        ref="sideMenu"
        :active-name="$route.name"
        :collapsed="collapsed"
        @on-select="turnToPage"
        :menu-list="menuList"
      >
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="i-layout-sider-logo" :class="{'i-layout-sider-logo-dark': settings.darkSider}">
          <router-link to="/">
            <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
            <img v-show="collapsed" :src="minLogo" key="min-logo" />
          </router-link>
        </div>
      </side-menu>
    </Sider>
    <Layout
      class="i-layout-inside"
      :class="{ 'i-layout-inside-fix-with-sider' : settings.fixSider,'i-layout-inside-fix-with-sider-collapse': collapsed ,'i-layout-inside-mobile': screenWidth <= 600}"
    >
      <Header
        class="i-layout-header"
        :style="`width: calc(100% - ${ siderWidth }px)`"
        :class="{'i-layout-header-color-dark': settings.darkHeader,'i-layout-header-fix' : settings.fixHeader,'i-layout-header-fix-collapse': collapsed,'i-layout-header-mobile': screenWidth <= 600}"
      >
        <router-link
          v-if="settings.device==='mobile'"
          to="/"
          class="i-link i-layout-header-logo i-link-color"
        >
          <img :src="minLogo" />
        </router-link>
        <sider-trigger
          class="i-layout-header-trigger i-layout-header-trigger-min"
          @on-change="handleCollapsedChange"
          :collapsed="collapsed"
          :icons="siderType"
          :size="18"
        ></sider-trigger>
        <sider-trigger
          class="i-layout-header-trigger i-layout-header-trigger-min"
          v-if="settings.showReload && settings.device==='pc'"
          @on-change="handleRefresh"
          :icons="refreshIcon"
          :size="18"
        ></sider-trigger>
        <custom-bread-crumb
          v-if="settings.showBreadCrumb && headerWidth > 782"
          class="i-layout-header-breadcrumb"
          :list="breadCrumbList"
          :showIcon="settings.showBreadIcon"
        ></custom-bread-crumb>
        <!-- <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange"></header-bar> -->
      </Header>
      <Content
        class="i-layout-content"
        :class="{'i-layout-content-fix-with-header': settings.fixHeader,'i-layout-content-with-tabs': settings.showTabs,'i-layout-content-with-tabs-fix': settings.fixTabs}"
      >
        <div
          v-if="settings.showTabs"
          class="i-layout-tabs"
          :class="{'i-layout-tabs-fix': settings.fixTabs}"
          :style="`width: calc(100% - ${ siderWidth }px);left: ${ siderWidth }px;`"
        >
          <tabs-nav
            :tabsNavlist="tabsNavList"
            :fixTabs="settings.fixTabs"
            :showTabsIcon="settings.showTabsIcon"
            @on-closetabs="handleCloseTab"
          ></tabs-nav>
        </div>
        <div class="i-layout-content-main">
          <keep-alive :include="cacheList">
            <router-view v-if="refreshFlag" />
          </keep-alive>
        </div>
        <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import SideMenu from './components/side-menu'
import siderTrigger from './components/header-bar/sider-trigger'
import customBreadCrumb from './components/header-bar/custom-bread-crumb'
import tabsNav from './components/tabs-nav'
// import HeaderBar from './components/header-bar'
import ABackTop from './components/a-back-top'

import logo from '@/assets/logo.png'
import darkLogo from '@/assets/logo-dark.png'
import minLogo from '@/assets/logo-small.png'

import routers from '@/router/routers'
// import { getNewTabList  , routeEqual  } from '@/utils/util'

import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Main',
  components: {
    SideMenu,
    siderTrigger,
    customBreadCrumb,
    tabsNav,
    // HeaderBar,
    ABackTop
  },
  data() {
    return {
      refreshFlag: true,
      collapsed: false,
      minLogo,
      isFullscreen: false,
      gridType: '', // 栅格窗口大小  [xs:<576,sm>=576,md>=768,lg>=992,xl>1200,xxl>=1600]
      settings: {
        fixSider: true,
        darkSider: true,
        showBreadCrumb: true,
        showBreadIcon: false,
        device: 'pc',
        fixHeader: true,
        darkHeader: false,
        showReload: true,
        showTabs: true,
        fixTabs: true,
        showTabsIcon: true
      },
      screenTimer: null,
      screenWidth: document.body.clientWidth,
      siderType: ['_caidanshouqi', '_caidanzhankai'],
      refreshIcon: ['md-refresh']
    }
  },
  computed: {
    maxLogo() {
      return this.settings.darkSider ? darkLogo : logo
    },
    cacheList() {
      return []
    },
    tabsNavList() {
      return this.$store.state.app.tabsNavList
    },
    menuList() {
      return this.$store.getters.menuList
    },
    siderWidth() {
      let width = this.collapsed ? 80 : 256
      if (this.screenWidth <= 600) {
        width = 0
      }
      return width
    },
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList
    },
    headerWidth() {
      return this.screenWidth - this.siderWidth
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setHomeRoute',
      'setTabsNavList',
      'addTab',
      'closeTab',
      'updateRoute'
    ]),
    ...mapActions(['login']),
    turnToPage(route) {
      let { name, params, query } = {}
      if (typeof route === 'string') {
        name = route
      } else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCloseTab(type) {
      /* if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$store.app.homeRoute)
        } else {
          if (routeEqual(this.route, route)) {
            this.closeTab(route)
          }
        }
      } */
      console.log(type)
    },
    changeByScreenwidth() {
      if (this.screenWidth < 992 && !this.collapsed) {
        this.collapsed = true
      } else if (this.screenWidth > 992 && this.collapsed) {
        this.collapsed = false
      }
      if (this.screenWidth > 600) {
        this.settings.device = 'pc'
      } else {
        this.settings.device = 'mobile'
      }
    },
    handleCollapse(state) {
      // console.log(state)
      // this.collapsed = true
    },
    handleCollapsedChange() {
      this.collapsed = !this.collapsed
    },
    handleRefresh() {
      this.refreshFlag = false
      this.$nextTick(() => {
        this.refreshFlag = true
      })
    }
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTab({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      // this.updateRoute(newRoute)
      // this.setTabsNavList(getNewTabList(this.tabsNavList, newRoute))
    },
    screenWidth(value) {
      this.changeByScreenwidth()
    }
  },
  mounted() {
    window.onresize = () => {
      /* return (() => {
        this.screenWidth = document.body.clientWidth
      })() */
      this.screenWidth = document.body.clientWidth
    }
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.changeByScreenwidth()
    this.setHomeRoute(routers)
    this.setTabsNavList()
    this.setBreadCrumb(this.$route)
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

  &-side-fix,
  &-menu-sider {
    height: calc(100vh - 64px);
    overflow-y: auto;
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
        > span:last-child,
        a.ivu-breadcrumb-item-link:hover {
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
    &-breadcrumb {
      display: inline-block;
    }
  }
  &-content {
    &-fix-with-header {
      padding-top: 64px;
    }
    &-main {
      margin: 24px;
    }
    &-with-tabs {
      .i-layout-content-main {
        margin-top: 0;
      }
      &-fix {
        .i-layout-content-main {
          margin-top: 44px;
          /* .i-layout-page-header {
            margin-top: 0;
          } */
        }
      }
    }
  }
  &-tabs {
    width: 100%;
    background-color: #f5f7f9;
    transition: all 0.2s ease-in-out;
    &-fix {
      position: fixed;
      z-index: 3;
    }
  }
}
</style>
