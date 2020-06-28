<template>
  <div class="page-account">
    <div class="page-account-header"></div>
    <div class="page-account-container">
      <div class="page-account-top">
        <div class="page-account-top-logo">
          <img src="../../assets/images/login/logo.png" alt="logo" />
        </div>
        <div class="page-account-top-desc">端午安康</div>
      </div>
      <div class="ivu-login">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" autocomplete="off">
          <div class="ivu-login-mail">
            <FormItem prop="mail">
              <i-Input type="email" size="large" v-model="formValidate.mail" placeholder="请输入邮箱">
                <Icon type="ios-mail-outline" slot="prepend"></Icon>
              </i-Input>
            </FormItem>
          </div>
          <Poptip placement="right" trigger="focus" word-wrap width="240">
            <div class="page-account-register-tip" slot="title">
              <div
                :class="
                  `page-account-register-tip-title page-account-register-tip-${level[pwdLevel].class}`
                "
              >{{ `强度：${level[pwdLevel].tips}` }}</div>
              <Progress
                :percent="pwdProgress"
                :stroke-width="6"
                :stroke-color="[`${level[pwdLevel].color}`]"
                hide-info
              ></Progress>
            </div>
            <div class="page-account-register-tip-desc" slot="content">请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
            <FormItem prop="password">
              <i-Input
                type="password"
                size="large"
                v-model="formValidate.password"
                placeholder="至少六位密码，区分大小写"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-Input>
            </FormItem>
          </Poptip>
          <div class="ivu-login-password">
            <FormItem prop="checkPassword">
              <i-Input
                type="password"
                size="large"
                clearable
                password
                v-model="formValidate.checkPassword"
                placeholder="确认密码"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-Input>
            </FormItem>
          </div>
          <div class="ivu-login-mobile">
            <FormItem prop="phone">
              <i-Input type="text" size="large" v-model="formValidate.phone" placeholder="请输入手机号码">
                <Icon type="ios-phone-portrait" slot="prepend"></Icon>
              </i-Input>
            </FormItem>
          </div>
          <div class="ivu-login-captcha">
            <FormItem prop="captcha">
              <Row style="margin:0 -4px;">
                <i-col span="16" style="padding:0 4px;">
                  <i-Input
                    type="text"
                    size="large"
                    v-model="formValidate.captcha"
                    placeholder="请输入验证码"
                  >
                    <Icon type="ios-apps-outline" slot="prepend"></Icon>
                  </i-Input>
                </i-col>
                <i-col span="8" style="padding:0 4px;">
                  <Button
                    size="large"
                    long
                    :disabled="isGetCaptcha"
                    @click="getCaptcha('formValidate')"
                  >{{ captchaText }}</Button>
                </i-col>
              </Row>
            </FormItem>
          </div>
          <div class="ivu-login-submit">
            <FormItem>
              <Button type="primary" size="large" long @click="handleSubmit('formValidate')">注册</Button>
            </FormItem>
          </div>
        </Form>
      </div>
      <div class="page-account-to-login">
        <router-link class="page-account-register" to="/login">使用已有账户登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { isPhone } from '@/utils/validate'
import { register } from '@/api/user'
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码！'))
      } else if (value.length < 6) {
        callback(new Error('密码不能少于6位！'))
      } else {
        if (this.formValidate.checkPassword !== '') {
          // 对第二个密码框单独验证
          this.$refs.formValidate.validateField('checkPassword')
        }
        callback()
      }
    }
    const validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (value !== this.formValidate.password) {
        callback(new Error('两次输入的密码不匹配！'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!isPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      level: [
        {
          tips: '太短',
          class: 'low',
          color: '#ed4014'
        },
        {
          tips: '中',
          class: 'medium',
          color: '#f90'
        },
        {
          tips: '强',
          class: 'strong',
          color: '#19be6b'
        }
      ],
      formValidate: {
        mail: '',
        password: '',
        checkPassword: '',
        phone: '',
        captcha: ''
      },
      ruleValidate: {
        mail: [
          {
            required: true,
            message: '请输入邮箱！',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '输入的邮箱格式不正确！',
            trigger: 'blur'
          }
        ],
        password: [
          /* {
            required: true,
            message: '请输入密码！',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码长度不少于六位！',
            trigger: 'blur'
          } */
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPassword: [{ validator: validateCheckPassword, trigger: 'blur' }],
        phone: [
          { required: true, trigger: 'blur', message: '请输入手机号码' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        captcha: [
          { required: true, trigger: 'blur', message: '请输入手机验证码' }
        ]
      },
      captchaText: '获取验证码',
      isGetCaptcha: false,
      getCaptchaTimer: null
    }
  },
  computed: {
    pwdLevel() {
      if (this.formValidate.password.length < 6) {
        return 0
      } else if (this.formValidate.password.length < 10) {
        return 1
      } else {
        return 2
      }
    },
    pwdProgress() {
      const len = this.formValidate.password.length
      return (100 * (len > 10 ? 10 : len)) / 10
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          // this.$Message.success('Success!')
          const param = {
            email: this.formValidate.mail,
            password: this.formValidate.password,
            phone: this.formValidate.phone,
            captcha: this.formValidate.captcha
          }
          await register(param)
        } else {
          // this.$Message.error('Fail!')
        }
      })
    },
    getCaptcha(name) {
      this.$refs[name].validateField('phone', errorMessage => {
        if (!errorMessage) {
          this.isGetCaptcha = true
          let countTime = 60
          this.getCaptchaTimer = setInterval(() => {
            if (countTime === 0) {
              this.captchaText = '获取验证码'
              this.isGetCaptcha = false
            } else {
              this.captchaText = `重新获取(${countTime}s)`
              countTime--
            }
          }, 1000)
        }
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.getCaptchaTimer)
    this.getCaptchaTimer = null
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
