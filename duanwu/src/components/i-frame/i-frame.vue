<template>
  <div class="i-frame">
    <iframe v-if="ready" :src="src" frameborder="0" class="i-frame-iframe"></iframe>
  </div>
</template>

<script>
const noMarginClass = 'i-layout-content-main-no-margin'
const hideCopyrightClass = 'i-copyright-hidden'
const contentFlexClass = 'i-layout-content-flex'
const mainFlexClass = 'i-layout-content-main-flex'
export default {
  name: 'i-frame',
  props: {
    src: {
      type: String,
      default: ''
    },
    margin: {
      type: Boolean,
      default: false
    },
    copyright: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ready: false,
      $content: null,
      $copyright: null,
      $layoutContent: null,
      $$layoutContentMain: null
    }
  },
  watch: {
    margin: {
      handler: function (event) {
        this.$nextTick(() => {
          if (this.$content) {
            event
              ? this.$content.classList.remove(noMarginClass)
              : this.$content.classList.add(noMarginClass)
          }
        })
      },
      immediate: true
    }
  },
  mounted: function () {
    this.$content = document.getElementsByClassName('i-layout-content-main')[0]
    this.$copyright = document.getElementsByClassName('i-copyright')[0]
    this.$copyright &&
      !this.copyright &&
      this.$copyright.classList.add(hideCopyrightClass)
    this.$layoutContent = document.getElementsByClassName('i-layout-content')[0]
    this.$layoutContent && this.$layoutContent.classList.add(contentFlexClass)
    this.$layoutContentMain = document.getElementsByClassName(
      'i-layout-content-main'
    )[0]
    this.$layoutContentMain &&
      this.$layoutContentMain.classList.add(mainFlexClass)
    this.$nextTick(function () {
      this.ready = true
    })
  },
  beforeDestroy: function () {
    this.$content && this.$content.classList.remove(noMarginClass)
    this.$copyright && this.$copyright.classList.remove(hideCopyrightClass)
    this.$layoutContent &&
      this.$layoutContent.classList.remove(contentFlexClass)
    this.$layoutContentMain &&
      this.$layoutContentMain.classList.remove(mainFlexClass)
    this.$content = null
    this.$copyright = null
    this.$layoutContent = null
    this.$layoutContentMain = null
  }
}
</script>

<style>
</style>
