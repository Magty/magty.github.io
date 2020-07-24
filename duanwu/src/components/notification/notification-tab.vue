<template>
  <TabPane ref="tab" class="ivu-notifications-tab" :label="currentTitle" :name="name">
    <div ref="scroll" @scroll="handleScroll" class="ivu-notifications-container">
      <slot name="top"></slot>
      <div class="ivu-notifications-container-list">
        <slot></slot>
      </div>
      <div v-if="!loading && 0 === itemCount" class="ivu-notifications-tab-empty">
        <slot name="empty">
          <img v-if="emptyImage" :src="emptyImage" class="ivu-notifications-tab-empty-img" />
          <div class="ivu-notifications-tab-empty-text">{{emptyText}}</div>
        </slot>
      </div>
      <div class="ivu-notifications-tab-loading">
        <div
          v-if="loading"
          class="ivu-notifications-tab-loading-item ivu-notifications-tab-loading-show"
        >
          <slot name="loading">
            <Icon class="ivu-load-loop" type="ios-loading"></Icon>
            {{NotificationInstance.locale.loading}}
          </slot>
        </div>
        <template v-else-if="loadedAll">
          <div
            v-if="showLoadedAll && loadedAll"
            class="ivu-notifications-tab-loading-item ivu-notifications-tab-loading-all"
          >
            <slot name="loaded-all">{{NotificationInstance.locale.loadedAll}}</slot>
          </div>
          <template v-else></template>
        </template>
        <div
          v-else
          @click="handleLoadMore"
          class="ivu-notifications-tab-loading-item ivu-notifications-tab-loading-more"
        >
          <slot name="load-more">{{NotificationInstance.locale.loadMore}}</slot>
        </div>
      </div>
    </div>
    <div
      @click="handleClear"
      v-if="showClear && 0 != itemCount"
      class="ivu-notifications-tab-clear"
    >
      <slot name="clear">
        <Icon v-if="showClearIcon" type="md-done-all"></Icon>
        <span>{{ NotificationInstance.locale.clear + title }}</span>
      </slot>
    </div>
  </TabPane>
</template>

<script>
import { findComponentsDownward } from '../../utils/assist'
export default {
  name: 'NotificationTab',
  inject: ['NotificationInstance'],
  provide() {
    return {
      NotificationTabInstance: this
    }
  },
  props: {
    count: {
      type: Number
    },
    title: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    emptyText: {
      type: String,
      default: '目前没有通知'
    },
    emptyImage: {
      type: String,
      default: 'https://file.iviewui.com/iview-pro/icon-no-message.svg'
    },
    loadedAll: {
      type: Boolean,
      default: true
    },
    showLoadedAll: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    scrollToLoad: {
      type: Boolean,
      default: true
    },
    showClear: {
      type: Boolean,
      default: true
    },
    showClearIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      customLabel: h => {
        return (
          <div>
            <span>{this.title}</span>
            <Badge count={this.count}></Badge>
          </div>
        )
      },
      itemCount: 0
    }
  },
  computed: {
    currentTitle: function() {
      const type = this.NotificationInstance.countType
      if (type === 'text') {
        const countStr = this.count ? '(' + this.count + ')' : ''
        return this.title + ' ' + countStr
      }
      if (type === 'badge') {
        return this.customLabel
      }
      return ''
    }
  },
  watch: {
    count: {
      handler: function() {
        this.NotificationInstance.handleGetCountAll()
      },
      immediate: true
    }
  },
  methods: {
    handleGetTabBaseInfo: function() {
      return {
        name: this.name,
        title: this.title
      }
    },
    handleGetItems: function() {
      const item = findComponentsDownward(this, 'NotificationItem')
      this.itemCount = item.length
    },
    handleItemClick: function(e) {
      this.NotificationInstance.handleItemClick(this.handleGetTabBaseInfo(), e)
    },
    handleClear: function() {
      this.NotificationInstance.handleClear(this.handleGetTabBaseInfo())
    },
    handleLoadMore: function() {
      this.NotificationInstance.handleLoadMore(this.handleGetTabBaseInfo())
    },
    handleScroll: function() {
      if (this.scrollToLoad) {
        var e = this.$refs.scroll
        var t = e.scrollHeight - e.clientHeight - e.scrollTop
        this.loading || t !== 0 || this.handleLoadMore()
      }
    }
  }
}
</script>

<style>
</style>
