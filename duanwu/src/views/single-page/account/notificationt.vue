<template>
  <div class="setting-account-notification">
    <h2>新消息通知</h2>
    <div class="ivu-mt ivu-pl ivu-pr">
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>陌生人私信</h4>
          <p>未关注的人向您发私信时的通知</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-switch :value="true">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </i-Col>
      </Row>
      <Divider></Divider>
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>邀请/评论消息</h4>
          <p>有人对我发出邀请时，我会收到消息通知</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-switch :value="false">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </i-Col>
      </Row>
      <Divider></Divider>
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>赞同/赞赏消息设置</h4>
          <p>有人对我赞同或赞赏时，我会收到消息通知</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-switch :value="true">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </i-Col>
      </Row>
      <Divider></Divider>
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>邮件设置</h4>
          <p>重要事件发生时，我将会收到邮件提醒</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-switch :value="true">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
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
.setting-account-notification .ivu-col p {
  margin-top: 8px;
  color: #808695;
}
</style>
