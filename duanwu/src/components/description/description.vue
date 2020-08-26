<script>
const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
}
export default {
  name: 'Description',
  inject: ['DescriptionListInstance'],
  props: {
    term: String
  },
  computed: {
    styles() {
      return this.DescriptionListInstance.gutter !== 0 ? {
        paddingLeft: this.DescriptionListInstance.gutter / 2 + 'px',
        paddingRight: this.DescriptionListInstance.gutter / 2 + 'px'
      } : {}
    }
  },
  render(h) {
    let term = null
    if (this.term || this.$slots.term) {
      term = this.$slots.term
        ? h('div', { attrs: { class: 'ivu-description-term' } }, this.$slots.term)
        : h('div', { attrs: { class: 'ivu-description-term' } }, this.term)
    }
    const detail = h('div', { attrs: { class: 'ivu-description-detail' } }, this.$slots.default)
    const content = term ? [term, detail] : [detail]
    return h('i-col', { props: responsive[this.DescriptionListInstance.col], style: this.styles }, content)
    /* return <i-col props={this.DescriptionListInstance.col} style={this.styles}>
    {this.term || this.$slots.term ? }
    </i-col> */
  }
}
</script>

<style>
</style>
