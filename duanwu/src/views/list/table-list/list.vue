<template>
  <div>
    <Button @click="handleOpenCreate" type="primary" icon="md-add">新建</Button>
    <Button v-show="selectedData.length" class="ivu-ml-8" icon="md-list">批量操作</Button>
    <Dropdown @on-click="handleClickItem" v-show="selectedData.length" class="ivu-ml-8">
      <Button>
        更多操作
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem name="delete">删除</DropdownItem>
        <DropdownItem name="approve">批量审批</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <div class="ivu-inline-block ivu-fr">
      <Dropdown trigger="click" @on-click="handleChangeTableSize">
        <Tooltip class="ivu-ml" content="密度" placement="top">
          <i-link>
            <Icon type="md-list"></Icon>
          </i-link>
        </Tooltip>
        <DropdownMenu slot="list">
          <DropdownItem name="default" :selected="'default' === tableSize">默认</DropdownItem>
          <DropdownItem name="large" :selected="'large' === tableSize">宽松</DropdownItem>
          <DropdownItem name="small" :selected="'small' === tableSize">紧凑</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Tooltip class="ivu-ml" :content="tableFullscreen ? '退出全屏' : '全屏'" placement="top">
        <i-link @click.native="handleFullscreen">
          <Icon
            :custom="tableFullscreen ? 'iconfont icon-exit-full-screen' : 'iconfont icon-full-screen'"
          ></Icon>
        </i-link>
      </Tooltip>
      <Tooltip class="ivu-ml" content="刷新" placement="top">
        <i-link @click.native="handleRefresh">
          <Icon type="md-refresh"></Icon>
        </i-link>
      </Tooltip>
      <Dropdown trigger="click">
        <Tooltip class="ivu-ml" content="列设置" placement="top">
          <i-link>
            <Icon type="md-options"></Icon>
          </i-link>
        </Tooltip>
        <DropdownMenu slot="list">
          <div class="ivu-p-8">
            <Row>
              <i-Col :span="12">列展示</i-Col>
              <i-Col :span="12" class="ivu-text-right">
                <i-link link-color @click.native="handleResetColumn">重置</i-link>
              </i-Col>
            </Row>
          </div>
          <Divider class="ivu-mt-8 ivu-mb-8" size="small"></Divider>
          <template v-for="(item,index) in columns">
            <li
              @click="item.show=!item.show"
              v-if="item.title"
              :key="`${index}_item.title`"
              class="ivu-dropdown-item"
            >
              <Checkbox v-model="item.show"></Checkbox>
              <span>{{item.title}}</span>
            </li>
          </template>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Alert class="ivu-mt" show-icon>
      <div v-font="14">
        已选择
        <strong v-color="'#2d8cf0'">{{selectedData.length}}</strong>
        项 服务调用次数总计
        <strong>{{totalSelectedCount}}万</strong>
        <a @click="handleClearSelect" class="ivu-ml">清空</a>
      </div>
    </Alert>
    <Table
      ref="table"
      class="ivu-mt"
      :columns="tableColumns"
      :data="dataWithPage"
      :loading="loading"
      :size="tableSize"
      @on-sort-change="handleSortChange"
      @on-filter-change="handleFilterChange"
      @on-select="handleSelect"
      @on-select-cancel="handleSelectCancel"
      @on-select-all="handleSelectAll"
      @on-select-all-cancel="handleSelectAllCancel"
    >
      <template slot-scope="{ row }" slot="count">
        <div>{{row.count}}万</div>
      </template>
      <template slot-scope="{ row }" slot="status">
        <Badge v-if="0===row.status" status="default" text="关闭"></Badge>
        <Badge v-else-if="1===row.status" status="processing" text="运行中"></Badge>
        <Badge v-else-if="2===row.status" status="success" text="已上线"></Badge>
        <Badge v-else-if="3===row.status" status="error" text="异常"></Badge>
      </template>
      <template slot-scope="{ row }" slot="date">{{row.date | date_format('YYYY-MM-DD HH:mm:ss')}}</template>
      <template slot-scope="{ index }" slot="action">
        <a @click="handleUpdate(index)">编辑</a>
        <Divider type="vertical"></Divider>
        <a>订阅警报</a>
      </template>
    </Table>
    <div class="ivu-mt ivu-text-center">
      <Page
        @update:current="index => current=index"
        @on-page-size-change="handleChangePageSize"
        :total="limitData.length"
        :current="current"
        show-total
        show-sizer
        :page-size="size"
      ></Page>
    </div>
    <Modal
      v-model="showCreate"
      @on-ok="handleCreate"
      title="编辑规则"
      :loading="creating"
      :transfer="false"
    >
      <Form ref="create" :model="createData" :rules="createRules" :label-width="80">
        <FormItem label="描述" prop="desc">
          <Input placeholder="请输入" v-model="createData.desc" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import radomStr from '@/utils/random_str'
