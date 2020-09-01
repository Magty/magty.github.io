<template>
  <div class="setting-account-safety">
    <h2>安全设置</h2>
    <div class="ivu-mt ivu-pl ivu-pr">
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>账户密码</h4>
          <p>绑定手机和邮箱，并设置密码，帐号更安全</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-link link-color>修改</i-link>
        </i-Col>
      </Row>
      <Divider></Divider>
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>绑定手机</h4>
          <p>已绑定手机号：+86185****0000</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-link link-color>修改</i-link>
        </i-Col>
      </Row>
      <Divider></Divider>
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>密保问题</h4>
          <p>未设置密保问题，密保问题可有效保护账户安全</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-link link-color>设置</i-link>
        </i-Col>
      </Row>
      <Divider></Divider>
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>个性域名</h4>
          <p>已绑定域名：baidu.com</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-link link-color>修改</i-link>
        </i-Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.setting-account-safety .ivu-col p {
  margin-top: 8px;
  color: #808695;
}
</style>
