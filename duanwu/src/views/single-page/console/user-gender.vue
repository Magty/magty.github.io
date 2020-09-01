<template>
  <div class="dashboard-console-user-gender">
    <Row type="flex" justify="center" align="middle">
      <i-Col :span="8" v-color="'#3399ff'" class="ivu-text-center">
        <Avatar v-color="'#3399ff'" v-bg-color="'#d6f0ff'" icon="ios-man" size="large"></Avatar>
        <div class="ivu-mt-8">男性 65%</div>
      </i-Col>
      <i-Col :span="8" v-color="'#be6be0'" class="ivu-text-center">
        <Avatar v-color="'#be6be0'" v-bg-color="'#fdf0ff'" icon="ios-woman" size="large"></Avatar>
        <div class="ivu-mt-8">女性 25%</div>
      </i-Col>
      <i-Col :span="8" v-color="'#babdc3'" class="ivu-text-center">
        <Avatar v-color="'#babdc3'" v-bg-color="'#e6edf5'" icon="ios-man" size="large"></Avatar>
        <div class="ivu-mt-8">未知 10%</div>
      </i-Col>
    </Row>
    <div class="dashboard-console-user-gender-grid ivu-mt-8">
      <Grid center square :col="25" padding="2px" :border="false">
        <GridItem v-for="i in 100" :key="i">
          <span v-bg-color="i<=65 ? '#3399ff' : i <= 90 ? '#be6be0' : '#babdc3'"></span>
        </GridItem>
      </Grid>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.dashboard-console-user-gender {
  &-grid {
    .ivu-grid-item-main {
      height: 100%;
    }
    span {
      display: block;
      height: 100%;
      border-radius: 2px;
      opacity: 0.75;
    }
  }
}
</style>
