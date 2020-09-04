<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="查询表格" content="表格查询的复杂示例" hidden-breadcrumb></PageHeader>
    </div>
    <Card ref="card" class="list-table-list-card ivu-mt" :bordered="false" dis-hover>
      <table-form ref="form" @on-submit="getData" @on-reset="getData"></table-form>
      <table-list ref="table" @on-fullscreen="handleFullscreen"></table-list>
    </Card>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import TableForm from './table-form'
import TableList from './list'
export default {
  name: 'list-table-list',
  components: {
    TableForm,
    TableList
  },
  data() {
    return {}
  },
  methods: {
    getData() {
      this.$refs.table.getData()
    },
    handleFullscreen(isFull) {
      isFull ? screenfull.request(this.$refs.card.$el) : screenfull.exit()
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style>
</style>
