<template>
  <div>
    <Row :gutter="24">
      <i-Col :xl="6" :lg="6" :md="0" :sm="0" :xs="0">
        <Card shadow title="个人设置" icon="md-options" :padding="0">
          <CellGroup @on-click="handleChangeCell" class="ivu-pt-8 ivu-pb-8">
            <Cell title="基本设置" name="info" label="个人账户信息设置" :selected="'info' === currentType"></Cell>
            <Cell title="安全设置" name="safety" label="密码、邮箱等设置" :selected="'safety' === currentType"></Cell>
            <Cell
              title="账号绑定"
              name="account"
              label="绑定第三方社交账户"
              :selected="'account' === currentType"
            ></Cell>
            <Cell
              title="新消息通知"
              name="notification"
              label="各种通知的设置"
              :selected="'notification' === currentType"
            ></Cell>
          </CellGroup>
        </Card>
      </i-Col>
      <i-Col :xl="18" :lg="18" :md="24" :sm="24" :xs="24">
        <Card :bordered="false" dis-hover>
          <Row>
            <i-Col :xl="0" :lg="0" :md="24" :sm="24" :xs="24">
              <Tabs @on-click="handleChangeCell" :value="currentType">
                <TabPane label="基本设置" name="info"></TabPane>
                <TabPane label="安全设置" name="safety"></TabPane>
                <TabPane label="账号绑定" name="account"></TabPane>
                <TabPane label="新消息通知" name="notification"></TabPane>
              </Tabs>
            </i-Col>
          </Row>
          <Info v-if="'info'=== currentType"></Info>
          <Safety v-if="'safety'=== currentType"></Safety>
          <BindAccount v-if="'account'=== currentType"></BindAccount>
          <Notificationt v-if="'notification'=== currentType"></Notificationt>
        </Card>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import Info from './info'
import Safety from './safety'
import BindAccount from './bind-account'
import Notificationt from './notificationt'
export default {
  name: 'setting-account',
  components: {
    Info,
    Safety,
    BindAccount,
    Notificationt
  },
  data() {
    return {
      currentType: 'info'
    }
  },
  methods: {
    handleChangeCell(type) {
      this.currentType = type
    }
  }
}
</script>

<style>
</style>
