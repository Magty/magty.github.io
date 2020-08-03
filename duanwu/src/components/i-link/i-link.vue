<template>
  <a
    @keyup.ctrl="handleClickItem(true)"
    @keyup.meta="handleClickItem(true)"
    @click="handleClickItem(false)"
    :href="linkUrl"
    :target="target"
    class="i-link"
    :class="{ 'i-link-color': !linkColor }"
  >
    <slot></slot>
  </a>
</template>

<script>
import mixin from '@/mixins/link'
export default {
  name: 'i-link',
  mixins: [mixin],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    linkColor: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickItem: function(event) {
      if (arguments.length > 1 && !this.disabled) {
        this.handleCheckClick(event, arguments[1])
      }
    }
  }
}
</script>

<style></style>
