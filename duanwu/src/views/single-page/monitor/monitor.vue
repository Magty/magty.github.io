<template>
  <div v-resize="handleResize">
    <BaseInfo></BaseInfo>
    <Row :gutter="24">
      <i-Col class="ivu-mb" :xl="18" :lg="24" :md="24" :sm="24" :xs="24">
        <Card v-height="480" :bordered="false" dis-hover>
          <template #title>
            <div>
              <Avatar v-color="'#1890ff'" v-bg-color="'#e6f7ff'" icon="ios-pulse" size="small"></Avatar>
              <span class="ivu-pl-8">最近1小时访问情况</span>
            </div>
          </template>
          <VisitChart ref="visitChart"></VisitChart>
        </Card>
      </i-Col>
      <i-Col class="ivu-mb" :xl="6" :lg="24" :md="24" :sm="24" :xs="24">
        <Row :gutter="24">
          <i-Col class="ivu-mb" :xl="24" :lg="12" :md="12" :sm="12" :xs="24">
            <Card v-height="232" :bordered="false" dis-hover>
              <div slot="title">
                <Avatar v-color="'#fa8c16'" v-bg-color="'#fff7e6'" icon="md-bulb" size="small"></Avatar>
                <span class="ivu-pl-8">当前在线</span>
              </div>
              <VisitUser></VisitUser>
            </Card>
          </i-Col>
          <i-Col class="ivu-mb" :xl="24" :lg="12" :md="12" :sm="12" :xs="24">
            <Card v-height="232" :bordered="false" dis-hover>
              <div slot="title">
                <Avatar v-color="'#fa8c16'" v-bg-color="'#fff7e6'" icon="ios-cafe" size="small"></Avatar>
                <span class="ivu-pl-8">当前活跃度</span>
              </div>
              <VisitHot ref="visitHot"></VisitHot>
            </Card>
          </i-Col>
        </Row>
      </i-Col>
    </Row>
    <Row :gutter="24">
      <i-Col class="ivu-mb" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <Card v-height="300" :bordered="false" dis-hover>
          <div slot="title">
            <Avatar v-color="'#ffc53d'" v-bg-color="'#fffbe6'" icon="md-thumbs-up" size="small"></Avatar>
            <span class="ivu-pl-8">平均评价</span>
          </div>
          <AvgRate></AvgRate>
        </Card>
      </i-Col>
      <i-Col class="ivu-mb" :xl="6" :lg="12" :md="12" :sm="12" :xs="24">
        <Card v-height="300" :bordered="false" dis-hover>
          <div slot="title">
            <Avatar v-color="'#597ef7'" v-bg-color="'#f0f5ff'" icon="md-happy" size="small"></Avatar>
            <span class="ivu-pl-8">客户满意度</span>
          </div>
          <Sentiment></Sentiment>
        </Card>
      </i-Col>
      <i-Col class="ivu-mb" :xl="6" :lg="12" :md="12" :sm="12" :xs="24">
        <Card v-height="300" :bordered="false" dis-hover>
          <div slot="title">
            <Avatar v-color="'#ff4d4f'" v-bg-color="'#fff1f0'" icon="md-done-all" size="small"></Avatar>
            <span class="ivu-pl-8">本月目标</span>
          </div>
          <Goal></Goal>
        </Card>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import BaseInfo from './base-info'
import VisitChart from './visit-chart'
import VisitUser from './visit-user'
import VisitHot from './visit-hot'
import AvgRate from './avg-rate'
import Sentiment from './sentiment'
import Goal from './goal'
export default {
  name: 'dashboard-monitor',
  components: {
    BaseInfo,
    VisitChart,
    VisitUser,
    VisitHot,
    AvgRate,
    Sentiment,
    Goal
  },
  data() {
    return {}
  },
  methods: {
    handleResize() {
      this.$refs.visitChart.handleResize()
    }
  }
}
</script>

<style lang="scss">
.dashboard-monitor-avg-rate-number,
.dashboard-monitor-visit-hot ul li em,
.dashboard-monitor-visit-hot ul li span {
  display: inline-block;
  vertical-align: middle;
}
</style>
