<template>
  <div class="setting-account-account">
    <h2>账号绑定</h2>
    <div class="ivu-mt ivu-pl ivu-pr">
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>
            <Avatar size="small" :src="icon.wechat"></Avatar>
            <span>微信</span>
          </h4>
          <p>当前未绑定微信账号</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-link link-color>绑定</i-link>
        </i-Col>
      </Row>
      <Divider></Divider>
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>
            <Avatar size="small" :src="icon.weibo"></Avatar>
            <span>微博</span>
          </h4>
          <p>当前未绑定微博账号</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-link link-color>绑定</i-link>
        </i-Col>
      </Row>
      <Divider></Divider>
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>
            <Avatar size="small" :src="icon.facebook"></Avatar>
            <span>Facebook</span>
          </h4>
          <p>当前未绑定Facebook账号</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-link link-color>绑定</i-link>
        </i-Col>
      </Row>
      <Divider></Divider>
      <Row type="flex" justify="center" align="middle">
        <i-Col :span="22">
          <h4>
            <Avatar size="small" :src="icon.twitter"></Avatar>
            <span>Twitter</span>
          </h4>
          <p>当前未绑定Twitter账号</p>
        </i-Col>
        <i-Col class="ivu-text-right" :span="2">
          <i-link link-color>绑定</i-link>
        </i-Col>
      </Row>
    </div>
  </div>
</template>

<script>
import wechat from '@/assets/images/icon-social-wechat.svg'
import weibo from '@/assets/images/icon-social-weibo.svg'
import facebook from '@/assets/images/icon-social-facebook.svg'
import twitter from '@/assets/images/icon-social-twitter.svg'
export default {
  data() {
    return {
      icon: {
        wechat,
        weibo,
        facebook,
        twitter
      }
    }
  }
}
</script>

<style lang="scss">
.setting-account-account .ivu-col {
  h4 span {
    margin-right: 8px;
  }
  p {
    margin-top: 8px;
    color: #808695;
  }
}
</style>
