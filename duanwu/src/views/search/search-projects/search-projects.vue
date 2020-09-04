<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader
        @on-tab-change="handleChangeTab"
        title="搜索列表（项目）"
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
        <FormItem label="排序">
          <RadioGroup v-model="order">
            <Radio label="new">最新创建</Radio>
            <Radio label="update">最后更新</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Card>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <ProjectTemplate :project-list="projectList"></ProjectTemplate>
      <div v-if="loading" v-height="120" style="position:relative">
        <Spin size="large" fix></Spin>
      </div>
      <div class="ivu-text-center ivu-mt">
        <Button @click="getProject" :loading="loading" v-width="200">{{loading ? '加载中...' : '加载更多'}}</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import ProjectTemplate from './project-template'
import mixin from '../mixin'
const projects = [
  {
    title: 'iView',
    desc: '一套基于 Vue.js 的企业级 UI 组件库，内含 50+ 常用基础组件',
    cover:
      'https://dev-file.iviewui.com/RZ8FQmZfHkcffMlTBCJllBFjEhEsObVo/middle',
    time: new Date('2016-07-28 14:00:00'),
    link: 'https://www.iviewui.com/'
  },
  {
    title: 'iView Pro',
    desc:
      '基于 iView 的高阶组件库，对 iView 基础组件的扩展，内含 30+ 业务及高阶组件',
    cover:
      'https://dev-file.iviewui.com/WLXm7gp1EbLDtvVQgkeQeyq5OtDm00Jd/middle',
    time: new Date('2019-02-01 14:00:00'),
    link: 'https://pro.iviewui.com/pro/'
  },
  {
    title: 'iView Admin Pro',
    desc:
      '基于 iView 的企业级中后台系统，内置 iView 及 iView Pro，功能强大，适用于各种中后台系统，高可配',
    cover:
      'https://dev-file.iviewui.com/4Z0QR2L0J1XStxBh99jVJ8qLfsGsOgjU/middle',
    time: new Date('2019-03-01 14:00:00'),
    link: 'https://pro.iviewui.com/admin-pro/'
  },
  {
    title: 'iView Developer',
    desc: 'iView 官方社区，关于 iView 你想知道的一切，都可以在这里向作者提问',
    cover:
      'https://dev-file.iviewui.com/ttkIjNPlVDuv4lUTvRX8GIlM2QqSe0jg/middle',
    time: new Date('2018-06-01 14:00:00'),
    link: 'https://dev.iviewui.com/'
  },
  {
    title: 'iView Run',
    desc:
      'iView 在线运行编辑器，内置了 iView 环境，直接在线编写 .vue 文件，实时运行',
    cover:
      'https://dev-file.iviewui.com/fAenQ8nvRjL7x0i0jEfuDBZHvJfHf3v6/middle',
    time: new Date('2018-07-01 14:00:00'),
    link: 'https://run.iviewui.com/'
  },
  {
    title: 'iView Editor',
    desc: '基于 iView 的 markdown 编辑器',
    cover:
      'https://dev-file.iviewui.com/LrCTN2j94lo9N7wEql7cBr1Ux4rHMvmZ/middle',
    time: new Date('2018-07-05 14:00:00'),
    link: 'http://editor.iviewui.com/'
  },
  {
    title: 'iView Doc',
    desc: 'iView 官方文档',
    cover:
      'https://dev-file.iviewui.com/yeKvhT20lMU0f1T3Y743UlGEOLLnZSnp/middle',
    time: new Date('2016-08-01 14:00:00'),
    link: 'https://www.iviewui.com/'
  },
  {
    title: 'iView Cli',
    desc: '基于 Electron 的 iView 项目快速构建工具',
    cover:
      'https://dev-file.iviewui.com/CyrCNmTJfv7D6GFAg39bjT3eRkkRm5dI/middle',
    time: new Date('2017-09-02 14:00:00'),
    link: 'https://iviewui.com/cli/'
  }
]
export default {
  name: 'search-search-projects',
  mixins: [mixin],
  components: {
    ProjectTemplate
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
      tabActiveKey: 'projects',
      type: [],
      order: 'new',
      projectList: [],
      loading: false
    }
  },
  methods: {
    getProject() {
      this.loading = true
      setTimeout(() => {
        this.projectList = this.projectList.concat(projects)
        this.loading = false
      }, 1000)
    }
  },
  mounted() {
    this.getProject()
  }
}
</script>

<style lang="scss">
.search-search-projects-item {
  &-cover {
    width: 100%;
    border-radius: 4px 4px 0 0;
  }
  &-desc {
    display: -webkit-box;
    height: 40px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &-extra {
    span {
      display: inline-block;
      color: #808695;
      vertical-align: middle;
    }
  }
}
</style>
