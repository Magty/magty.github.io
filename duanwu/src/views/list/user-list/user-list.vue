<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="用户列表" content="包含用户信息的列表，带有常规操作。" hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <div v-if="loading" style="position:relative;height:100px">
        <Spin fix size="large"></Spin>
      </div>
      <List item-layout="vertical">
        <ListItem v-for="(item,index) in data" :key="index">
          <ListItemMeta>
            <i-link slot="avatar" :to="item.userLink" target="_blank">
              <Avatar :src="item.avatar"></Avatar>
            </i-link>
            <i-link slot="title" :to="item.title" target="_blank">{{item.name}}</i-link>
          </ListItemMeta>
          <div>
            <p>
              ID:{{item.id}}
              <Button @click="handleCopyId(index)" size="small" icon="md-copy">复制</Button>
            </p>
            <p>邮箱地址：{{item.mail}}</p>
          </div>
          <div class="ivu-mt-8">
            <Tag v-if="item.is_check" color="green">已验证邮箱</Tag>
            <Tag v-else color="red">未验证邮箱</Tag>
            <Tag v-if="1 === item.status" color="blue">普通用户</Tag>
            <Tag v-else-if="2 === item.status" color="purple">管理员</Tag>
            <Tag v-else-if="3 === item.status" color="volcano">运营人员</Tag>
            <Button @click="handleCollapse(index)" class="ivu-ml" size="small" icon="md-list">展开操作</Button>
          </div>
          <template v-if="item.is_collapse" slot="action">
            <li>
              <Poptip
                @on-ok="handleSetStatus(index,1)"
                confirm
                transfer
                :disabled="1 === item.status"
                title="确认将该用户设置为普通用户吗？"
              >
                <Button type="primary" :disabled="1 === item.status" size="small">普通用户</Button>
              </Poptip>
            </li>
            <li>
              <Poptip
                @on-ok="handleSetStatus(index,2)"
                confirm
                transfer
                :disabled="2 === item.status"
                title="确认将该用户设置为普通用户吗？"
              >
                <Button type="primary" :disabled="2 === item.status" size="small">管理员</Button>
              </Poptip>
            </li>
            <li>
              <Poptip
                @on-ok="handleSetStatus(index,3)"
                confirm
                transfer
                :disabled="3 === item.status"
                title="确认将该用户设置为运营人员吗？"
              >
                <Button type="primary" :disabled="3 === item.status" size="small">运营人员</Button>
              </Poptip>
            </li>
          </template>
        </ListItem>
        <div class="ivu-mt ivu-text-center" slot="footer">
          <Page :total="100" show-elevator show-sizer show-total :simple="isMobile"></Page>
        </div>
      </List>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const data = [
  {
    id: '123456700',
    name: 'Aresn',
    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
    userLink: 'https://dev.iviewui.com/user/1016955559255085056',
    mail: 'user@iview.design',
    status: 2,
    is_check: 1,
    is_collapse: 0
  }, {
    id: '123456701',
    name: '中小鱼',
    avatar: 'https://dev-file.iviewui.com/userinfoYLhfo1S945BOLuFT96NRStYeYDFRviF5/avatar',
    userLink: 'https://dev.iviewui.com/user/1023876335417823232',
    mail: 'user@iview.design',
    status: 1,
    is_check: 0,
    is_collapse: 0
  }, {
    id: '123456702',
    name: 'Echo',
    avatar: 'https://dev-file.iviewui.com/userinfoxlXwHVwZkCQtl1Zyd1wrvF78b1rZkhfK/avatar',
    userLink: 'https://dev.iviewui.com/user/1023207710763651072',
    mail: 'user@iview.design',
    status: 3,
    is_check: 1,
    is_collapse: 0
  }, {
    id: '123456703',
    name: '唐不苦',
    avatar: 'https://dev-file.iviewui.com/userinfosvaY5tb7yfnSFTTimcjy3vuSG6RC28v2/avatar',
    userLink: 'https://dev.iviewui.com/user/1024122983062573056',
    mail: 'user@iview.design',
    status: 1,
    is_check: 1,
    is_collapse: 0
  }, {
    id: '123456704',
    name: '甜筒',
    avatar: 'https://dev-file.iviewui.com/userinforaP8NeQgYpmKgkpWlqZP7rfewbHiIzJY/avatar',
    userLink: 'https://dev.iviewui.com/user/1020220337314467840',
    mail: 'user@iview.design',
    status: 1,
    is_check: 0,
    is_collapse: 0
  }, {
    id: '123456705',
    name: '冷月呆呆',
    avatar: 'https://dev-file.iviewui.com/userinfoQdhnYDF2VFOrQSTPR9963k8BbMjeqyTm/avatar',
    userLink: 'https://dev.iviewui.com/user/1023157012558647296',
    mail: 'user@iview.design',
    status: 1,
    is_check: 1,
    is_collapse: 0
  }
]
export default {
  name: 'list-user-list',
  data() {
    return {
      data: [],
      loading: false
    }
  },
  computed: {
    ...mapState('admin/layout', ['isMobile'])
  },
  methods: {
    getData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.data = data
      }, 1000)
    },
    handleCopyId(index) {
      const text = this.data[index].id
      this.$Copy({
        text
      })
    },
    handleCollapse(index) {
      this.data[index].is_collapse = !this.data[index].is_collapse
    },
    handleSetStatus(index, status) {
      this.data[index].status = status
      this.$Message.success('设置成功！')
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style>
</style>
