<template>
  <div class="dashboard-monitor-visit-hot">
    <Row type="flex" justify="center" align="middle">
      <i-Col :span="15">
        <i-circle :percent="active" :size="120" stroke-color="#2fc25b" trail-color="#f6ffed">
          <i-circle :percent="keep" :size="95" stroke-color="#1890ff" trail-color="#e6f7ff">
            <i-circle :percent="out" :size="70" stroke-color="#f04864" trail-color="#fff1f0"></i-circle>
          </i-circle>
        </i-circle>
      </i-Col>
      <i-Col :span="9">
        <ul>
          <li>
            <em v-bg-color="'#2fc25b'"></em>
            <span>活跃率：{{active}}%</span>
          </li>
          <li>
            <em v-bg-color="'#1890ff'"></em>
            <span>留存率：{{keep}}%</span>
          </li>
          <li>
            <em v-bg-color="'#f04864'"></em>
            <span>跳出率：{{out}}%</span>
          </li>
        </ul>
      </i-Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 70,
      keep: 60,
      out: 35
    }
  }
}
</script>

<style lang="scss">
.dashboard-monitor-visit-hot {
  position: relative;
  top: 10px;
  text-align: center;
  ul li {
    list-style-type: none;
    font-size: 12px;
    em {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
}
</style>
