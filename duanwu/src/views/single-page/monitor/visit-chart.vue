<template>
  <div ref="visitChart" v-height="400"></div>
</template>

<script>
import echarts from 'echarts'
function formatDate(time) {
  const date = new Date(time)
  const h = ('0' + date.getHours()).substr(-2)
  const m = ('0' + date.getMinutes()).substr(-2)
  return ''.concat(h, ':').concat(m)
}
export default {
  data() {
    return {
      xData: [],
      y1Data: [],
      y2Data: []
    }
  },
  methods: {
    handleGetData() {
      const now = new Date().getTime()
      this.xData = [formatDate(now), formatDate(now - 3 * 100000),
        formatDate(now - 6 * 100000), formatDate(now - 9 * 100000),
        formatDate(now - 12 * 100000), formatDate(now - 15 * 100000),
        formatDate(now - 18 * 100000), formatDate(now - 21 * 100000),
        formatDate(now - 24 * 100000), formatDate(now - 27 * 100000), formatDate(now - 30 * 100000)]
      this.y1Data = [45, 169, 400, 285, 316, 148, 150, 234, 158, 100, 266]
      this.y2Data = [15, 39, 152, 94, 102, 86, 39, 38, 95, 30, 86]
    },
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
          data: this.xData,
          boundaryGap: false
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
        legend: {
          data: ['浏览量（PV）', '访客数（UV）'],
          x: 'right'
        },
        series: [{
          data: this.y1Data,
          name: '浏览量（PV）',
          type: 'line',
          tooltip: true,
          smooth: true,
          symbol: 'none',
          areaStyle: {
            normal: {
              opacity: 0.2
            }
          }
        }, {
          data: this.y2Data,
          name: '访客数（UV）',
          type: 'line',
          tooltip: true,
          smooth: true,
          symbol: 'none',
          areaStyle: {
            normal: {
              opacity: 0.2
            }
          }
        }],
        color: ['#1495EB', '#00CC66', '#F9D249', '#ff9900', '#9860DF'],
        grid: {
          left: 20,
          right: 20,
          bottom: 20,
          top: 40,
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
    this.handleGetData()
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
