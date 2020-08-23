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
      <Table :row-class-name="rowClassName" :columns="columns" :data="log" stripe>
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
// import { oneOf } from '@/utils/assist'
export default {
  name: 'log',
  data() {
    // console.log(this.logTypes)
    return {
      logLabels: { error: '错误', warning: '警告', others: '其他' }
    }
  },
  computed: {
    ...mapState('admin/log', ['log']),
    logTypes() {
      return this.log.length > 0
        ? [...new Set(this.log.map((item) => item.type))]
        : []
    },
    columns() {
      return [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '时间',
          key: 'time',
          width: 180,
          align: 'center',
          sortable: true
        },
        {
          title: '信息',
          key: 'message',
          minWidth: 280,
          align: 'center'
        },
        {
          title: '触发页面',
          slot: 'page',
          minWidth: 280,
          align: 'center'
        },
        {
          title: '类型',
          width: 100,
          slot: 'type',
          align: 'center',
          // filters: [],
          // filters: [{ label: '错误', value: 'error' }, { label: '警告', value: 'warning' }, { label: '其他', value: 'others' }],
          /* filters: Object.keys(this.logLabels).map(value => {
            console.log(value)
            return { label: this.logLabels[value], value }
          }), */
          filters: this.logTypes.map(value => {
              // if (this.logLabels && this.logLabels[value]) {
              //   return { label: this.logLabels[value], value }
              // } else {
              //   return { label: value, value }
              // }
              return { label: value, value }
            }),
          filterMethod(value, row) {
            // console.log(row)
            // const type = oneOf(row.type, this.logLabels.keys()) ? row.type : 'others'
            return row.type.indexOf(value) > -1
          }
        },
        {
          title: '详细信息',
          width: 100,
          slot: 'more',
          align: 'center'
        }
      ]
    }
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
    },
    rowClassName(row, index) {
      if (row.type === 'error') {
        return 'log-table-error-row'
      } else if (row.type === 'warning') {
        return 'log-table-warning-row'
      }
    }
  }
}
</script>

<style lang="scss" scop>
.ivu-table .log-table-warning-row td {
  color: #f60;
}
.ivu-table .log-table-error-row td {
  color: red;
}
</style>
