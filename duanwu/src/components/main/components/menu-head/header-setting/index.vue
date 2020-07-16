<template>
  <span @click="showSetting" class="i-layout-header-trigger i-layout-header-trigger-min">
    <Icon type="md-more"></Icon>
    <Drawer v-model="visible" width="280">
      <Divider size="small">主题风格设置</Divider>
      <div class="i-layout-header-setting-item">
        <div
          @click="handleChangeSetting('siderTheme','dark')"
          class="i-layout-header-setting-item-radio"
          :class="{on: 'dark' === siderTheme}"
        >
          <Tooltip content="暗色侧边栏" placement="top" transfer>
            <img :src="navDark" />
          </Tooltip>
        </div>
        <div
          @click="handleChangeSetting('siderTheme','light')"
          class="i-layout-header-setting-item-radio"
          :class="{'on': 'light' === siderTheme}"
        >
          <Tooltip content="亮色侧边栏" placement="top" transfer>
            <img :src="navLight" />
          </Tooltip>
        </div>
      </div>
      <div class="i-layout-header-setting-item">
        <div
          @click="handleChangeSetting('headerTheme','light')"
          class="i-layout-header-setting-item-radio"
          :class="{on: 'light' === headerTheme}"
        >
          <Tooltip content="亮色顶栏" placement="top" transfer>
            <img :src="navDark" />
          </Tooltip>
        </div>
        <div
          @click="handleChangeSetting('headerTheme','dark')"
          class="i-layout-header-setting-item-radio"
          :class="{on: 'dark' === headerTheme}"
        >
          <Tooltip content="暗色顶栏" placement="top" transfer>
            <img :src="headerDark" />
          </Tooltip>
        </div>
        <div
          @click="handleChangeSetting('headerTheme','primary')"
          class="i-layout-header-setting-item-radio"
          :class="{on: 'primary' === headerTheme}"
        >
          <Tooltip content="主色顶栏" placement="top" transfer>
            <img :src="headerPrimary" />
          </Tooltip>
        </div>
      </div>
      <Divider size="small">导航设置</Divider>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">固定侧边栏</span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('siderFix',status)"
            size="small"
            v-model="siderFix"
          ></i-switch>
        </span>
      </div>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">固定顶栏</span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('headerFix',status)"
            size="small"
            v-model="headerFix"
          ></i-switch>
        </span>
      </div>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">固定顶栏</span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('headerFix',status)"
            size="small"
            v-model="headerFix"
          ></i-switch>
        </span>
      </div>
      <div
        class="i-layout-header-setting-item"
        :class="{'i-layout-header-setting-item-disabled': !headerFix}"
      >
        <span class="i-layout-header-setting-item-desc">
          下滑时隐藏顶栏
          <Tooltip placement="top" content="需开启固定顶栏" transfer>
            <Icon type="ios-help-circle-outline"></Icon>
          </Tooltip>
        </span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('headerHide',status)"
            size="small"
            :disabled="!headerFix"
            v-model="headerHide"
          ></i-switch>
        </span>
      </div>
      <div
        class="i-layout-header-setting-item"
        :class="{'i-layout-header-setting-item-disabled': !headerFix}"
      >
        <span class="i-layout-header-setting-item-desc">
          置顶顶栏
          <Tooltip placement="top" content="需开启固定顶栏" transfer>
            <Icon type="ios-help-circle-outline"></Icon>
          </Tooltip>
        </span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('headerStick',status)"
            size="small"
            :disabled="!headerFix"
            v-model="headerStick"
          ></i-switch>
        </span>
      </div>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">侧边栏开启手风琴模式</span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('menuAccordion',status)"
            size="small"
            v-model="menuAccordion"
          ></i-switch>
        </span>
      </div>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">显示折叠侧边栏按钮</span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('showSiderCollapse',status)"
            size="small"
            v-model="showSiderCollapse"
          ></i-switch>
        </span>
      </div>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">侧边栏折叠时显示父级菜单名</span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('showCollapseMenuTitle',status)"
            size="small"
            v-model="showCollapseMenuTitle"
          ></i-switch>
        </span>
      </div>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">
          全局面包屑显示图标
          <Tooltip placement="top" content="需开启全局面包屑导航" transfer>
            <Icon type="ios-help-circle-outline"></Icon>
          </Tooltip>
        </span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('showBreadcrumb',status)"
            size="small"
            v-model="showBreadcrumb"
          ></i-switch>
        </span>
      </div>
      <div
        class="i-layout-header-setting-item"
        :class="{'i-layout-header-setting-item-disabled': !showBreadcrumb}"
      >
        <span class="i-layout-header-setting-item-desc">
          全局面包屑显示图标
          <Tooltip placement="top" content="需开启全局面包屑导航" transfer>
            <Icon type="ios-help-circle-outline"></Icon>
          </Tooltip>
        </span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('showBreadcrumbIcon',status)"
            size="small"
            :disabled="!showBreadcrumb"
            v-model="showBreadcrumbIcon"
          ></i-switch>
        </span>
      </div>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">显示重载页面按钮</span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('showReload',status)"
            size="small"
            v-model="showReload"
          ></i-switch>
        </span>
      </div>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">显示多语言选择</span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('showI18n',status)"
            size="small"
            v-model="showI18n"
          ></i-switch>
        </span>
      </div>
      <Divider size="small">其他设置</Divider>
      <div class="i-layout-header-setting-item">
        <span class="i-layout-header-setting-item-desc">开启多页签</span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('tabs',status)"
            size="small"
            v-model="tabs"
          ></i-switch>
        </span>
      </div>
      <div
        class="i-layout-header-setting-item"
        :class="{'i-layout-header-setting-item-disabled': !tabs}"
      >
        <span class="i-layout-header-setting-item-desc">
          全局面包屑显示图标
          <Tooltip placement="top" content="需开启多页签" transfer>
            <Icon type="ios-help-circle-outline"></Icon>
          </Tooltip>
        </span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('showTabsIcon',status)"
            size="small"
            v-model="showTabsIcon"
            :disabled="!tabs"
          ></i-switch>
        </span>
      </div>
      <div
        class="i-layout-header-setting-item"
        :class="{'i-layout-header-setting-item-disabled' : !tabs}"
      >
        <span class="i-layout-header-setting-item-desc">
          固定多页签
          <Tooltip placement="top" content="需开启多页签" transfer>
            <Icon type="ios-help-circle-outline"></Icon>
          </Tooltip>
        </span>
        <span class="i-layout-header-setting-item-action">
          <i-switch
            @on-change="(status)=>handleChangeSetting('tabsFix',status)"
            size="small"
            v-model="tabsFix"
            :disabled="!tabs"
          ></i-switch>
        </span>
      </div>
      <Alert type="warning">
        <div slot="desc">
          该功能主要实时预览各种布局效果，更多完整配置在
          <strong>setting.js</strong>中设置。建议在生产环境关闭该布局预览功能。
        </div>
      </Alert>
    </Drawer>
  </span>
