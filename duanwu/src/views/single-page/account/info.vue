<template>
  <div>
    <h2>基本设置</h2>
    <Form ref="form" class="ivu-mt" :model="data" :rules="rules" label-position="top">
      <Row type="flex" :gutter="48">
        <i-Col v-bind="grid1">
          <FormItem label="头像" prop="avatar">
            <Avatar class="setting-account-info-avatar" :src="data.avatar" shape="square"></Avatar>
            <Upload class="ivu-mt ivu-mb" action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="md-camera">修改头像</Button>
            </Upload>
          </FormItem>
        </i-Col>
        <i-Col v-bind="grid2">
          <FormItem label="昵称" prop="name">
            <Input v-model="data.name" placeholder="请输入昵称" />
          </FormItem>
          <FormItem label="邮箱" prop="mail">
            <Input v-model="data.mail" placeholder="请输入邮箱" />
          </FormItem>
          <FormItem label="个人介绍" prop="desc">
            <Input
              type="textarea"
              maxlength="150"
              show-word-limit
              v-model="data.desc"
              placeholder="请输入个人介绍"
            />
          </FormItem>
          <FormItem label="公司" prop="company">
            <Input v-model="data.company" placeholder="请输入公司" />
          </FormItem>
          <FormItem label="居住地" prop="city">
            <City show-suffix v-model="data.city"></City>
          </FormItem>
          <FormItem>
            <Button @click="handleSubmit" type="primary">更新基本信息</Button>
          </FormItem>
        </i-Col>
      </Row>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid1: {
          xl: {
            span: 12,
            order: 2
          },
          lg: {
            span: 24,
            order: 1
          },
          md: {
            span: 24,
            order: 1
          },
          sm: {
            span: 24,
            order: 1
          },
          xs: {
            span: 24,
            order: 1
          }
        },
        grid2: {
          xl: {
            span: 12,
            order: 1
          },
          lg: {
            span: 24,
            order: 2
          },
          md: {
            span: 24,
            order: 2
          },
          sm: {
            span: 24,
            order: 2
          },
          xs: {
            span: 24,
            order: 2
          }
        },
        data: {
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          name: 'Aresn',
          mail: 'aresn@iview.design',
          desc: '',
          company: 'EVM',
          city: '110000'
        },
        rules: {
        name: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        mail: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          required: true,
          type: 'email',
          message: '请输入正确的邮箱',
          trigger: 'blur'
        }],
        desc: [{
          required: true,
          message: '请输入个人介绍',
          trigger: 'blur'
        }],
        company: [{
          required: true,
          message: '请输入公司',
          trigger: 'blur'
        }],
        city: [{
          required: true,
          message: '请选择居住地',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$Message.success('信息更新成功！')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.setting-account-info-avatar {
  width: 90px;
  height: 90px;
}
</style>
