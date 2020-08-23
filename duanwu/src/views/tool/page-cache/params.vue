<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="带参路由缓存" content="同一个页面，不同参数，会进行不同的缓存" hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <h4 class="ivu-mb">输入一些内容后，切换到其它页面，再返回到该页面，输入的内容仍然保留，说明该页面被缓存了</h4>
      <h4>当前页面参数：{{id}}</h4>
      <Input v-model="data.value" size="large" placeholder="输入内容..." />
    </Card>
  </div>
</template>

<script>
export default {
  name: 'tool-page-cache-params',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      datas: [],
      data: {
        value: ''
      }
    }
  },
  methods: {
    switchData(key) {
      let value = this.datas[key]
      if (!value) {
        value = {
          value: ''
        }
        this.datas[key] = value
      }
      this.data = value
    }
  },
  watch: {
    $route: {
      handler: function(val) {
        const id = val.params.id
        if (id) {
          this.switchData(id)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
</style>
