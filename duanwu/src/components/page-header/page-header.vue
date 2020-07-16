<template>
  <div class="ivu-page-header" :class="classes">
    <div v-if="$slots.breadcrumb|| !hiddenBreadcrumb" class="ivu-page-header-breadcrumb">
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
      <div v-if="back || $slots.back" class="ivu-page-header-back" @click="handleBack">
        <Icon type="md-arrow-back"></Icon>
        <Divider type="vertical"></Divider>
      </div>
    </div>
    <div v-if="logo || $slots.logo" class="ivu-page-header-logo">
      <img :src="logo" />
    </div>
    <div class="ivu-page-header-main">
      <div class="ivu-page-header-row">
        <div @click="handleBack" v-if="back || $slots.back" class="ivu-page-header-back">
          <Icon type="md-arrow-back"></Icon>
          <Divider type="vertical"></Divider>
        </div>
        <div v-if="title || $slot.title" class="ivu-page-header-title">
          <div v-if="action || $slots.action" class="ivu-page-header-action">{{action}}</div>
        </div>
      </div>
      <div class="ivu-page-header-row">
        <div v-if="content || $slots.content" class="ivu-page-header-content">{{ content}}</div>
      </div>
    </div>
    <div v-if="extra || $slots.extra" class="ivu-page-header-extra">{{ extra }}</div>
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

<style>
</style>
