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
      <AppTemplate :app-list="appList"></AppTemplate>
      <div v-if="loading" v-height="120" style="position:relative">
        <Spin size="large" fix></Spin>
      </div>
    </Card>
  </div>
</template>

<script>
import AppTemplate from './app-template'
import mixin from '../mixin'
const apps = [
  {
    title: 'iView',
    icon:
      'https://dev-file.iviewui.com/RZ8FQmZfHkcffMlTBCJllBFjEhEsObVo/avatar',
    time: new Date('2016-07-28 14:00:00'),
    link: 'https://www.iviewui.com/',
    owner: 'Aresn'
  },
  {
    title: 'iView Pro',
    icon:
      'https://dev-file.iviewui.com/WLXm7gp1EbLDtvVQgkeQeyq5OtDm00Jd/avatar',
    time: new Date('2019-02-01 14:00:00'),
    link: 'https://pro.iviewui.com/pro/',
    owner: '中小鱼'
  },
  {
    title: 'iView Admin Pro',
    icon:
      'https://dev-file.iviewui.com/4Z0QR2L0J1XStxBh99jVJ8qLfsGsOgjU/avatar',
    time: new Date('2019-03-01 14:00:00'),
    link: 'https://pro.iviewui.com/admin-pro/',
    owner: 'Echo'
  },
  {
    title: 'iView Developer',
    icon:
      'https://dev-file.iviewui.com/ttkIjNPlVDuv4lUTvRX8GIlM2QqSe0jg/avatar',
    time: new Date('2018-06-01 14:00:00'),
    link: 'https://dev.iviewui.com/',
    owner: '唐不苦'
  },
  {
    title: 'iView Run',
    icon:
      'https://dev-file.iviewui.com/fAenQ8nvRjL7x0i0jEfuDBZHvJfHf3v6/avatar',
    time: new Date('2018-07-01 14:00:00'),
    link: 'https://run.iviewui.com/',
    owner: '甜筒'
  },
  {
    title: 'iView Editor',
    icon:
      'https://dev-file.iviewui.com/LrCTN2j94lo9N7wEql7cBr1Ux4rHMvmZ/avatar',
    time: new Date('2018-07-05 14:00:00'),
    link: 'http://editor.iviewui.com/',
    owner: '冷月呆呆'
  },
  {
    title: 'iView Doc',
    icon:
      'https://dev-file.iviewui.com/yeKvhT20lMU0f1T3Y743UlGEOLLnZSnp/avatar',
    time: new Date('2016-08-01 14:00:00'),
    link: 'https://www.iviewui.com/',
    owner: 'ludd'
  },
  {
    title: 'iView Cli',
    icon:
      'https://dev-file.iviewui.com/CyrCNmTJfv7D6GFAg39bjT3eRkkRm5dI/avatar',
    time: new Date('2017-09-02 14:00:00'),
    link: 'https://iviewui.com/cli/',
    owner: '白灼菜心儿'
  }
]
export default {
  name: 'search-search-apps',
  mixins: [mixin],
  components: {
    AppTemplate
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
      tabActiveKey: 'apps',
      type: [],
      order: 'new',
      appList: [],
      loading: false
    }
  },
  methods: {
    getApp() {
      this.loading = true
      setTimeout(() => {
        this.appList = apps
        this.loading = false
      }, 1000)
    }
  },
  mounted() {
    this.getApp()
  }
}
</script>

<style lang="scss">
</style>
