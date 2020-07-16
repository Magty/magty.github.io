<template>
  <i-link to="/" class="i-layout-header-logo" :class="{'i-layout-header-logo-stick': !isMobile}">
    <img v-if="isMobile" :src="minLogo" />
    <img v-else-if="'light' === headerTheme" :src="logo" />
    <img v-else :src="darkLogo" />
  </i-link>
</template>

<script>
import { mapState } from 'vuex'
import logo from '@/assets/logo.png'
import darkLogo from '@/assets/logo-dark.png'
import minLogo from '@/assets/logo-small.png'
export default {
  name: 'headerLogo',
  data() {
    return {
      logo,
      darkLogo,
      minLogo
    }
  },
  computed: {
    ...mapState('admin/layout', ['isMobile', 'headerTheme'])
  }
}
</script>

<style>
</style>