</template>

<script>
import navDark from '@/assets/images/nav-theme-dark.svg'
import navLight from '@/assets/images/nav-theme-light.svg'
import headerPrimary from '@/assets/images/header-theme-primary.svg'
import headerDark from '@/assets/images/header-theme-dark.svg'

import { mapState, mapMutations } from 'vuex'
export default {
  name: 'headerSetting',
  data() {
    return {
      navDark,
      navLight,
      headerPrimary,
      headerDark,
      visible: false
    }
  },
  computed: {
    ...mapState('admin/layout', [
      'siderTheme',
      'headerTheme',
      'headerStick',
      'siderFix',
      'headerFix',
      'headerHide',
      'menuAccordion',
      'showSiderCollapse',
      'tabs',
      'showTabsIcon',
      'tabsFix',
      'showBreadcrumb',
      'showBreadcrumbIcon',
      'showReload',
      'showI18n',
      'showCollapseMenuTitle'
    ])
  },
  methods: {
    ...mapMutations('admin/layout', ['updateLayoutSetting']),
    showSetting: function() {
      this.visible = true
    },
    handleChangeSetting: function(key, value) {
      this.updateLayoutSetting({
        key,
        value
      })
    }
  }
}
</script>

<style lang="scss">
.i-layout-header-setting {
  &-title {
    margin: 12px 0;
    color: #17233d;
    font-size: 14px;
    font-weight: 500;
  }
  &-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    &-radio {
      display: inline-block;
      position: relative;
      margin-right: 16px;
      cursor: pointer;
      &:after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: transparent;
        margin: 0 auto;
      }
      &.on:after {
        background: #19be6b;
      }
    }

    &-desc {
      flex: 1 1;
      font-size: 14px;
    }
    &-action {
      flex: 0 0 auto;
    }
    &-disabled {
      .i-layout-header-setting-item-desc {
        opacity: 0.5;
      }
    }
  }
}
</style>