export default {
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          show: true
        },
        {
          title: '规则名称',
          key: 'name',
          minWidth: 100,
          show: !0
        },
        {
          title: '描述',
          key: 'desc',
          minWidth: 100,
          show: true
        },
        {
          title: '服务调用次数',
          key: 'count',
          slot: 'count',
          align: 'right',
          minWidth: 140,
          sortable: 'custom',
          show: true
        },
        {
          title: '状态',
          slot: 'status',
          minWidth: 100,
          show: true,
          filters: [
            {
              label: '关闭',
              value: 0
            },
            {
              label: '运行中',
              value: 1
            },
            {
              label: '已上线',
              value: 2
            },
            {
              label: '异常',
              value: 3
            }
          ],
          filterMultiple: true,
          filterRemote: function (t) {
            this.filterType = t
          }
        },
        {
          title: '上次调度时间',
          key: 'date',
          slot: 'date',
          minWidth: 140,
          sortable: 'custom',
          show: true
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          minWidth: 140,
          show: true
        }
      ],
      loading: false,
      list: [],
      selectedData: [],
      current: 1,
      size: 10,
      sortType: 'normal',
      sortColumns: '',
      filterType: null,
      showCreate: false,
      createData: {
        desc: ''
      },
      createRules: {
        desc: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          }
        ]
      },
      creating: true,
      updateIndex: -1,
      tableSize: 'default',
      tableFullscreen: false
    }
  },
  computed: {
    limitData() {
      let list = [...this.list]
      const sort = this.sortColumns
      if (this.sortType === 'asc') {
        list = list.sort((a, b) => {
          return a[sort] > b[sort] ? 1 : -1
        })
      } else if (this.sortType === 'desc') {
        list = list.sort((a, b) => {
          return a[sort] < b[sort] ? 1 : -1
        })
      }
      if (this.filterType && this.filterType.length) {
        list = list.filter((item) => this.filterType.indexOf(item.status) >= 0)
      }
      const nameArray = this.selectedData.map((item) => item.name)
      list.map((item) => {
        item._checked = nameArray.indexOf(item.name) >= 0
        return item
      })
      return list
    },
    dataWithPage() {
      const first = this.current * this.size - this.size
      const end = first + this.size
      return [...this.limitData].slice(first, end)
    },
    totalSelectedCount() {
      let total = 0
      this.selectedData.forEach((item) => {
        total += item.count
      })
      return total
    },
    tableColumns() {
      return [...this.columns].filter((column) => column.show)
    }
  },
  methods: {
    mockData() {
      const data = {}
      data.name = radomStr(6)
      data.desc = '这是一段描述'
      data.count = Math.floor(1000 * Math.random() + 400)
      data.status = Math.floor(4 * Math.random())
      data.date = new Date(
        new Date().getTime() -
          Math.floor(365 * 24 * 60 * 60 * 1000 * Math.random())
      )
      data._checked = false
      return data
    },
    getData() {
      this.current = 1
      this.loading = true
      setTimeout(() => {
        const data = []
        for (let i = 0; i < 100; i++) {
          data.push(this.mockData())
        }
        this.list = data
        this.loading = false
      }, 1000)
    },
    handleSortChange(row) {
      this.sortColumns = row.key
      this.sortType = row.order
      this.current = 1
    },
    handleFilterChange() {
      this.current = 1
    },
    handleSelect(selection, row) {
      this.selectedData.push(row)
    },
    handleSelectCancel(selection, row) {
      const index = this.selectedData.findIndex(
        (item) => item.name === row.name
      )
      this.selectedData.splice(index, 1)
    },
    handleSelectAll(selection) {
      selection.forEach((select) => {
        const index = this.selectedData.findIndex(
          (item) => item.name === select.name
        )
        if (index < 0) {
          this.selectedData.push(select)
        }
      })
    },
    handleSelectAllCancel() {
      this.dataWithPage.forEach((item) => {
        const index = this.selectedData.findIndex(
          (select) => select.name === item.name
        )
        if (index > 0) {
          this.selectedData.splice(index, 1)
        }
      })
    },
    handleClearSelect() {
      this.selectedData = []
    },
    handleClickItem(name) {
      if (name === 'delete') {
        this.selectedData.forEach((select) => {
          const index = this.list.findIndex((item) => item.name === select.name)
          if (index >= 0) {
            this.list.splice(index, 1)
          }
        })
        this.selectedData = []
      }
    },
    handleOpenCreate() {
      this.updateIndex = -1
      this.createData.desc = ''
      this.showCreate = true
    },
    handleCreate() {
      this.$refs.create.validate((valid) => {
        if (valid) {
          if (this.updateIndex < 0) {
            const mockData = this.mockOneData()
            mockData.desc = this.createData.desc
            mockData.date = new Date()
            this.list.splice(0, 0, mockData)
            this.$Message.success('创建成功')
          } else {
            const name = this.dataWithPage[this.updateIndex].name
            const index = this.list.findIndex((item) => item.name === name)
            this.list[index].desc = this.createData.desc
            this.$Message.success('修改成功')
          }
          this.showCreate = false
          this.creating = false
          this.$nextTick(() => {
            this.creating = true
          })
        } else {
          this.creating = false
          this.$nextTick(() => {
            this.creating = true
          })
        }
      })
    },
    handleUpdate(index) {
      this.updateIndex = index
      const data = this.dataWithPage[index]
      this.createData.desc = data.desc
      this.showCreate = true
    },
    handleChangeTableSize(size) {
      this.tableSize = size
    },
    handleFullscreen() {
      this.tableFullscreen = !this.tableFullscreen
      this.$emit('on-fullscreen', this.tableFullscreen)
    },
    handleRefresh() {
      this.getData()
    },
    handleResetColumn() {
      this.columns = this.columns.map((item) => {
        item.show = true
        return item
      })
    },
    handleChangePageSize(size) {
      this.size = size
      this.getData()
    }
  }
}
</script>

<style>
</style>
