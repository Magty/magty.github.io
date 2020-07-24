<template>
  <span class="i-layout-header-trigger i-layout-header-trigger-min i-layout-header-trigger-in">
    <Notification
      class="i-layout-header-notice"
      :class="{'i-layout-header-notice-mobile': isMobile}"
      :wide="isMobile"
      :badge-props="badgeProps"
      auto-count
      @on-load-more="handleLoadMore"
      @on-clear="handleClear"
    >
      <Icon slot="icon" type="md-notifications-outline" custom="i-icon i-icon-notification"></Icon>
      <NotificationTab
        title="通知"
        name="message"
        :count="unreadMessage"
        :loaded-all="messageList.length>=15"
        :loading="messageLoading"
        :scroll-to-load="false"
      >
        <NotificationItem
          v-for="(item,index) in messageList"
          :key="index"
          :title="item.title"
          :icon="item.icon"
          :icon-color="item.iconColor"
          :time="item.time"
          :read="item.read"
        ></NotificationItem>
      </NotificationTab>
      <NotificationTab
        title="关注"
        name="follow"
        :count="unreadFollow"
        :loaded-all="followList.length>=15"
        :loading="followLoading"
        :scroll-to-load="false"
      >
        <NotificationItem
          v-for="(item,index) in followList"
          :key="`foll_${index}`"
          :avatar="item.avatar"
          :title="item.title"
          :time="item.time"
          :read="item.read"
        ></NotificationItem>
      </NotificationTab>
      <NotificationTab
        title="待办"
        name="todo"
        :count="unreadTodo"
        :loaded-all="todoList.length>=15"
        :loading="todoLoading"
        :scroll-to-load="false"
      >
        <NotificationItem
          v-for="(item,index) in todoList"
          :key="`todo_${index}`"
          :content="item.content"
          :title="item.title"
          :tag="item.tag"
          :tag-props="item.tagProps"
          :read="item.read"
        ></NotificationItem>
      </NotificationTab>
    </Notification>
  </span>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'headerNotice',
  data() {
    return {
      badgeProps: {
        offset: [20, 0]
      },
      messageBaseList: [
        {
          icon: 'md-mail',
          iconColor: '#3391e5',
          title: '蒂姆·库克回复了你的邮件',
          read: 1,
          time: 1557297198
        },
        {
          icon: 'md-home',
          iconColor: '#87d068',
          title: '乔纳森·伊夫邀请你参加会议',
          read: 0,
          time: 1557297198
        },
        {
          icon: 'md-information',
          iconColor: '#fe5c57',
          title: '斯蒂夫·沃兹尼亚克已批准了你的休假申请',
          read: 1,
          time: 1557297198
        },
        {
          icon: 'md-star',
          iconColor: '#ff9900',
          title: '史蒂夫·乔布斯收藏了你的文章',
          read: 1,
          time: 1557297198
        },
        {
          icon: 'md-people',
          iconColor: '#f06292',
          title: '比尔·费尔南德斯通过了你的好友申请',
          read: 1,
          time: 1557297198
        }
      ],
      followBaseList: [
        {
          avatar:
            'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
          title: '史蒂夫·乔布斯 关注了你',
          read: 1,
          time: 1557299299
        },
        {
          avatar:
            'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
          title: '斯蒂夫·沃兹尼亚克 关注了你',
          read: 1,
          time: 1557299299
        },
        {
          avatar:
            'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
          title: '乔纳森·伊夫 关注了你',
          read: 0,
          time: 1557299299
        },
        {
          avatar:
            'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
          title: '蒂姆·库克 关注了你',
          read: 1,
          time: 1557299299
        },
        {
          avatar:
            'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
          title: '比尔·费尔南德斯 关注了你',
          read: 1,
          time: 1557299299
        }
      ],
      todoBaseList: [
        {
          title: '2019 下半年 OKR',
          content: '需要在 2019-06-14 之前完成',
          tag: '未开始',
          tagProps: {
            color: 'default'
          },
          read: 1
        },
        {
          title: '公孙离的面试评审',
          content: '需要在 2019-06-14 之前完成',
          tag: '即将到期',
          tagProps: {
            color: 'red'
          },
          read: 0
        },
        {
          title: 'iView 三周年生日会',
          content: '需要在 2019-07-28 之前完成',
          tag: '进行中',
          tagProps: {
            color: 'blue'
          },
          read: 1
        },
        {
          title: 'iView 三周年生日会',
          content: '需要在 2019-07-28 之前完成',
          tag: '进行中',
          tagProps: {
            color: 'blue'
          },
          read: 1
        }
      ],
      messageList: [],
      followList: [],
      todoList: [],
      messageLoading: false,
      followLoading: false,
      todoLoading: false
    }
  },
  computed: {
    ...mapState('admin/layout', ['isMobile']),
    unreadMessage: function() {
      let count = 0
      this.messageList.forEach(item => {
        if (!item.read) {
          count++
        }
      })
      return count
    },
    unreadFollow: function() {
      let count = 0
      this.followList.forEach(item => {
        if (!item.read) {
          count++
        }
      })
      return count
    },
    unreadTodo: function() {
      let count = 0
      this.todoList.forEach(item => {
        if (!item.read) {
          count++
        }
      })
      return count
    }
  },
  methods: {
    loadMore: function(name) {
      if (!this[''.concat(name, 'Loading')]) {
        this[''.concat(name, 'Loading')] = true
        setTimeout(() => {
          this[''.concat(name, 'List')] = this[''.concat(name, 'List')].concat(
            ...this[''.concat(name, 'BaseList')]
          )
          this[''.concat(name, 'Loading')] = false
        }, 1000)
      }
    },
    handleLoadMore: function(column) {
      this.loadMore(column.name)
    },
    clearUnread: function(name) {
      console.log(name)
      console.log(this[''.concat(name, 'List')])
      this[''.concat(name, 'List')] = this[''.concat(name, 'List')].map(
        item => {
          item.read = 1
          return item
        }
      )
      console.log(this[''.concat(name, 'List')])
    },
    handleClear: function(column) {
      this.clearUnread(column.name)
    }
  },
  mounted: function() {
    this.messageList = [...this.messageBaseList]
    this.followList = [...this.followBaseList]
    this.todoList = [...this.todoBaseList]
  }
}
</script>

<style lang='scss'>
.i-layout-header-notice {
  .ivu-notifications-rel {
    padding: 0 12px;
  }
  &-mobile {
    width: 100%;
    .ivu-select-dropdown {
      left: 0 !important;
      right: 0;
      border-radius: 0;
      margin: 0;
    }
  }
}
</style>
