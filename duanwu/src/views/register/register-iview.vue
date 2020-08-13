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
        <Email name="email"></Email>
        <Poptip trigger="focus" placement="right" width="240">
          <Password
            @on-change="handleChangePassword"
            name="password"
            :rules="passwordRule"
            placeholder="至少6位密码，区分大小写"
          ></Password>
          <div class="page-account-register-tip" slot="content">
            <div
              :class="['page-account-register-tip-title',passwordTip.class]"
            >{{`强度：${passwordTip.strong}`}}</div>
            <Progress
              :percent="passwordTip.percent"
              hide-info
              :stroke-width="6"
              :stroke-color="passwordTip.color"
            ></Progress>
            <div class="page-account-register-tip-desc">请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
          </div>
        </Poptip>
        <Password name="passwordConfirm" :rules="passwordConfirmRule" placeholder="确认密码"></Password>
        <Mobile name="mobile"></Mobile>
        <Captcha
          @on-get-captcha="handleGetCaptcha"
          name="captcha"
          :field="['mobile']"
          enter-to-submit
        ></Captcha>
        <Submit>{{$t('page.register.submit')}}</Submit>
      </Login>
      <div class="page-account-to-login">
        <router-link
          class="page-account-register"
          :to="{name:'login'}"
        >{{$t('page.register.other')}}</router-link>
      </div>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import mixin from '../login/mixin'
import copyright from '_c/copyright'
export default {
  mixins: [mixin],
  components: {
    copyright
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value !== this.$refs.form.formValidate.password) {
        callback(new Error('两次输入的密码不匹配！'))
      } else {
        callback()
      }
    }
    return {
      passwordRule: [{
        required: true,
        message: '密码不能为空！',
        trigger: 'change'
      },
      {
        min: 6,
        message: '密码不能少于6位！',
        trigger: 'change'
      }],
      passwordConfirmRule: [{
        required: true,
        message: '确认密码不能为空！',
        trigger: 'change'
      },
      {
        validator: validatePassword,
        trigger: 'change'
      }],
      passwordLen: 0
    }
  },
  computed: {
    passwordTip() {
      let strong = '强'
      let classSuffix = 'strong'
      const len = this.passwordLen > 10 ? 10 : this.passwordLen
      let color = '#19be6b'
      if (this.passwordLen < 6) {
        strong = '太短'
        classSuffix = 'low'
        color = '#ed4014'
      } else if (this.passwordLen < 10) {
        strong = '中'
        classSuffix = 'medium'
        color = '#ff9900'
      }
      return {
        strong,
        class: 'page-account-register-tip-'.concat(classSuffix),
        percent: 10 * len,
        color
      }
    }
  },
  methods: {
    ...mapActions('admin/account', ['register', 'login']),
    handleChangePassword(pwd) {
      this.passwordLen = pwd.length
    },
    async handleSubmit(valid, { mail, password, mobile, captcha }) {
      if (valid) {
        try {
          await this.register({
            mail, password, mobile, captcha
          })
          this.$router.replace({ name: 'register-result' })
        } catch (err) {
          this.$Message.error('注册失败！')
        }
      }
    },
    handleGetCaptcha() {

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
  .ivu-poptip {
    display: block;
    .ivu-poptip-rel {
      display: block;
    }
  }
  &-register-tip {
    text-align: left;
    &-title {
      font-size: 14px;
    }
    &-low {
      color: #ed4014;
    }
    &-medium {
      color: #f90;
    }
    &-strong {
      color: #19be6b;
    }
    &-desc {
      white-space: normal;
      font-size: 14px;
      margin-top: 6px;
    }
  }
  &-to-login {
    text-align: center;
    margin-top: 16px;
  }
}
</style>
