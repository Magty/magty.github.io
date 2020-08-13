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
          <div class="ivu-login-username">
            <FormItem prop="username">
              <i-Input
                size="large"
                type="text"
                v-model="formValidate.username"
                placeholder="请输入用户名"
              >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </i-Input>
            </FormItem>
          </div>
          <div class="ivu-login-password">
            <FormItem prop="password">
              <i-input
                size="large"
                type="password"
                password
                v-model="formValidate.password"
                placeholder="请输入密码"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-input>
            </FormItem>
          </div>
          <div class="page-account-auto-login">
            <FormItem>
              <Checkbox label="自动登录">自动登录</Checkbox>
              <router-link to>忘记密码</router-link>
            </FormItem>
          </div>
          <div class="ivu-login-submit">
            <FormItem>
              <Button type="primary" size="large" long @click="handleSubmit('formValidate')">登录</Button>
            </FormItem>
          </div>
        </Form>
      </div>
      <div class="page-account-other">
        <span>其它登录方式</span>
        <img v-for="(item, index) in otherLogin" :key="index" :src="item.icon" :alt="item.name" />
        <router-link class="page-account-register" :to="{name: 'register'}">注册账户</router-link>
      </div>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import copyright from '_c/copyright'
import { mapActions } from 'vuex'
import { homeName } from '@/config/settings'

export default {
  name: 'loginPage',
  components: {
    copyright
  },
  data() {
    return {
      autoLogin: true,
      otherLogin: [
        {
          name: 'wechat',
          icon: require('../../assets/images/login/icon-social-wechat.svg')
        },
        {
          name: 'qq',
          icon: require('../../assets/images/login/icon-social-qq.svg')
        },
        {
          name: 'weibo',
          icon: require('../../assets/images/login/icon-social-weibo.svg')
        }
      ],
      formValidate: {
        username: 'admin',
        password: '123123'
      },
      ruleValidate: {
        user: [
          {
            required: true,
            message: '请输入用户名！',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码！',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码长度不少于六位！',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions('admin/account', ['login']),
    async handleSubmit(name) {
      /* this.$router.push({
        name: homeName
      }) */
      try {
        await this.login({
          username: this.formValidate.username,
          password: this.formValidate.password
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
      /* this.login({
        username: this.formValidate.username,
        password: this.formValidate.password
      })
        .then(() => {
          this.$router.replace(this.$route.query.redirect || '/')
        })
        .catch(() => {
          this.$Message.error('登录失败！')
        }) */
      /* this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success('Success!')
          this.login({
            userName: this.formValidate.userName,
            password: this.formValidate.password
          })
            .then(() => {
              this.$router.push({
                name: homeName
              });
            })
            .catch(() => {
              this.$Message.error("登录失败！");
            });
        } else {
          // this.$Message.error('Fail!')
        }
      }); */
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
