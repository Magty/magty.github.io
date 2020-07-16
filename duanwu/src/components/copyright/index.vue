<template>
  <GlobalFooter class="i-copyright" :links="links" :copyright="copyright"></GlobalFooter>
</template>

<script>
import GlobalFooter from './global-footer'
export default {
  name: 'copyright',
  components: {
    GlobalFooter
  },
  data() {
    return {
      links: [
        {
          title: '掘金首页',
          key: '掘金',
          href: '',
          blankTarget: true
        },
        {
          title: 'segmentFault',
          key: '思否',
          href: '',
          blankTarget: true
        },
        {
          title: 'gitHub首页',
          key: 'gitHub',
          href: '',
          blankTarget: true
        }
      ],
      copyright: 'copyright © 2020 Magty'
    }
  }
}
</script>

<style>
</style>
