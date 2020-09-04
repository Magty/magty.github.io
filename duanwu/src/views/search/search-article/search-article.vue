<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader
        @on-tab-change="handleChangeTab"
        title="搜索列表（文章）"
        hidden-breadcrumb
        :tab-list="tabList"
        :tab-active-key="tabActiveKey"
      >
        <div slot="content" class="ivu-mt ivu-mb" style="max-width:500px;margin:0 auto">
          <Input search size="large" enter-button="搜索" placeholder="Enter something..." />
        </div>
      </PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <Form>
        <FormItem label="分类：">
          <TagSelect expandable v-model="type">
            <TagSelectOption
              v-for="item in tagselects"
              :key="item.name"
              :name="item.name"
            >{{item.text}}</TagSelectOption>
          </TagSelect>
        </FormItem>
        <Divider dashed></Divider>
        <FormItem label="作者">
          <Select v-width="240" multiple v-model="auth">
            <Option value="Magty">Magty</Option>
            <Option value="中小鱼">中小鱼</Option>
            <Option value="Echo">Echo</Option>
            <Option value="甜筒">甜筒</Option>
          </Select>
        </FormItem>
        <Divider dashed></Divider>
        <FormItem label="排序">
          <RadioGroup v-model="order">
            <Radio label="new">最新发表</Radio>
            <Radio label="hot">最多收藏</Radio>
            <Radio label="click">最多阅读</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Card>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <ArticleTemplate :article-list="articleList"></ArticleTemplate>
      <div v-if="loading" v-height="120" style="position:relative">
        <Spin size="large" fix></Spin>
      </div>
      <div class="ivu-text-center ivu-mt">
        <Button @click="getArticle" :loading="loading" v-width="200">{{loading ? '加载中...' : '加载更多'}}</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import ArticleTemplate from './article-template'
import mixin from '../mixin'
const articles = [
  {
    title: '写给 iView 开发者的一封信',
    desc:
      '你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。',
    cover: 'https://dev-file.iviewui.com/xM14LMsynHq844vHLXuqx7VkO47hX9dO',
    link: 'https://dev.iviewui.com/articles/1019242066909204480',
    collect: 120,
    like: 288,
    comment: 62,
    time: '2018-07-17T15:27:00.000Z',
    auth: {
      name: 'Aresn',
      avatar:
        'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'
    },
    tag: ['iView', 'Vue.js', 'Webpack']
  },
  {
    title: 'Vue Seo 页面优化之 Nuxt 服务器渲染',
    desc:
      'Vue Seo 服务器渲染的坑 Nuxt，分享一下我从创建到部署远程服务器的相关经验。',
    cover: 'https://dev-file.iviewui.com/WzOVTozHP4VZoHt7pkSFcLg0R4VcYR96',
    link: 'https://dev.iviewui.com/articles/1032579816609681408',
    collect: 20,
    like: 15,
    comment: 1,
    time: '2018-08-23T10:46:27.000Z',
    auth: {
      name: '唐不苦',
      avatar:
        'https://dev-file.iviewui.com/userinfosvaY5tb7yfnSFTTimcjy3vuSG6RC28v2/avatar'
    },
    tag: ['iView', 'Vue.js', 'Webpack']
  },
  {
    title: '二次封装 axios，根据参数来实现多个请求多次拦截',
    desc: '',
    cover: 'https://dev-file.iviewui.com/h2v5OPIMsbpQJ0wUqHRHOKnYZjRY54UR',
    link: 'https://dev.iviewui.com/articles/1031444597349421056',
    collect: 16,
    like: 54,
    comment: 18,
    time: '2018-08-20T07:35:29.000Z',
    auth: {
      name: 'hi修修',
      avatar: 'https://dev-file.iviewui.com/avatar_default/avatar'
    },
    tag: ['iView', 'Vue.js', 'Webpack']
  },
  {
    title: '相同特性组件的一种优化思路',
    desc:
      '本文介绍了面对大量特性相同组件的代码组织问题的一种思路，主要应用了以下知识点：require.context、render函数以及functional组件。',
    cover: 'https://dev-file.iviewui.com/tHlcBUZOSQXSTksmvhC8LXYiRDtgbbGF',
    link: 'https://dev.iviewui.com/articles/1026690304465571840',
    collect: 68,
    like: 146,
    comment: 5,
    time: '2018-08-07T04:43:38.000Z',
    auth: {
      name: 'Jagger',
      avatar:
        'https://dev-file.iviewui.com/userinfo9nQqzFLYS77QEe5n0itU2IcBQOumiFDA/avatar'
    },
    tag: ['iView', 'Vue.js', 'Webpack']
  },
  {
    title: '脱离 Table 组件的 Render 苦海',
    desc:
      '在具体开发过程中，有些使用变扭的地方（和iview无关），比如 Table 组件的自定义列实现复杂，可展开 Table 不想单独建一个 vue 文件等。 在项目开发过程中发现的小技巧分享给大家，可提高代码编写效率与可维护性。',
    cover: 'https://dev-file.iviewui.com/LsiCfUdZ6EvQhR3gmHCQ2HwYGmiCQVtI',
    link: 'https://dev.iviewui.com/articles/1024639493791158272',
    collect: 135,
    like: 289,
    comment: 122,
    time: '2018-08-01T12:54:26.000Z',
    auth: {
      name: 'NB阿卡',
      avatar:
        'https://dev-file.iviewui.com/userinfoKukTjtAiIvUw6to7xFKeHIycrwV7rzhO/avatar'
    },
    tag: ['iView', 'Vue.js', 'Webpack']
  }
]
export default {
  name: 'search-search-article',
  mixins: [mixin],
  components: {
    ArticleTemplate
  },
  data() {
    return {
      tagselects: [
        { name: 'type1', text: '类别一' },
        { name: 'type2', text: '类别二' },
        { name: 'type3', text: '类别三' },
        { name: 'type4', text: '类别四' },
        { name: 'type5', text: '类别五' },
        { name: 'type6', text: '类别六' },
        { name: 'type7', text: '类别七' },
        { name: 'type8', text: '类别八' },
        { name: 'type9', text: '类别九' },
        { name: 'type10', text: '类别十' },
        { name: 'type11', text: '类别十一' },
        { name: 'type12', text: '类别十二' },
        { name: 'type13', text: '类别十三' },
        { name: 'type14', text: '类别十四' },
        { name: 'type15', text: '类别十五' },
        { name: 'type16', text: '类别十六' }
      ],
      tabActiveKey: 'article',
      type: [],
      auth: ['Magty', 'Echo'],
      order: 'new',
      articleList: [],
      loading: false
    }
  },
  methods: {
    getArticle() {
      this.loading = true
      setTimeout(() => {
        this.articleList = this.articleList.concat(articles)
        this.loading = false
      }, 1000)
    }
  },
  mounted() {
    this.getArticle()
  }
}
</script>

<style>
</style>
