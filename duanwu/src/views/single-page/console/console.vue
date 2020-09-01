<template>
  <div v-resize="handleResize">
    <BaseInfo ref="baseInfo"></BaseInfo>
    <GridMenu></GridMenu>
    <Card class="dashboard-console-visit" :bordered="false" dis-hover>
      <div slot="title">
        <Row type="flex" justify="center" align="middle">
          <i-Col :span="8">
            <Avatar v-color="'#1890ff'" v-bg-color="'#e6f7ff'" icon="ios-podium" size="small"></Avatar>
            <span class="ivu-pl-8">访问量</span>
          </i-Col>
          <i-Col :span="16" class="ivu-text-right">
            <RadioGroup
              @on-change="handleChangeVisitType"
              v-model="visitType"
              class="ivu-mr-8"
              type="button"
            >
              <Radio label="day">今日</Radio>
              <Radio label="month">本月</Radio>
              <Radio label="year">全年</Radio>
            </RadioGroup>
            <DatePicker
              v-model="visitDate"
              style="width:200px"
              type="daterange"
              placement="bottom-end"
              placeholder="Select date"
            ></DatePicker>
          </i-Col>
        </Row>
      </div>
      <div>
        <VisitChart ref="visitChart"></VisitChart>
      </div>
    </Card>
    <Row class="ivu-mt" :gutter="24">
      <i-Col class="ivu-mb" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <Card v-height="480" :bordered="false" dis-hover>
          <div slot="title">
            <Avatar v-color="'#722ed1'" v-bg-color="'#f9f0ff'" icon="ios-search" size="small"></Avatar>
            <span class="ivu-pl-8">热门搜索</span>
          </div>
          <div slot="extra">
            <Dropdown>
              <Icon type="md-more"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem>操作一</DropdownItem>
                <DropdownItem>操作二</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <HotSearch ref="hotSearch"></HotSearch>
        </Card>
      </i-Col>
      <i-Col class="ivu-mb" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <Card v-height="480" :bordered="false" dis-hover>
          <div slot="title">
            <Avatar v-color="'#faad14'" v-bg-color="'#fffbe6'" icon="ios-people" size="small"></Avatar>
            <span class="ivu-pl-8">用户画像</span>
          </div>
          <div slot="extra">
            <Tooltip placement="top" content="下载数据">
              <Icon type="ios-download-outline"></Icon>
            </Tooltip>
          </div>
          <UserPreference></UserPreference>
        </Card>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import BaseInfo from './base-info'
import VisitChart from './visit-chart'
import GridMenu from './grid-menu'
import HotSearch from './hot-search'
import UserPreference from './user-preference'
export default {
  name: 'dashboard-console',
  components: {
    BaseInfo,
    GridMenu,
    VisitChart,
    HotSearch,
    UserPreference
  },
  data() {
    return {
      visitType: 'day',
      visitDate: [new Date(), new Date()]
    }
  },
  methods: {
    handleChangeVisitType(value) {
      if (value === 'day') {
        this.visitDate = [new Date(), new Date()]
      } else if (value === 'month') {
        this.visitDate = [new Date() - 30 * 24 * 60 * 60 * 1000, new Date()]
      } else if (value === 'year') {
        this.visitDate = [new Date() - 365 * 24 * 60 * 60 * 1000, new Date()]
      }
    },
    handleResize() {
      this.$refs.baseInfo.handleResize()
      this.$refs.visitChart.handleResize()
      this.$refs.hotSearch.handleResize()
    }
  }
}
</script>

<style lang="scss">
.dashboard-console-visit {
  .ivu-radio-group-button .ivu-radio-wrapper {
    border: none !important;
    box-shadow: none !important;
    padding: 0 12px;
    &:before,
    &:after {
      display: none;
    }
  }
  ul li {
    list-style-type: none;
    margin-top: 12px;
  }
}
</style>
