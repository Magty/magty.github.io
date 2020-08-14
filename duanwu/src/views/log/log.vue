<template>
  <div class="i-table-no-border">
    <Card :bordered="false" dis-hover>
      <div slot="title">
        <Avatar v-color="'#2f54eb'" v-bg-color="'#f0f5ff'" icon="md-locate" size="small"></Avatar>
        <span class="ivu-pl-8">前端日志</span>
      </div>
      <div slot="extra">
        <Tooltip content="清空日志" placement="top">
          <Button type="text" @click="clean">
            <Icon type="md-trash" size="16"></Icon>
          </Button>
        </Tooltip>
      </div>
      <Table :columns="columns" :data="log">
        <template slot-scope="{ row }" slot="page">{{get(row,'meta.url')}}</template>
        <template slot-scope="{ row }" slot="type">
          <Tag v-if="'info' === row.type" color="blue">info</Tag>
          <Tag v-if="'success' === row.type" color="green">success</Tag>
          <Tag v-if="'warning' === row.type" color="orange">warning</Tag>
          <Tag v-if="'error' === row.type" color="red">error</Tag>
        </template>
        <template slot-scope="{ row }" slot="more">
          <Button type="primary" @click="handleMore(row)">查看</Button>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import lodash from 'lodash'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'log',
  data() {
    return {
      columns: [{
          title: '时间',
          key: 'time',
          width: 180
      }, {
          title: '信息',
          key: 'message',
          minWidth: 300
      }, {
          title: '触发页面',
          slot: 'page',
          minWidth: 300
      }, {
          title: '类型',
          width: 100,
          slot: 'type'
      }, {
          title: '详细信息',
          width: 100,
          slot: 'more'
      }]
    }
  },
  computed: {
    ...mapState('admin/log', ['log'])
  },
  methods: {
    ...mapMutations('admin/log', ['clean']),
    get: lodash.get,
    handleMore(e) {
      this.$Notice.info({
          title: '提示',
          desc: '请在浏览器控制台查看完整日志'
      })
      this.$log.capsule('iView Admin', '完整日志内容', 'primary')
      console.group('完整日志')
      console.log('message ', e.message)
      console.log('time: ', e.time)
      console.log('type: ', e.type)
      console.log('meta: ', e.meta)
      console.groupEnd()
    }
  }
}
</script>

<style>
</style>
