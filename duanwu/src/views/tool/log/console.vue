<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="控制台日志" content="使用内置 $log 插件，可以在控制台打印各种日志" hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <Alert show-icon>
        用法说明
        <template #desc>
          <p v-font="14">打开控制台，点击不同的按，可显示不同的日志打印效果。</p>
        </template>
      </Alert>
      <Divider>胶囊型</Divider>
      <Button
        @click="handleCapsule('iView', 'default', 'default')"
        size="large"
        class="ivu-mr ivu-mb"
      >胶囊型（default）</Button>
      <Button
        @click="handleCapsule('iView', 'primary', 'primary')"
        type="primary"
        size="large"
        class="ivu-mr ivu-mb"
      >胶囊型（primary）</Button>
      <Button
        @click="handleCapsule('iView', 'success', 'success')"
        type="success"
        size="large"
        class="ivu-mr ivu-mb"
      >胶囊型（success）</Button>
      <Button
        @click="handleCapsule('iView', 'warning', 'warning')"
        type="warning"
        size="large"
        class="ivu-mr ivu-mb"
      >胶囊型（warning）</Button>
      <Button
        @click="handleCapsule('iView', 'error', 'error')"
        type="error"
        size="large"
        class="ivu-mr ivu-mb"
      >胶囊型（error）</Button>
      <Divider>普通型</Divider>
      <Button
        @click="handleConsole('default', 'default')"
        size="large"
        class="ivu-mr ivu-mb"
      >普通型（default）</Button>
      <Button
        @click="handleConsole('primary', 'primary')"
        type="primary"
        size="large"
        class="ivu-mr ivu-mb"
      >普通型（primary）</Button>
      <Button
        @click="handleConsole('success', 'success')"
        type="success"
        size="large"
        class="ivu-mr ivu-mb"
      >普通型（success）</Button>
      <Button
        @click="handleConsole('warning', 'warning')"
        type="warning"
        size="large"
        class="ivu-mr ivu-mb"
      >普通型（warning）</Button>
      <Button
        @click="handleConsole('error', 'error')"
        type="error"
        size="large"
        class="ivu-mr ivu-mb"
      >普通型（error）</Button>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'tool-log-console',
  methods: {
    handleCapsule: function(type, str, background) {
      this.$log.capsule(type, str, background)
    },
    handleConsole: function(type, str) {
      this.$log[type](str)
    }
  }
}
</script>

<style lang="scss">
</style>
