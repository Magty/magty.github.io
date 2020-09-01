<template>
  <Row :gutter="24">
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false" dis-hover :padding="12">
        <p slot="title">
          <span>访问量</span>
        </p>
        <Tag slot="extra" color="green">日</Tag>
        <div>
          <Numeral v-font="30" value="25848" fromat="0.0"></Numeral>
          <div v-height="42" class="ivu-pt-8">
            <span v-display="'inline-block'" class="ivu-mr">
              日同比
              <Trend flag="up">12.5%</Trend>
            </span>
            <span v-display="'inline-block'" class="ivu-mr">
              周同比
              <Trend flag="down">5%</Trend>
            </span>
          </div>
          <Divider style="margin:8px 0"></Divider>
          <div>
            <Row>
              <i-Col class="ivu-text-right" :span="12">280 万</i-Col>
            </Row>
          </div>
        </div>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false" dis-hover :padding="12">
        <p slot="title">
          <span>销售额</span>
        </p>
        <Tag slot="extra" color="blue">月</Tag>
        <div>
          <Numeral v-font="30" value="12000" fromat="0,0" prefix="￥"></Numeral>
          <div v-height="42" class="ivu-pt-8">
            <Tooltip style="width:100%" content="60% 已达标">
              <Progress :percent="60" hide-info></Progress>
            </Tooltip>
          </div>
          <Divider style="margin:8px 0"></Divider>
          <div>
            <Row>
              <i-Col :span="12">总销售额</i-Col>
              <i-Col :span="12" class="ivu-text-right">68 万</i-Col>
            </Row>
          </div>
        </div>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false" dis-hover :padding="12">
        <p slot="title">
          <span>订单量</span>
        </p>
        <Tag slot="extra" color="red">周</Tag>
        <div>
          <Numeral v-font="30" value="1680" fromat="0,0"></Numeral>
          <div ref="orderChart" v-height="42" class="ivu-pt-8"></div>
          <Divider style="margin:8px 0"></Divider>
          <div>
            <Row>
              <i-Col :span="12">转化率</i-Col>
              <i-Col :span="12" class="ivu-text-right">60%</i-Col>
            </Row>
          </div>
        </div>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false" dis-hover :padding="12">
        <p slot="title">
          <span>新增用户</span>
        </p>
        <Tooltip slot="extra" placement="top" content="指标说明">
          <Icon type="ios-help-circle-outline"></Icon>
        </Tooltip>
        <div>
          <Numeral v-font="30" value="128" fromat="0,0">
            <span v-font="24" slot="suffix">位</span>
          </Numeral>
          <div v-height="42" class="ivu-pt-8">
            <AvatarList size="small" :list="avatarList" :max="7" :excess-style="excessStyle"></AvatarList>
          </div>
          <Divider style="margin:8px 0"></Divider>
          <div>
            <Row>
              <i-Col :span="12">总用户</i-Col>
              <i-Col :span="12" class="ivu-text-right">10800 人</i-Col>
            </Row>
          </div>
        </div>
      </Card>
    </i-Col>
  </Row>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      grid: {
        xl: 6,
        lg: 12,
        md: 12,
        sm: 12,
        xs: 24
      },
      excessStyle: {
        color: '#f56a00',
        backgroundColor: '#fde3cf'
      },
      avatarList: [{
        src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
        tip: '史蒂夫·乔布斯'
      }, {
        src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
        tip: '斯蒂夫·沃兹尼亚克'
      }, {
        src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
        tip: '乔纳森·伊夫'
      }, {
        src: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
        tip: '蒂姆·库克'
      }, {
        src: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
        tip: '比尔·费尔南德斯'
      }, {
        src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
        tip: '史蒂夫·乔布斯'
      }, {
        src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
        tip: '斯蒂夫·沃兹尼亚克'
      }, {
        src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
        tip: '乔纳森·伊夫'
      }, {
        src: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
        tip: '蒂姆·库克'
      }, {
        src: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
        tip: '比尔·费尔南德斯'
      }]
    }
  },
  methods: {
    handleSetOrderChart() {
      this.orderChart = echarts.init(this.$refs.orderChart)
      this.orderChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          show: !1
        },
        yAxis: {
          type: 'value',
          show: !1
        },
        series: [{
          data: [10, 300, 150, 450, 70, 210, 130],
          type: 'line',
          tooltip: !0,
          smooth: !0,
          symbol: 'none',
          areaStyle: {
            normal: {
                opacity: 0.3
            }
          }
        }],
        color: '#00CC66',
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: -60,
          right: -20,
          bottom: -20,
          top: 4,
          containLabel: !0
        }
      })
    },
    handleResize() {
      this.orderChart && this.orderChart.resize()
    }
  },
  mounted() {
    this.handleSetOrderChart()
  },
  beforeDestroy() {
    if (this.orderChart) {
      this.orderChart.dispose()
      this.orderChart = null
    }
  }
}
</script>

<style>
</style>
