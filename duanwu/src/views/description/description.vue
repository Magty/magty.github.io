<template>
  <div></div>
</template>

<script>
export default {
  name: 'Description',
  inject: ['DescriptionListInstance'],
  props: {
    term: {
      type: String
    }
  },
  computed: {
    styles: function() {
      let style = {}
      if (this.DescriptionListInstance.gutter !== 0) {
        style = {
          paddingLeft: this.DescriptionListInstance.gutter / 2 + 'px',
          paddingRight: this.DescriptionListInstance.gutter / 2 + 'px'
        }
      }
      return style
    }
  },
  render: h => {
    return (
      <i-col style={this.styles} {...this.DescriptionListInstance.col}>
        {this.$slots.term ? (
          <div class="ivu-description-term">
            <slot name="term"></slot>
          </div>
        ) : (
          <div class="ivu-description-term">{this.term}</div>
        )}
        <div class="ivu-description-detail">
          <slot></slot>
        </div>
      </i-col>
    )
  }
}
</script>

<style>
</style>
