<template>
  <div class="ivu-exception">
    <div class="ivu-exception-img">
      <div class="ivu-exception-img-element" :style="{'background-image': 'url(' + imgPath + ')'}"></div>
    </div>
    <div class="ivu-exception-content">
      <h1>
        <slot name="title">{{titleText}}</slot>
      </h1>
      <div class="ivu-exception-content-desc">
        <slot name="desc">{{descText}}</slot>
      </div>
      <div class="ivu-exception-content-actions">
        <slot name="actions">
          <Button :to="redirect" type="primary" size="large">{{backText}}</Button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { oneOf } from '@/utils/tool'
import Cfg404 from '@/config/404'
export default {
  name: 'Exception',
  props: {
    type: {
      validator: value => oneOf(value, ['403', '404', '500', 403, 404, 500]),
      default: '404'
    },
    title: {
      type: String
    },
    desc: {
      type: String
    },
    img: {
      type: String
    },
    imgColor: {
      type: Boolean,
      default: false
    },
    backText: {
      type: String,
      default: '返回首页'
    },
    redirect: {
      type: String,
      default: '/'
    }
  },
  computed: {
    imgPath: function() {
      return this.img
        ? this.img
        : this.imgColor
        ? Cfg404[this.type].imgColor
        : Cfg404[this.type].img
    },
    titleText: function() {
      return this.title ? this.title : Cfg404[this.type].title
    },
    descText: function() {
      return this.desc ? this.desc : Cfg404[this.type].desc
    }
  }
}
</script>

<style>
</style>
