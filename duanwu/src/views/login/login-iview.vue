<template>
  <div class="page-account">
    <div v-if="showI18n" class="page-account-header">
      <I18n></I18n>
    </div>
    <div class="page-account-container">
      <div class="page-account-top">
        <div class="page-account-top-logo">
          <img src="../../assets/images/login/logo.png" alt="logo" />
        </div>
        <div class="page-account-top-desc">端午安康</div>
      </div>
      <Login ref="form" @on-submit="handleSubmit">
        <UserName name="username" value="admin"></UserName>
        <Password name="password" value="123123" enter-to-submit></Password>
        <div class="page-account-auto-login">
          <Checkbox size="large" v-model="autoLogin">{{$t("page.login.remember")}}</Checkbox>
          <a href>{{$t("page.login.forgot")}}</a>
        </div>
        <Submit>{{$t("page.login.submit")}}</Submit>
      </Login>
      <div class="page-account-other">
        <span>{{$t('page.login.other')}}</span>
        <img :src="wechat" alt="wechat" />
        <img :src="qq" alt="qq" />
        <img :src="weibo" alt="weibo" />
        <router-link
          class="page-account-register"
          :to="{name:'register'}"
        >{{$t("page.login.signup")}}</router-link>
      </div>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import wechat from '@/assets/images/login/icon-social-wechat.svg'
import qq from '@/assets/images/login/icon-social-qq.svg'
import weibo from '@/assets/images/login/icon-social-weibo.svg'
import { homeName } from '@/config/settings'
import copyright from '_c/copyright'

import mixin from './mixin'

import { mapActions } from 'vuex'

export default {
  components: {
    copyright
  },
  mixins: [mixin],
  data() {
    return {
      wechat,
      qq,
      weibo,
      autoLogin: true
    }
  },
  methods: {
    ...mapActions('admin/account', ['login']),
    async handleSubmit(valid, { username, password }) {
      if (valid) {
        try {
        await this.login({
          username,
          password
        })
        if (this.$route.query.redirect) {
          this.$router.replace({ path: this.$route.query.redirect })
        } else {
          this.$router.push({ name: homeName, replace: true })
        }
      } catch (err) {
        console.log(err)
        this.$Message.error('登录失败！')
      }
      }
    }
  }
}
</script>

<style lang="scss" scop>
body {
  background-color: #f7f7f7;
  font-size: 14px;
}
.page-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  @media (min-width: 768px) {
    background-image: url(../../assets/images/body.svg);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }
  &-header {
    text-align: right;
    position: fixed;
    top: 16px;
    right: 24px;
  }
  &-container {
    flex: 1;
    padding: 32px 0;
    text-align: center;
    width: 384px;
    margin: 0 auto;
    @media (min-width: 768px) {
      padding: 32px 0 24px 0;
    }
    /* .ivu-login{
      &-username{

      }
    } */
  }
  &-auto-login {
    margin-bottom: 24px;
    text-align: left;
    a {
      float: right;
    }
  }
  &-top {
    padding: 32px 0;
    &-logo {
      img {
        height: 75px;
      }
    }
    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }
  &-other {
    margin: 24px 0;
    text-align: left;
    span {
      font-size: 14px;
    }
    img {
      width: 24px;
      margin-left: 16px;
      cursor: pointer;
      vertical-align: middle;
      opacity: 0.7;
      transition: all 0.2s ease-in-out;
      &:hover {
        opacity: 1;
      }
    }
  }
  &-register {
    float: right;
  }
}
</style>
