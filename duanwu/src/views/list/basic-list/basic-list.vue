<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="基础列表" content="标准的列表，包含增删改查等基础操作。" hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <Row class="ivu-text-center" type="flex" justify="center" align="middle">
        <i-Col class="ivu-mt ivu-mb" :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
          <p>进行中的任务</p>
          <p v-font="24">10 个任务</p>
        </i-Col>
        <i-Col class="ivu-mt ivu-mb" :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
          <p>剩余任务</p>
          <p v-font="24">3 个任务</p>
        </i-Col>
        <i-Col class="ivu-mt ivu-mb" :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
          <p>任务总耗时</p>
          <p v-font="24">120 个小时</p>
        </i-Col>
      </Row>
    </Card>
    <Card class="ivu-mt" title="基础列表" :bordered="false" dis-hover>
      <div v-if="!isMobile" slot="extra">
        <RadioGroup type="button" v-model="type">
          <Radio label="all">全部</Radio>
          <Radio label="doing">进行中</Radio>
          <Radio label="done">已完成</Radio>
        </RadioGroup>
        <Input v-width="200" class="ivu-ml" search placeholder="请输入..." />
      </div>
      <div>
        <Button @click="handleAdd" long type="dashed" icon="md-add">添加</Button>
        <List class="ivu-mt" :loading="loading">
          <div v-if="loading" v-height="300"></div>
          <ListItem v-for="(item,index) in data" :key="item.project">
            <ListItemMeta :title="item.project" :description="item.desc">
              <Avatar slot="avatar" :src="item.icon" shape="square" size="large"></Avatar>
            </ListItemMeta>
            <div class="list-basic-list-content">
              <div class="list-basic-list-content-item">
                <span>负责人</span>
                <p>{{item.owner}}</p>
              </div>
              <div class="list-basic-list-content-item">
                <span>开始时间</span>
                <p>{{item.time | date_format('YYYY-MM-DD HH:mm:ss')}}</p>
              </div>
              <div v-width="180" class="list-basic-list-content-item">
                <Progress :percent="item.progress" :status="item.status" :stroke-width="6"></Progress>
              </div>
            </div>
            <template #action>
              <li>
                <Button @click="handleUpdate(index)" type="text">编辑</Button>
              </li>
              <li>
                <Dropdown @on-click="name => handleClickMore(name,index)">
                  <Button type="text">
                    更多
                    <Icon type="ios-arrow-down"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="update">编辑</DropdownItem>
                    <DropdownItem name="delete">删除</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </template>
          </ListItem>
        </List>
        <div class="ivu-mt ivu-text-right">
          <Page :total="100" show-elevator :simple="isMobile"></Page>
        </div>
      </div>
    </Card>
    <Modal @on-ok="handleSubmit" v-model="showUpdate" title="任务编辑" :loading="submitting">
      <Form ref="form" :model="newData" :rules="rules">
        <FormItem label="任务名称" prop="project">
          <Input v-model="newData.project" placeholder="请输入任务名称" />
        </FormItem>
        <FormItem label="开始时间" prop="time">
          <DatePicker v-model="newData.time" v-width="'100%'" type="datetime" placeholder="请选择开始时间"></DatePicker>
        </FormItem>
        <FormItem label="负责人" prop="owner">
          <Select placeholder="请选择负责人" v-model="newData.owner">
            <Option value="Asesn">Asesn</Option>
            <Option value="Magty">Magty</Option>
            <Option value="Echo">Echo</Option>
            <Option value="唐不苦">唐不苦</Option>
            <Option value="甜筒">甜筒</Option>
          </Select>
        </FormItem>
        <FormItem label="任务描述" prop="desc">
          <Input v-model="newData.desc" type="textarea" placeholder="请输入任务描述" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const data = [
  {
    project: 'iView',
    desc: '一套基于 Vue.js 的企业级 UI 组件库',
    icon: 'https://dev-file.iviewui.com/p50TGdvvpXWVR06Vu2TAwkpRnpt8FURA/avatar',
    owner: 'Aresn',
    time: new Date('2016-07-28 14:00:00'),
    progress: 90,
    status: 'active'
  }, {
    project: 'iView Pro',
    desc: '基于 iView 的高阶组件库',
    icon: 'https://dev-file.iviewui.com/WLXm7gp1EbLDtvVQgkeQeyq5OtDm00Jd/avatar',
    owner: '中小鱼',
    time: new Date('2019-02-01 14:00:00'),
    progress: 100
  }, {
    project: 'iView Admin Pro',
    desc: '基于 iView 的企业级中后台系统',
    icon: 'https://dev-file.iviewui.com/fAenQ8nvRjL7x0i0jEfuDBZHvJfHf3v6/avatar',
    owner: 'Echo',
    time: new Date('2019-03-01 14:00:00'),
    progress: 75
  }, {
    project: 'iView Developer',
    desc: 'iView 官方社区',
    icon: 'https://dev-file.iviewui.com/ttkIjNPlVDuv4lUTvRX8GIlM2QqSe0jg/avatar',
    owner: '唐不苦',
    time: new Date('2018-06-01 14:00:00'),
    progress: 75,
    status: 'active'
  }, {
    project: 'iView Run',
    desc: 'iView 在线运行编辑器',
    icon: 'https://dev-file.iviewui.com/4Z0QR2L0J1XStxBh99jVJ8qLfsGsOgjU/avatar',
    owner: '甜筒',
    time: new Date('2018-07-01 14:00:00'),
    progress: 75,
    status: 'wrong'
  }
]
const newd = {
  project: '',
  time: '',
  owner: '',
  desc: '',
  icon: 'https://dev-file.iviewui.com/p50TGdvvpXWVR06Vu2TAwkpRnpt8FURA/avatar',
  progress: 0,
  status: 'normal'
}
export default {
  name: 'list-basic-list',
  data() {
    return {
      type: 'all',
      data: [],
      loading: false,
      showUpdate: false,
      submitting: true,
      updateIndex: -1,
      newData: Object.assign({}, newd),
      rules: {
        project: [{
          required: true,
          message: '请输入任务名称',
          trigger: 'blur'
        }],
        time: [{
          required: true,
          type: 'date',
          message: '请选择开始时间',
          trigger: 'change'
        }],
        owner: [{
          required: true,
          message: '请选择负责人',
          trigger: 'change'
        }]
      }
    }
  },
  computed: {
    ...mapState('admin/layout', ['isMobile'])
  },
  methods: {
    handleAdd() {
      this.newData = Object.assign({}, newd)
      this.updateIndex = -1
      this.showUpdate = true
      this.$refs.form.resetFields()
    },
    handleUpdate(index) {
      this.newData = Object.assign({}, this.data[index])
      this.updateIndex = index
      this.showUpdate = true
    },
    handleClickMore(name, index) {
      console.log(name, index)
      if (name === 'update') {
        this.handleUpdate(index)
      } else if (name === 'delete') {
          this.$Modal.confirm({
            title: '删除任务',
            content: '确定删除该任务吗？',
            onOk: () => {
              this.data.splice(index, 1)
              this.$Message.success('删除成功')
            }
          })
      }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          setTimeout(() => {
            this.updateIndex >= 0 ? this.data[this.updateIndex] = Object.assign({}, this.newData) : this.data.push(this.newData)
            this.$Message.success('编辑成功')
            this.showUpdate = false
            this.submitting = false
            this.$nextTick(() => {
              this.submitting = true
            })
          }, 1000)
        } else {
          this.submitting = false
          this.$nextTick(() => {
            this.submitting = true
          })
        }
      })
    },
    getData() {
      this.loading = true
      setTimeout(() => {
        this.data = data
        this.loading = false
      }, 1000)
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss">
.list-basic-list-content {
  font-size: 0;
  &-item {
    display: inline-block;
    margin-left: 32px;
    color: #808695;
    font-size: 14px;
    vertical-align: middle;
  }
}
</style>
