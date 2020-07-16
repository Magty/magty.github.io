<template>
  <div ref="notice" class="ivu-notifications">
    <Dropdown
      trigger="custom"
      :visible="visible"
      :transfer="transfer"
      :placement="placement"
      transfer-class-name="ivu-notifications-transfer"
      @on-visible-change="handleVisibleChange"
      @on-clickoutside="handleClickOutside"
    >
      <div @click.prevent="handleToggleOpen" class="ivu-notifications-rel">
        <Badge :count="finalCount">
          <Icon :type="icon" size="24"></Icon>
        </Badge>
      </div>
      <DropdownMenu slot="list">
        <div class="ivu-notifications-list" :class="{'ivu-notifications-list-wide':wide}">
          <div class="ivu-notifications-tabs">
            <Tabs @on-click="handleTabChange" :animated="false" :value="tab"></Tabs>
          </div>
          <div v-if="$slots.extra" class="ivu-notifications-extra"></div>
        </div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { oneOf, findComponentsDownward } from '../../utils/assist'
export default {
  name: 'Notification',
  provide: function() {
    return {
      NotificationInstance: this
    }
  },
  props: {
    count: {
      type: Number
    },
    autoCount: {
      type: Boolean,
      default: false
    },
    countType: {
      validator(value) {
        return oneOf(value, ['text', 'badge'])
      },
      default: 'text'
    },
    icon: {
      type: String,
      default: 'md-notifications-outline'
    },
    transfer: {
      type: Boolean,
      default: false
    },
    placement: {
      validator(value) {
        return oneOf(value, [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ])
      },
      default: 'bottom'
    },
    badgeProps: {
      type: Object,
      default: () => {}
    },
    clearClose: {
      type: Boolean,
      default: false
    },
    locale: {
      type: Object,
      default: () => {
        return {
          loadedAll: '加载完毕',
          loading: '加载中...',
          loadMore: '加载更多',
          clear: '清空'
        }
      }
    },
    tab: {
      type: String
    },
    wide: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      countAll: 0
    }
  },
  computed: {
    finalCount: function() {
      return this.autoCount ? this.countAll : this.count
    }
  },
  watch: {
    visible: function(e) {
      this.$emit('on-visible-change', e)
    }
  },
  methods: {
    handleVisibleChange: function(e) {
      this.visible = e
    },
    handleClickOutside: function(e) {
      this.$refs.notice.contains(e.target) || (this.visible = !1)
    },
    handleToggleOpen: function() {
      this.visible = !this.visible
    },
    handleGetCountAll: function() {
      const AllNotificationTabs = findComponentsDownward(
        this,
        'NotificationTab'
      )
      let count = 0
      AllNotificationTabs.forEach(item => {
        if (item.count) {
          count += item.count
        }
      })
      this.countAll = count
      return count
    },
    handleItemClick: function(e, t) {
      this.$emit('on-item-click', e, t)
    },
    handleClear: function(e) {
      this.$emit('on-clear', e)
      this.clearClose && this.handleClose()
    },
    handleLoadMore: function(e) {
      this.$emit('on-load-more', e)
    },
    handleClose: function() {
      this.visible = !1
    },
    handleTabChange: function(name) {
      const AllNotificationTabs = findComponentsDownward(
        this,
        'NotificationTab'
      )
      let tab = {}
      AllNotificationTabs.forEach(item => {
        if (item.$refs.tab.currentName === name) {
          tab = item.handleGetTabBaseInfo()
        }
      })
      this.$emit('on-tab-change', tab)
    }
  }
}
</script>

<style lang='scss'>
.ivu-notifications {
  display: inline-block;
  &-rel {
    display: inline-block;
    cursor: pointer;
  }
  &-list {
    width: 300px;
    line-height: normal;
    &-wide {
      width: auto;
    }
  }
  .ivu-tabs-nav-scroll {
    text-align: center;
  }
  .ivu-tabs-nav {
    display: inline-block;
    float: none;
  }
  &-tabs {
    .ivu-badge {
      margin-left: 3px;
      &-count {
        background: #e6ebf1;
        color: #808695;
        min-width: 16px;
        height: 16px;
        line-height: 14px;
        border-radius: 8px;
        padding: 0 4px;
      }
    }
    .ivu-tabs-bar {
      margin-bottom: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &-extra {
    border-top: 1px solid #e8eaec;
  }
  &-tab {
    &-empty {
      text-align: center;
      padding: 64px 0;
      &-img {
        display: inline-block;
        height: 64px;
      }
      &-text {
        color: #808695;
      }
    }
    &-clear {
      border-top: 1px solid #e8eaec;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      padding: 6px 0;
      color: #515a6e;
      -webkit-transition: color 0.2s ease-in-out;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: #57a3f3;
      }
    }
    &-loading-item {
      border-top: 1px solid #e8eaec;
      text-align: center;
      font-size: 14px;
      padding: 6px 0;
      color: #515a6e;
      -webkit-transition: color 0.2s ease-in-out;
      transition: color 0.2s ease-in-out;
    }
    &-loading-all,
    &-loading-show {
      color: #c5c8ce;
    }
    &-loading-more {
      cursor: pointer;
      color: #2d8cf0;
    }
  }
}
</style>
