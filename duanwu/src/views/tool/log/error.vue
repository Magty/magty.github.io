<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="捕获错误信息" hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <Alert show-icon>
        用法说明
        <template #desc>
          <p v-font="14">打开浏览器控制台，点击按钮，会触发一个错误，系统会自动记录。可在右上角点击"日志"按钮查看。</p>
        </template>
      </Alert>
      <Button @click="handleNewError" type="error" size="large">触发一个错误</Button>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'tool-log-error',
  methods: {
    handleNewError: function() {
      // eslint-disable-next-line no-undef
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
</style>
