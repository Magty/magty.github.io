<template>
  <footer class="ivu-global-footer">
    <div v-if="links.length || $slots.links" class="ivu-global-footer-links">
      <a
        v-for="item in links"
        :key="item.key"
        :href="item.href"
        :target="item.blankTarget ? '_blank' : '_self'"
        :title="item.title"
      >
        <Icon v-if="item.icon" :type="item.icon"></Icon>
        <Icon v-else-if="item.customIcon" :custom="item.customIcon"></Icon>
        {{ _s(item.title)}}
      </a>
    </div>
    <div v-if="copyright && $slots.copyright" class="ivu-global-footer-copyright">{{ copyright }}</div>
  </footer>
</template>

<script>
export default {
  name: 'GlobalFooter',
  props: {
    links: {
      type: Array,
      default: () => []
    },
    copyright: String
  }
}
</script>

<style>
</style>
