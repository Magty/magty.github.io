<template>
  <div>
    <div v-height="200">
      <UserGender></UserGender>
    </div>
    <div v-height="210">
      <div class="dashboard-console-user-preference"></div>
    </div>
  </div>
</template>

<script>
import UserGender from './user-gender'
export default {
  components: {
    UserGender
  }
}
</script>

<style lang="scss">
.dashboard-console-user-preference {
  height: 100%;
  background-image: url(../../../assets/images/user-preference.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
}
</style>
