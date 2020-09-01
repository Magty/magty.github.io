<template>
  <div class="dashboard-monitor-sentiment">
    <Row v-height="80" type="flex" justify="center" align="middle">
      <i-Col :span="8">
        <span class="dashboard-monitor-sentiment-number">{{happy}}</span>
      </i-Col>
      <i-Col :span="8">
        <img :src="happySvg" />
        <p>正面评论</p>
      </i-Col>
      <i-Col :span="8">
        <span
          class="dashboard-monitor-sentiment-percent dashboard-monitor-sentiment-percent-up"
        >{{happyPercent}}%</span>
      </i-Col>
    </Row>
    <Divider size="small"></Divider>
    <Row v-height="80" type="flex" justify="center" align="middle">
      <i-Col :span="8">
        <span class="dashboard-monitor-sentiment-number">{{sad}}</span>
      </i-Col>
      <i-Col :span="8">
        <img :src="sadSvg" />
        <p>负面评论</p>
      </i-Col>
      <i-Col :span="8">
        <span
          class="dashboard-monitor-sentiment-percent dashboard-monitor-sentiment-percent-down"
        >{{sadPercent}}%</span>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import sadSvg from '@/assets/images/icon-sad.svg'
import happySvg from '@/assets/images/icon-happy.svg'
export default {
  data() {
    return {
      happy: 856,
      happyPercent: 82,
      sad: 69,
      sadPercent: 9,
      sadSvg,
      happySvg
    }
  }
}
</script>

<style lang="scss">
.dashboard-monitor-sentiment {
  text-align: center;
  img {
    height: 50px;
  }
  p {
    color: #808695;
    margin-top: 4px;
  }
  &-number {
    font-size: 24px;
  }
  &-percent {
    font-size: 20px;
    &-up {
      color: #19be6b;
    }
    &-down {
      color: #ed4014;
    }
  }
}
</style>
