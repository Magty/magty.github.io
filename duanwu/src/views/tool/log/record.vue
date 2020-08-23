<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="记录日志内容" hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <Alert show-icon>
        用法说明
        <template #desc>
          <p v-font="14">输入要记录的内容，点击记录按钮后，系统会记录日志内容。可在右上角点击"日志"按钮查看。</p>
        </template>
      </Alert>
      <Input v-model="value" v-width="200" size="large" placeholder="输入日志内容..." />
      <Button @click="handleRecord" class="ivu-ml" :disabled="!value" type="primary" size="large">记录</Button>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'tool-log-record',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    handleRecord: function() {
      this.$log.push(this.value)
    }
  }
}
</script>

<style lang="scss">
</style>
