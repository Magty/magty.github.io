<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="多语言" content hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <h4 class="ivu-mb">当前语言：{{locale}}</h4>
      <div>点击右上角的多语言切换按钮，尝试切换不同的语言，下面的内容会自动变化：</div>
      <div class="ivu-mt">1. {{$t('page.i18n.content')}}</div>
      <div class="ivu-mt">2. iView 组件内部也会自动切换多语言：</div>
      <Select style="width:200px" class="ivu-mt" v-model="value"></Select>
      <div class="ivu-mt">3. 菜单及系统内部</div>
      <Alert>当前在线预览只对 多语言 菜单做了配置，其它尚未配置。</Alert>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'i18n',
  computed: {
    ...mapState('admin/i18n', ['locale'])
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss">
.i-layout-page-header {
  margin: -24px -24px 0;
}
</style>
