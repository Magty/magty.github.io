<template>
  <div>
    <Card :bordered="true" dis-hover>
      <div class="ivu-mt ivu-mb ivu-pt ivu-pb">
        <Result type="error" :title="title">
          <template slot="desc">
            <div>{{desc}}</div>
          </template>
          <template slot="extra" v-font="14">
            <div>您提交的内容有如下错误：</div>
            <div class="ivu-mt">
              <Icon type="ios-close-circle-outline" color="#ed4014"></Icon>您的账户已被冻结
              <a class="ivu-ml-16">
                立即解冻
                <Icon type="ios-arrow-forward"></Icon>
              </a>
            </div>
            <div class="ivu-mt">
              <Icon type="ios-close-circle-outline" color="#ed4014"></Icon>您的账户还不具备申请资格
              <a class="ivu-ml-16">
                立即升级
                <Icon type="ios-arrow-forward"></Icon>
              </a>
            </div>
          </template>
          <template slot="actions">
            <Button type="primary">返回修改</Button>
          </template>
        </Result>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'result-fail',
  data() {
    return {
      title: '提交失败',
      desc: '请核对并修改以下信息后，再重新提交。'
    }
  }
}
</script>

<style>
</style>
