<template>
  <div class="ivu-page-header" :class="classes">
    <div v-if="!hiddenBreadcrumb" class="ivu-page-header-breadcrumb">
      <slot name="breadcrumb"></slot>
      <Breadcrumb>
        <BreadcrumbItem
          v-for="(item,index) in breadcrumbList"
          :key="index"
          :to="item.to"
          :replace="item.replace"
          :target="item.target"
        ></BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="ivu-page-header-detail">
      <div v-if="back" class="ivu-page-header-back" @click="handleBack">
        <Icon type="md-arrow-back"></Icon>
        <Divider type="vertical"></Divider>
      </div>
    </div>
    <div v-if="logo" class="ivu-page-header-logo">
      <img :src="logo" />
    </div>
    <div class="ivu-page-header-main">
      <div class="ivu-page-header-row">
        <div @click="handleBack" v-if="back || $slots.back" class="ivu-page-header-back">
          <Icon type="md-arrow-back"></Icon>
          <Divider type="vertical"></Divider>
        </div>
        <div v-if="title" class="ivu-page-header-title">{{title}}</div>
        <div v-if="action" class="ivu-page-header-action">{{action}}</div>
      </div>
      <div class="ivu-page-header-row">
        <div v-if="content" class="ivu-page-header-content">{{ content}}</div>
      </div>
    </div>
    <div v-if="extra" class="ivu-page-header-extra">{{ extra }}</div>
    <div v-if="tabList && tabList.length" class="ivu-page-header-tabs">
      <Tabs @on-click="handleTabChange" :animated="false" :value="tabActiveKey">
        <TabPane v-for="(item,index) in tabList" :key="index" :label="label" :name="name"></TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String
    },
    back: {
      type: Boolean,
      default: false
    },
    logo: {
      type: String
    },
    action: {
      type: String
    },
    content: {
      type: String
    },
    extra: {
      type: String
    },
    breadcrumbList: {
      type: Array
    },
    hiddenBreadcrumb: {
      type: Boolean,
      default: false
    },
    tabList: {
      type: Array
    },
    tabActiveKey: {
      type: String
    },
    wide: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    classes: function() {
      return {
        'ivu-page-header-wide': this.wide
      }
    }
  },
  methods: {
    handleTabChange: function(name) {
      var tab = this.tabList.find(item => item.name === name)
      this.$emit('on-tab-change', JSON.parse(tab))
    },
    handleBack: function() {
      this.$emit('on-back')
    }
  }
}
</script>

<style lang="scss">
.ivu-page-header {
  padding: 16px 32px 0 32px;
  background: #fff;
  border-bottom: 1px solid #e8eaec;
  &-wide {
    max-width: 1200px;
    margin: auto;
  }
  &-detail,
  &-row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  &-row {
    width: 100%;
  }
  &-breadcrumb {
    margin-bottom: 16px;
  }
  &-tabs {
    margin: 0 0 0 -8px;
    .ivu-tabs-bar {
      margin-bottom: 0;
      border-bottom-color: transparent;
    }
  }
  &-logo {
    -webkit-box-flex: 0;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    margin-right: 16px;
    padding-top: 1px;
    & > img {
      display: block;
      width: 28px;
      height: 28px;
      border-radius: 4px;
    }
  }
  &-back {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 30px;
    -webkit-box-flex: 0;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    margin-right: 8px;
    cursor: pointer;
    -webkit-transition: color 0.2s ease-in-out;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: #2d8cf0;
    }
    .ivu-icon {
      font-size: 20px;
      line-height: inherit;
    }
    .ivu-divider {
      height: 14px;
      line-height: inherit;
      top: 8px;
    }
  }
  &-main {
    .ivu-page-header-back {
      display: none;
    }
  }
  &-title {
    display: inline-block;
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
  }
  &-action {
    min-width: 266px;
    margin-left: 56px;
    .ivu-btn-group:not(:last-child),
    .ivu-btn:not(:last-child) {
      margin-right: 8px;
    }
    .ivu-btn-group > .ivu-btn {
      margin-right: 0;
    }
  }
  &-content,
  &-extra {
    font-size: 14px;
  }
  &-content,
  &-title {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
  }
  &-action,
  &-extra,
  &-main {
    -webkit-box-flex: 0;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
  }
  &-main {
    width: 100%;
  }
  &-action,
  &-content,
  &-extra,
  &-logo,
  &-title {
    margin-bottom: 16px;
  }
  &-action,
  &-extra {
    text-align: right;
  }
  &-extra {
    min-width: 242px;
    margin-left: 88px;
  }
}
@media screen and (max-width: 1200px) {
  .ivu-page-header-extra {
    margin-left: 44px;
  }
}

@media screen and (max-width: 992px) {
  .ivu-page-header-extra {
    margin-left: 20px;
  }
}

@media screen and (max-width: 768px) {
  .ivu-page-header-row {
    display: block;
  }

  .ivu-page-header-action,
  .ivu-page-header-extra {
    margin-left: 0;
    text-align: left;
  }
}

@media screen and (max-width: 576px) {
  .ivu-page-header-detail > .ivu-page-header-back {
    display: none;
  }

  .ivu-page-header-main .ivu-page-header-back {
    display: inline-block;
    position: relative;
    top: -4px;
  }

  .ivu-page-header-main .ivu-page-header-back .ivu-divider {
    top: 0;
  }

  .ivu-page-header-detail {
    display: block;
  }
}

@media screen and (max-width: 480px) {
  .ivu-page-header-action .ivu-btn,
  .ivu-page-header-action .ivu-btn-group {
    display: block;
    margin-bottom: 8px;
  }

  .ivu-page-header-action .ivu-btn-group > .ivu-btn {
    display: inline-block;
    margin-bottom: 0;
  }
}
</style>
