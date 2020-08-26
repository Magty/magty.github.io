<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader hidden-breadcrumb>
        <template #title>
          <div>出差审批编号：100000</div>
        </template>
        <template #content>
          <div>
            <DescriptionList :col="2">
              <Description term="申请人：">Magty</Description>
              <Description term="审批人：">Boss</Description>
              <Description term="出差事由：">签订合同</Description>
              <Description term="合同编号：">100000</Description>
              <Description term="出差时间：">2020-08-25 - 2020-08-30</Description>
            </DescriptionList>
          </div>
        </template>
        <template #extra>
          <div class="ivu-text-left">
            <DescriptionList :col="2" layout="vertical">
              <Description>
                <div v-color="'#808695'">状态</div>
                <div v-font="20">待审批</div>
              </Description>
              <Description>
                <div v-color="'#808695'">紧急程度</div>
                <Tag color="red">紧急</Tag>
              </Description>
            </DescriptionList>
          </div>
        </template>
      </PageHeader>
    </div>
    <Card class="ivu-mt" title="审核流程" :border="false" dis-hover>
      <Steps :current="1">
        <Step title="申请" content="申请人：Magty"></Step>
        <Step title="Leader 审批" content="审批人：Boss"></Step>
        <Step title="财务审批" content="审批人：Echo"></Step>
      </Steps>
    </Card>
    <Card class="ivu-mt" title="基本信息" :bordered="false" dis-hover>
      <DescriptionList>
        <Description term="申请人：">Magty</Description>
        <Description term="审批人：">Boss</Description>
        <Description term="出差事由：">签订合同</Description>
        <Description term="合同编号：">10000</Description>
        <Description term="出差时间：">2020-08-25 - 2020-08-30</Description>
        <Description term="紧急程度：">
          <Tag color="red">紧急</Tag>
        </Description>
      </DescriptionList>
    </Card>
    <Card class="ivu-mt" title="行程信息" :bordered="false" dis-hover>
      <DescriptionList>
        <Description term="出发城市：">上海市</Description>
        <Description term="出发时间：">2020-08-25</Description>
        <Description term="返程时间：">2020-08-30</Description>
        <Description term="交通方式：">飞机</Description>
        <Description term="航班号：">QW321</Description>
      </DescriptionList>
    </Card>
    <Card class="ivu-mt i-table-no-border" title="同行人员" :bordered="false" dis-hover>
      <Table :data="tableData" :columns="columns">
        <template slot-scope="{ row }" slot="department">{{departments[row.department]}}</template>
      </Table>
    </Card>
    <Card class="ivu-mt i-table-no-border" :bordered="false" dis-hover>
      <Tabs @on-click="handleChangeData" value="action1">
        <TabPane label="操作日志一" name="action1"></TabPane>
        <TabPane label="操作日志二" name="action2"></TabPane>
        <TabPane label="操作日志三" name="action3"></TabPane>
      </Tabs>
      <Table :columns="actionColumns" :data="actionData">
        <template slot-scope="{ row }" slot="result">
          <Badge v-if="row.result" status="success" text="成功"></Badge>
          <Badge v-else status="error" text="驳回"></Badge>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'profile-advanced',
  data() {
    return {
      columns: [{
          title: '姓名',
          key: 'name'
      }, {
          title: '工号',
          key: 'id'
      }, {
          title: '所属部门',
          slot: 'department'
      }],
      tableData: [{
          name: 'Aresn',
          id: '001',
          department: 'dev'
      }, {
          name: '中小鱼',
          id: '002',
          department: 'design'
      }, {
          name: '唐不苦',
          id: '003',
          department: 'pm'
      }],
      departments: {
          dev: '研发部',
          design: '设计部',
          pm: '产品部'
      },
      actionColumns: [{
          title: '操作类型',
          key: 'type',
          minWidth: 120
      }, {
          title: '操作人',
          key: 'user',
          minWidth: 120
      }, {
          title: '执行结果',
          slot: 'result',
          minWidth: 120
      }, {
          title: '操作时间',
          key: 'time',
          minWidth: 120
      }, {
          title: '备注',
          key: 'remark',
          minWidth: 120
      }],
      actionData: []
    }
  },
  methods: {
    handleChangeData(action) {
      console.log(action)
      const appRoves = [{
          type: '提交订单',
          user: 'Aresn',
          result: 1,
          time: '2019-07-28 09:41:00',
          remark: '-'
      }, {
          type: 'Leader 初审',
          user: '中小鱼',
          result: 0,
          time: '2019-07-28 09:41:00',
          remark: '不予通过'
      }, {
          type: '财务审核',
          user: '唐不苦',
          result: 1,
          time: '2019-07-28 09:41:00',
          remark: '通过'
      }, {
          type: '提交订单',
          user: '甜筒',
          result: 1,
          time: '2019-07-28 09:41:00',
          remark: '-'
      }]
      const appRoves1 = [{
          type: 'Leader 初审',
          user: '中小鱼',
          result: 0,
          time: '2019-07-28 09:41:00',
          remark: '不予通过'
      }]
      const appRoves2 = [{
          type: '财务审核',
          user: '唐不苦',
          result: 1,
          time: '2019-07-28 09:41:00',
          remark: '通过'
      }]
      if (action === 'action1') {
        this.actionData = appRoves
      } else if (action === 'action2') {
        this.actionData = appRoves1
      } else if (action === 'action3') {
        this.actionData = appRoves2
      }
    }
  },
  mounted () {
    this.handleChangeData('action1')
  }
}
</script>

<style lang="scss">
.ivu-text-left {
  text-align: left;
}
</style>
