export default {
  methods: {
    tTitle: function (title) {
      return title && title.indexOf('$t:') === 0 ? this.$t(title.split('$t:')[1]) : title
    }
  }
}
