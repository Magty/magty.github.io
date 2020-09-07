<template>
  <Result type="success" title="操作成功" desc="预计两小时内到账">
    <div slot="extra">
      <Form ref="form" :label-width="labelWidth" :label-position="labelPosition">
        <FormItem label="付款账户：">{{infoData.payAccount}}</FormItem>
        <FormItem label="收款账户：">{{infoData.gatheringAccount}}</FormItem>
        <FormItem label="收款人姓名：">{{infoData.gatheringName}}</FormItem>
        <FormItem label="转账金额：">
          <strong>
            <Icon type="logo-usd"></Icon>
            {{infoData.price}}
          </strong>
        </FormItem>
      </Form>
    </div>
    <div slot="actions">
      <Button @click="handleAgain" type="primary">再转一笔</Button>
      <Button>查看账单</Button>
    </div>
  </Result>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  props: {
    infoData: Object
  },
  methods: {
    handleAgain() {
      this.$emit('on-prev-step')
    }
  }
}
</script>

<style>
</style>
