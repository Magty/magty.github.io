<template>
  <div class="ivu-footer-toolbar">
    <div v-if="extra" class="ivu-footer-toolbar-left">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterToolbar',
  props: {
    extra: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.ivu-footer-toolbar {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 9;
  width: 100%;
  height: 56px;
  padding: 0 24px;
  line-height: 56px;
  background: #fff;
  border-top: 1px solid #e8eaec;
  -webkit-box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  &:after {
    display: block;
    clear: both;
    content: '';
  }
  &-left {
    float: left;
  }
  &-right {
    float: right;
  }
  button + button {
    margin-left: 8px;
  }
}
</style>
