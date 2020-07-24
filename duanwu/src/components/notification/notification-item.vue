<template>
  <div @click="handleClick" class="ivu-notifications-item" :class="classes">
    <Row v-bind="rowProps">
      <i-Col class="ivu-notifications-item-icon" span="4">
        <Avatar v-if="icon" :style="iconStyle" :icon="icon" :shape="avatarShape" :size="iconSize"></Avatar>
        <Avatar
          v-else-if="customIcon"
          :style="iconStyle"
          :custom-icon="customIcon"
          :size="iconSize"
        ></Avatar>
        <Avatar
          v-else-if="avatar"
          :style="iconStyle"
          :src="avatar"
          :shape="avatarShape"
          :size="iconSize"
        ></Avatar>
      </i-Col>
      <i-Col class="ivu-notifications-item-content" :span="contentSpan">
        <div class="ivu-notifications-item-title">
          <h4 v-if="title">{{title}}</h4>
        </div>
        <div v-if="tag" class="ivu-notifications-item-tag">
          <Tag v-bind="tagProps">{{tag}}</Tag>
        </div>
        <div v-if="content" class="ivu-notifications-item-desc">{{content}}</div>
        <div v-if="time" class="ivu-notifications-item-time">
          <Time :time="time" v-bind="timeProps"></Time>
        </div>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import { oneOf } from '../../utils/assist'
export default {
  name: 'NotificationItem',
  inject: ['NotificationTabInstance', 'NotificationInstance'],
  props: {
    rowProps: {
      type: Object,
      default: function() {
        return {
          type: 'flex',
          justify: 'center',
          align: 'middle'
        }
      }
    },
    read: {
      type: [Boolean, Number],
      default: false
    },
    icon: {
      type: String
    },
    customIcon: {
      type: String
    },
    iconColor: {
      type: String
    },
    iconSize: {
      validator: value => oneOf(value, ['small', 'default', 'large']),
      default: 'default'
    },
    avatar: {
      type: String
    },
    avatarShape: {
      validator: value => oneOf(value, ['circle', 'square']),
      default: 'circle'
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    time: {
      type: [Number, Date, String]
    },
    timeProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tag: {
      type: String
    },
    tagProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    clickClose: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes: function() {
      return {
        'ivu-notifications-item-unread': !this.read || this.read === 0
      }
    },
    contentSpan: function() {
      return this.icon || this.customIcon || this.avatar ? 20 : 24
    },
    iconStyle: function() {
      return { 'background-color': this.iconColor }
    }
  },
  methods: {
    handleClick: function() {
      this.$emit('on-item-click', this.$attrs)
      this.NotificationTabInstance.handleItemClick(this.$attrs)
      this.clickClose && this.NotificationInstance.handleClose()
    }
  },
  mounted: function() {
    this.NotificationTabInstance.handleGetItems()
  },
  beforeDestroy: function() {
    this.NotificationTabInstance.handleGetItems()
  }
}
</script>

<style lang="scss">
.ivu-notifications-item {
  padding: 12px 24px;
  border-bottom: 1px solid #e8eaec;
  cursor: pointer;
  -webkit-transition: background-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
  text-align: left;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f0faff;
  }
  &-title {
    margin-bottom: 4px;
    h4 {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: #515a6e;
    }
  }
  &-tag {
    float: right;
    margin-top: -2px;
    .ivu-tag {
      margin-right: 0;
    }
  }
  &-desc {
    color: #808695;
    font-size: 12px;
    margin-bottom: 4px;
  }
  &-time {
    font-size: 12px;
    color: #808695;
  }
}
</style>
