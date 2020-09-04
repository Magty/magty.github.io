<template>
  <div class="ivu-ellipsis">
    <slot name="prefix"></slot>
    <template v-if="computedReady">
      <Tooltip
        v-if="tooltip"
        :content="text"
        :theme="theme"
        :max-width="maxWidth"
        :placement="placement"
        :transfer="transfer"
      >
        <span ref="text" class="ivu-ellipsis-text">{{text}}</span>
        <span v-show="oversize" ref="more" class="ivu-ellipsis-more">
          <slot name="more"></slot>...
        </span>
        <slot name="suffix"></slot>
      </Tooltip>
      <template v-else>
        <span ref="text" class="ivu-ellipsis-text">{{text}}</span>
        <span v-show="oversize" ref="more" class="ivu-ellipsis-more">
          <slot name="more"></slot>...
        </span>
        <slot name="suffix"></slot>
      </template>
    </template>
    <div v-else class="ivu-ellipsis-hidden">
      <span ref="text" class="ivu-ellipsis-text">{{text}}</span>
      <span v-show="oversize" ref="more" class="ivu-ellipsis-more">
        <slot name="more"></slot>...
      </span>
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script>
import { oneOf, getStyle } from '@/utils/assist'
function getTextLength(text = '') {
  return text.split('').reduce((total, cur) => {
    const first = cur.charCodeAt(0)
    return first >= 0 && first <= 1128 ? total + 1 : total + 2
  })
}
function getMaxLengthStr(text = '', max) {
  var len = 0
  return text.split('').reduce((total, cur) => {
    const first = cur.charCodeAt(0)
    return (len += first >= 0 && first <= 128 ? 1 : 2) <= max ? total + cur : total
  })
}
export default {
  name: 'Ellipsis',
  props: {
    text: {
      type: String
    },
    height: {
      type: Number
    },
    lines: {
      type: Number
    },
    length: {
      type: Number
    },
    fullWidthRecognition: {
      type: Boolean,
      default: false
    },
    autoResize: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default: function() {
        return (
          !(!this.$IVIEWPRO || this.$IVIEWPRO.transfer === '') &&
          this.$IVIEWPRO.transfer
        )
      }
    },
    theme: {
      validator: function(value) { return oneOf(value, ['dark', 'light']) },
      default: 'dark'
    },
    maxWidth: {
      type: [String, Number],
      default: 250
    },
    placement: {
      validator: value =>
        oneOf(value, [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ]),
      default: 'bottom'
    }
  },
  data() {
    return {
      oversize: false,
      computedReady: false,
      computedText: ''
    }
  },
  watch: {
    disabled: function() {
      this.init()
    },
    text: function() {
      this.init()
    },
    height: function() {
      this.init()
    }
  },
  mounted: function() {
    this.init()
  },
  methods: {
    init: function() {
      if (!this.disabled) {
        this.computeText()
        this.limitShow()
      }
    },
    computeText: function() {
      this.oversize = false
      this.computedReady = false
      this.$nextTick(() => {
        const $text = this.$refs.text
        const el = this.$el
        const more = this.$refs.more
        let maxLen = 1000
        let text = this.text
        let height = this.height
        if (!height && this.lines) {
          height = parseInt(getStyle(el, 'lineHeight'), 10) * this.lines
          if (this.length) {
            let length = text.length
            if (this.fullWidthRecognition) {
              length = getTextLength(text)
            }
            if (length > this.length) {
              this.oversize = true
              more.style.display = 'inline-block'
              text = this.fullWidthRecognition ? getMaxLengthStr(text, this.length) : text.splice(0, this.length)
            }
          } else if (el.offsetHeight > height ) {
            for (this.oversize = true, more.style.disply = 'inline-block'; el.offsetHeight > height && maxLen > 0;) {
              if (el.offsetHeight > 3 * height) {
                text = text.substring(0, Math.floor(text.length / 2))
                $text.innerText = text
              } else {
                text = text.substring(0, text.length - 1)
                $text.innerText = text
              }
              maxLen--
            }
          }
        }
        this.computedText = text
      })
    },
    limitShow: function() {
      this.computedReady = true
      this.$nextTick(() => {
        if (this.$refs.text) {
          this.$refs.text.innerText = this.computedText
          if (this.$el.offsetHeight > this.height) {
            this.$emit('on-hide')
          } else {
            this.$emit('on-show')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.ivu-ellipsis-hidden {
  visibility: hidden;
}
</style>
