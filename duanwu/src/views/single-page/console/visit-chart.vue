<template>
  <Row :gutter="24">
    <i-Col v-bind="grid">
      <h4>访问量趋势</h4>
      <div v-height="240" ref="visitChart"></div>
    </i-Col>
    <i-Col v-bind="grid1">
      <h4>访问量排行</h4>
      <div v-height="240">
        <ul>
          <li v-for="n in 7" :key="n">
            <Row type="flex" justify="center" align="middle">
              <i-Col :span="14">
                <Avatar
                  v-color="n < 4 ? '#1890ff' : '#8c8c8c'"
                  v-bg-color="n < 4 ? '#e6f7ff' : '#f5f5f5'"
                  class="ivu-mr-8"
                  size="small"
                >{{n}}</Avatar>
                <span>东直门{{n}} 号</span>
              </i-Col>
              <i-Col class="ivu-text-right" :span="10">
                <Numeral value="456789" format="0,0"></Numeral>
              </i-Col>
            </Row>
          </li>
        </ul>
      </div>
    </i-Col>
  </Row>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      grid: {
        xl: 16,
        lg: 12,
        md: 24,
        sm: 24,
        xs: 24
      },
      grid1: {
        xl: 8,
        lg: 12,
        md: 24,
        sm: 24,
        xs: 24
      }
    }
  },
  methods: {
    handleSetVisitChart() {
      this.visitChart = echarts.init(this.$refs.visitChart)
      this.visitChart.setOption({
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#D7DDE4'
            }
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#D7DDE4'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#7F8B9C'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#F5F7F9'
            }
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#7F8B9C'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#F5F7F9'
            }
          },
          type: 'value'
        },
        series: [{
          data: [9728, 4578, 12768, 4982, 9665, 5489, 3288, 13422, 6753, 7463, 8162, 6545],
          type: 'bar',
          tooltip: !0,
          smooth: !0,
          symbol: 'none',
          itemStyle: {
            normal: {
              barBorderRadius: [3, 3, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#69cdff'
              }, {
                offset: 0.5,
                color: '#3eb3f7'
              }, {
                offset: 1,
                color: '#1495eb'
              }])
            }
          }
        }],
        color: ['#1495EB', '#00CC66', '#F9D249', '#ff9900', '#9860DF'],
        grid: {
          left: 16,
          right: 25,
          bottom: 5,
          top: 20,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        }
      })
    },
    handleResize() {
      this.visitChart.resize()
    }
  },
  mounted() {
    this.handleSetVisitChart()
  },
  beforeDestroy() {
    if (this.visitChart) {
      this.visitChart.dispose()
      this.visitChart = null
    }
  }
}
</script>

<style>
</style>
