<template>
  <div class="page-account">
    <div class="page-account-container page-account-container-result">
      <div class="page-account-top">
        <div class="page-account-top-logo">
          <img src="../../assets/images/login/logo.png" alt="logo" />
        </div>
        <div class="page-account-top-desc">端午安康</div>
      </div>
      <Result type="success" :title="title" :desc="desc">
        <template v-slot:actions>
          <Button size="large" type="primary" to="https://mail.qq.com" target="_blank">查看邮箱</Button>
          <Button size="large" to="/">返回首页</Button>
        </template>
      </Result>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import copyright from '_c/copyright'
export default {
  components: {
    copyright
  },
  data() {
    return {
      title: '你的账户：admin 注册成功',
      desc: '激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。'
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
    &-result {
      width: 100%;
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
}
</style>
