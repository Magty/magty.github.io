<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="捕获 Ajax 错误" hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <Alert show-icon>
        用法说明
        <template #desc>
          <p v-font="14">打开浏览器控制台，点击按钮，会请求一个无效的 URL，系统会自动记录。可在右上角点击"日志"按钮查看。</p>
        </template>
      </Alert>
      <Button @click="handleGet" type="error" size="large">请求错误的地址</Button>
    </Card>
  </div>
</template>

<script>
import axios from '@/api'
export default {
  name: 'tool-log-ajax',
  methods: {
    handleGet: function() {
      axios.request({
          url: '/invalid-url',
          method: 'get'
      })
    }
  }
}
</script>

<style lang="scss">
</style>
