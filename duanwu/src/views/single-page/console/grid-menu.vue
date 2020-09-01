<template>
  <Row class="dashboard-console-grid" :gutter="24">
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false">
        <a href>
          <Icon type="md-people" color="#69c0ff"></Icon>
          <p>用户</p>
        </a>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false">
        <a href>
          <Icon type="md-podium" color="#95de64"></Icon>
          <p>分析</p>
        </a>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false">
        <a href>
          <Icon type="md-cart" color="#ff9c6e"></Icon>
          <p>商品</p>
        </a>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false">
        <a href>
          <Icon type="md-clipboard" color="#b37feb"></Icon>
          <p>订单</p>
        </a>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false">
        <a href>
          <Icon type="md-card" color="#ffd666"></Icon>
          <p>票据</p>
        </a>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false">
        <a href>
          <Icon type="md-mail" color="#5cdbd3"></Icon>
          <p>消息</p>
        </a>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false">
        <a href>
          <Icon type="md-pricetags" color="#ff85c0"></Icon>
          <p>标签</p>
        </a>
      </Card>
    </i-Col>
    <i-Col class="ivu-mb" v-bind="grid">
      <Card :bordered="false">
        <a href>
          <Icon type="md-switch" color="#ffc069"></Icon>
          <p>配置</p>
        </a>
      </Card>
    </i-Col>
  </Row>
</template>

<script>
export default {
  data() {
    return {
      grid: {
          xl: 3,
          lg: 4,
          md: 8,
          sm: 8,
          xs: 8
      }
    }
  }
}
</script>

<style lang="scss">
.dashboard-console-grid {
  text-align: center;
  .ivu-card-body {
    padding: 0;
  }
  i {
    font-size: 32px;
  }
  a {
    display: block;
    color: inherit;
    padding: 16px;
  }
  p {
    margin-top: 8px;
  }
}
</style>
