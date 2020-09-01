<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="工作台" hidden-breadcrumb>
        <div slot="content">
          <Avatar class="dashboard-workplace-header-avatar" :src="info.avatar"></Avatar>
          <div class="dashboard-workplace-header-tip">
            <p class="dashboard-workplace-header-tip-title">早安{{info.name}}，开始您一天的工作吧！</p>
            <p class="dashboard-workplace-header-tip-desc">
              <Icon type="md-rainy"></Icon>今日阴转小雨，22℃ - 32℃，出门记得带伞哦。
            </p>
          </div>
        </div>
        <div class="dashboard-workplace-header-extra" slot="extra">
          <Row type="flex" justify="center" align="middle" :gutter="12">
            <i-Col :span="8">
              <p>
                <Avatar v-color="'#40a9ff'" v-bg-color="'#e6f7ff'" icon="md-apps" size="small"></Avatar>
                <span>项目数</span>
              </p>
              <p>12</p>
            </i-Col>
            <i-Col :span="8">
              <p>
                <Avatar
                  v-color="'#ffa940'"
                  v-bg-color="'#fff7e6'"
                  icon="md-checkbox-outline"
                  size="small"
                ></Avatar>
                <span>待办项</span>
              </p>
              <p>
                <Tooltip placement="top" content="待办：3 / 总计：24">3 / 24</Tooltip>
              </p>
            </i-Col>
            <i-Col :span="8">
              <p>
                <Avatar v-color="'#73d13d'" v-bg-color="'#f6ffed'" icon="logo-usd" size="small"></Avatar>
                <span>积分</span>
              </p>
              <p>
                <Numeral value="1689" format="0,"></Numeral>
              </p>
            </i-Col>
          </Row>
        </div>
      </PageHeader>
    </div>
    <Row class="ivu-mt" :gutter="24">
      <i-Col class="ivu-mb" :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <Card class="ivu-mb" :bordered="false" dis-hover :padding="6">
          <div slot="title">
            <Avatar v-color="'#1890ff'" v-bg-color="'#e6f7ff'" icon="md-apps" size="small"></Avatar>
            <span class="ivu-pl-8">我的项目</span>
          </div>
          <div slot="extra">
            <a href="/">全部项目</a>
          </div>
          <MyApps></MyApps>
        </Card>
        <Card :bordered="false" dis-hover>
          <div slot="title">
            <Avatar v-color="'#722ed1'" v-bg-color="'#f9f0ff'" icon="md-bulb" size="small"></Avatar>
            <span class="ivu-pl-8">动态</span>
          </div>
          <Feeds></Feeds>
        </Card>
      </i-Col>
      <i-Col class="ivu-mb" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <Card class="ivu-mb" :bordered="false" dis-hover>
          <div slot="title">
            <Avatar v-color="'#ff4d4f'" v-bg-color="'#fff1f0'" icon="md-heart" size="small"></Avatar>
            <span class="ivu-pl-8">快捷操作</span>
          </div>
          <div slot="extra">
            <Tooltip placement="top" content="配置">
              <Icon type="md-settings"></Icon>
            </Tooltip>
          </div>
          <Shortcut></Shortcut>
        </Card>
        <Card class="ivu-mb" :bordered="false" dis-hover :padding="0">
          <div slot="title">
            <Avatar
              v-color="'#faad14'"
              v-bg-color="'#fffbe6'"
              icon="md-checkbox-outline"
              size="small"
            ></Avatar>
            <span class="ivu-pl-8">待办事项</span>
          </div>
          <Todo></Todo>
        </Card>
        <Card class="ivu-mb" :bordered="false" dis-hover>
          <div slot="title">
            <Avatar v-color="'#52c41a'" v-bg-color="'#f6ffed'" icon="ios-people" size="small"></Avatar>
            <span class="ivu-pl-8">小组成员</span>
          </div>
          <Member></Member>
        </Card>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyApps from './my-apps'
import Feeds from './feeds'
import Shortcut from './shortcut'
import Todo from './todo'
import Member from './member'
export default {
  name: 'dashboard-workplace',
  components: {
    MyApps,
    Feeds,
    Shortcut,
    Todo,
    Member
  },
  computed: {
    ...mapState('admin/user', ['info'])
  }
}
</script>

<style lang="scss">
.dashboard-workplace-header {
  &-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-right: 16px;
  }
  &-tip {
    display: inline-block;
    vertical-align: middle;
    &-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    &-desc {
      color: #808695;
    }
  }
  &-extra {
    .ivu-col p {
      text-align: right;
      &:first-child span {
        &:first-child {
          margin-right: 4px;
        }
        &:last-child {
          color: #808695;
        }
      }
      &:last-child {
        font-size: 22px;
      }
    }
  }
}
</style>
