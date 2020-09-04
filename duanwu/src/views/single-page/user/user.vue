<template>
  <div>
    <Row :gutter="24">
      <i-Col class="ivu-mb" :xl="7" :lg="7" :md="24" :sm="24" :xs="24">
        <Card :bordered="false" dis-hover>
          <div class="ivu-text-center">
            <Avatar class="setting-user-avatar" :src="user.avatar"></Avatar>
            <p class="ivu-m-8">
              <strong v-font="20">{{user.name}}</strong>
            </p>
            <p>{{user.sign}}</p>
          </div>
          <DescriptionList class="ivu-mt" :col="1">
            <Description>
              <Icon class="ivu-mr-8" slot="term" type="ios-briefcase-outline"></Icon>
              <span>前端工程师</span>
            </Description>
            <Description>
              <Icon class="ivu-mr-8" slot="term" type="ios-git-network"></Icon>
              <span>中台-数据平台团队-前端创新团队-前端架构和平台工具团队</span>
            </Description>
            <Description>
              <Icon class="ivu-mr-8" slot="term" type="ios-pin-outline"></Icon>
              <span>北京市</span>
            </Description>
          </DescriptionList>
          <div>
            <Row class="ivu-text-center" type="flex" justify="center" align="middle">
              <i-Col :span="6">
                <Tooltip placement="top" content="微博">
                  <a href="https://weibo.com" target="_blank">
                    <Avatar :src="icon.weibo"></Avatar>
                  </a>
                </Tooltip>
              </i-Col>
              <i-Col :span="6">
                <Tooltip placement="top" content="知乎">
                  <a href="https://www.zhihu.com" target="_blank">
                    <Avatar :src="icon.zhihu"></Avatar>
                  </a>
                </Tooltip>
              </i-Col>
              <i-Col :span="6">
                <Tooltip placement="top" content="Facebook">
                  <a href="https://www.facebook.com" target="_blank">
                    <Avatar :src="icon.facebook"></Avatar>
                  </a>
                </Tooltip>
              </i-Col>
              <i-Col :span="6">
                <Tooltip placement="top" content="Twitter">
                  <a href="https://twitter.com" target="_blank">
                    <Avatar :src="icon.twitter"></Avatar>
                  </a>
                </Tooltip>
              </i-Col>
            </Row>
          </div>
          <Divider dashed></Divider>
          <DescriptionList title="标签"></DescriptionList>
          <div>
            <Tag v-for="item in user.tags" :key="item">{{item}}</Tag>
            <Input
              v-if="addIcon"
              v-model="newIcon"
              @on-enter="handleAddNewTag"
              @on-blur="addIcon = false"
              ref="tag"
              size="small"
              autofocus
              v-width="100"
            />
            <Button v-else @click="handleOpenNewTag" size="small" type="dashed" icon="md-add"></Button>
          </div>
        </Card>
      </i-Col>
      <i-Col :xl="17" :lg="17" :md="24" :sm="24" :xs="24">
        <Card :bordered="false" dis-hover :padding="0">
          <div class="ivu-pt-8">
            <Tabs v-model="currentTab">
              <TabPane label="文章（5）" name="article"></TabPane>
              <TabPane label="项目（8）" name="project"></TabPane>
              <TabPane label="应用（8）" name="app"></TabPane>
            </Tabs>
          </div>
          <div class="ivu-pl ivu-pr ivu-pb">
            <articleTemplate v-if="'article' === currentTab" :article-list="articleList" hide-cover></articleTemplate>
            <projectTemplate
              v-if="'project' === currentTab"
              :project-list="projectList"
              bordered
              compact
            ></projectTemplate>
            <appTemplate v-if="'app' === currentTab" :app-list="appList" bordered compact></appTemplate>
          </div>
        </Card>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import weibo from '@/assets/images/icon-social-weibo.svg'
import zhihu from '@/assets/images/icon-social-zhihu.svg'
import facebook from '@/assets/images/icon-social-facebook.svg'
import twitter from '@/assets/images/icon-social-twitter.svg'
import articleList from './articleList'
import projectList from './projectList'
import appList from './appList'
import articleTemplate from './article-list'
import projectTemplate from './project-list'
import appTemplate from './app-list'
export default {
  name: 'setting-user',
  components: {
    articleTemplate,
    projectTemplate,
    appTemplate
  },
  data() {
    return {
        user: {
        name: 'Aresn',
        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        sign: '做30年众生马牛才能60年诸佛龙象',
        tags: ['大神', '最强王者', '落地成盒', '很有想法', '懂点设计', '菜烧的不错']
      },
      icon: {
        weibo,
        zhihu,
        facebook,
        twitter
      },
      addIcon: false,
      newIcon: '',
      currentTab: 'article',
      articleList,
      projectList,
      appList
    }
  },
  methods: {
    handleOpenNewTag() {
      this.addIcon = true
      this.$nextTick(() => {
        this.$refs.tag.focus()
      })
    },
    handleAddNewTag() {
      if (this.newIcon) {
        this.user.tags.push(this.newIcon)
        this.newIcon = ''
        this.addIcon = false
      }
    }
  }
}
</script>

<style lang="scss">
.setting-user-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
}
</style>
