<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="高级表单" content="当一次性提交大量数据时，可使用高级表单。" hidden-breadcrumb></PageHeader>
    </div>
    <Form ref="form" class="ivu-mt" :model="data" :rules="rules" label-position="top">
      <Card title="出差信息" :bordered="false" dis-hover>
        <Row :gutter="24">
          <i-Col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <FormItem label="出差事由：" prop="tripReason" label-for="tripReason">
              <Input v-model="data.tripReason" placeholder="请填写出差事由" element-id="tripReason" />
            </FormItem>
          </i-Col>
          <i-Col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <FormItem label="合同编号：" prop="contractId" label-for="contractId">
              <Input v-model="data.contractId" placeholder="请填写出差事由" element-id="contractId" />
            </FormItem>
          </i-Col>
          <i-Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
            <FormItem label="出差时间：" prop="tripTime" label-for="tripTime">
              <DatePicker
                v-width="'100%'"
                type="daterange"
                v-model="data.tripTime"
                placeholder="请选择出差时间"
                element-id="tripTime"
              ></DatePicker>
            </FormItem>
          </i-Col>
          <i-Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
            <FormItem label="审批人：" prop="approve" label-for="approve">
              <Select v-model="data.approve" placeholder="选择审批人" element-id="approve">
                <Option
                  v-for="user in users"
                  :value="user.name"
                  :label="user.name"
                  :key="user.name"
                >
                  <Avatar :src="user.avatar" size="small"></Avatar>
                  <span class="ivu-pl-8">{{user.name}}</span>
                </Option>
              </Select>
            </FormItem>
          </i-Col>
          <i-Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
            <FormItem label="紧急程度：" prop="emergencyType" label-for="emergencyType">
              <RadioGroup size="large" v-model="data.emergencyType">
                <Radio :label="1">
                  <Tag color="red">紧急</Tag>
                </Radio>
                <Radio :label="2">
                  <Tag color="blue">急</Tag>
                </Radio>
                <Radio :label="3">
                  <Tag color="green">一般</Tag>
                </Radio>
              </RadioGroup>
            </FormItem>
          </i-Col>
        </Row>
      </Card>
      <Card title="行程信息" class="ivu-mt" :bordered="false" dis-hover>
        <Row :gutter="24">
          <i-Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
            <FormItem label="出发城市：" prop="fromCity" label-for="fromCity">
              <City show-suffix v-model="data.fromCity"></City>
            </FormItem>
          </i-Col>
          <i-Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
            <FormItem label="出发时间：" prop="goTime" label-for="goTime">
              <DatePicker
                v-model="data.goTime"
                v-width="'100%'"
                type="datetime"
                placeholder="请选择出发时间"
                element-id="goTime"
              ></DatePicker>
            </FormItem>
          </i-Col>
          <i-Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
            <FormItem label="返程时间：" prop="backTime" label-for="backTime">
              <DatePicker
                v-model="data.backTime"
                v-width="'100%'"
                type="datetime"
                placeholder="请选择返程时间"
                element-id="backTime"
              ></DatePicker>
            </FormItem>
          </i-Col>
          <i-Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
            <FormItem label="交通类型：" prop="trafficType" label-for="trafficType">
              <Select placeholder="请选择交通工具" element-id="trafficType" v-model="data.trafficType">
                <Option value="train">火车</Option>
                <Option value="plane">飞机</Option>
              </Select>
            </FormItem>
          </i-Col>
          <i-Col v-if="'plane' === data.trafficType" :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
            <FormItem label="航班到达城市：" prop="toCity" :rules="toCityRule" label-for="toCity">
              <City show-suffix v-model="data.toCity"></City>
            </FormItem>
          </i-Col>
        </Row>
      </Card>
      <Card class="ivu-mt i-table-no-border" :bordered="false" dis-hover title="同行人员">
        <Table :data="tableData" :columns="columns">
          <template slot-scope="{row,index}" slot="name">
            <Input v-if="editIndex === index" type="text" v-model="editName" />
            <span v-else>{{row.name}}</span>
          </template>
          <template slot-scope="{row,index}" slot="id">
            <Input v-if="editIndex === index" type="text" v-model="editId" />
            <span v-else>{{row.id}}</span>
          </template>
          <template slot-scope="{row,index}" slot="department">
            <Select v-if="editIndex === index" transfer v-model="editDepartment">
              <Option v-for="(item,index) in departments" :key="index" :value="index">{{item}}</Option>
            </Select>
            <span v-else>{{departments[row.department]}}</span>
          </template>
          <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
              <Button
                @click="handleSave(index)"
                type="success"
                ghost
                size="small"
              >{{addNew ? '添加' : '保存'}}</Button>
              <Button
                v-if="addNew"
                @click="handleDelete(index)"
                class="ivu-ml"
                type="error"
                ghost
                size="small"
              >删除</Button>
              <Button
                v-else
                @click="handleCancel"
                class="ivu-ml"
                type="primary"
                ghost
                size="small"
              >取消</Button>
            </div>
            <div v-else>
              <Button
                @click="handleEdit(row,index)"
                :disabled="addNew"
                type="primary"
                ghost
                size="small"
              >编辑</Button>
              <Poptip @on-ok="handleDelete(index)" confirm transfer title="是否要删除此行？">
                <Button class="ivu-ml" type="error" ghost size="small">删除</Button>
              </Poptip>
            </div>
          </template>
        </Table>
        <Button
          @click="handleAdd"
          class="ivu-mt"
          :disabled="addNew"
          type="dashed"
          long
          icon="md-add"
        >新增成员</Button>
      </Card>
    </Form>
    <FooterToolbar>
      <Button @click="handleSubmit" type="primary" :loading="loading" size="large">提交</Button>
    </FooterToolbar>
  </div>
</template>

<script>
export default {
  name: 'form-advanced-form',
  data() {
    return {
      data: {
        tripReason: '',
        contractId: '',
        tripTime: [],
        approve: '',
        emergencyType: 3,
        fromCity: '',
        goTime: '',
        backTime: '',
        trafficType: '',
        toCity: ''
      },
      rules: {
        tripReason: [
          {
            required: true,
            message: '请填写出差事由',
            trigger: 'blur'
          }
        ],
        contractId: [
          {
            required: true,
            message: '请填写合同编号',
            trigger: 'blur'
          }
        ],
        tripTime: [
          {
            required: true,
            type: 'array',
            message: '请选择出差时间',
            trigger: 'change',
            fields: {
              0: {
                type: 'date',
                message: '请选择出差时间'
              },
              1: {
                type: 'date',
                message: '请选择出差时间'
              }
            }
          }
        ],
        approve: [
          {
            required: true,
            message: '请选择审批人',
            trigger: 'change'
          }
        ],
        fromCity: [
          {
            required: true,
            message: '请选择出发城市',
            trigger: 'change'
          }
        ],
        goTime: [
          {
            required: true,
            type: 'date',
            message: '请选择出发时间',
            trigger: 'change'
          }
        ],
        backTime: [
          {
            required: true,
            type: 'date',
            message: '请选择返程时间',
            trigger: 'change'
          }
        ],
        trafficType: [
          {
            required: true,
            message: '请选择交通类型',
            trigger: 'change'
          }
        ]
      },
      toCityRule: [
        {
          required: true,
          message: '请选择到达城市',
          trigger: 'change'
        }
      ],
      users: [
        {
          name: 'Aresn',
          avatar:
            'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'
        },
        {
          name: '中小鱼',
          avatar:
            'https://dev-file.iviewui.com/userinfoYLhfo1S945BOLuFT96NRStYeYDFRviF5/avatar'
        },
        {
          name: 'Echo',
          avatar:
            'https://dev-file.iviewui.com/userinfoxlXwHVwZkCQtl1Zyd1wrvF78b1rZkhfK/avatar'
        },
        {
          name: '唐不苦',
          avatar:
            'https://dev-file.iviewui.com/userinfosvaY5tb7yfnSFTTimcjy3vuSG6RC28v2/avatar'
        },
        {
          name: '甜筒',
          avatar:
            'https://dev-file.iviewui.com/userinforaP8NeQgYpmKgkpWlqZP7rfewbHiIzJY/avatar'
        }
      ],
      columns: [
        {
          title: '姓名',
          slot: 'name',
          minWidth: 120
        },
        {
          title: '工号',
          slot: 'id',
          minWidth: 120
        },
        {
          title: '所属部门',
          slot: 'department',
          minWidth: 120
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 140
        }
      ],
      tableData: [
        {
          name: 'Aresn',
          id: '001',
          department: 'dev'
        },
        {
          name: '中小鱼',
          id: '002',
          department: 'design'
        },
        {
          name: '唐不苦',
          id: '003',
          department: 'pm'
        }
      ],
      departments: {
        dev: '研发部',
        design: '设计部',
        pm: '产品部'
      },
      editIndex: -1,
      editName: '',
      editId: '',
      editDepartment: '',
      addNew: false,
      loading: false
    }
  },
  methods: {
    handleSave(index) {
      if (this.editName && this.editId && this.editDepartment) {
        this.tableData[index].name = this.editName
        this.tableData[index].id = this.editId
        this.tableData[index].department = this.editDepartment
        this.editIndex = -1
        this.addNew = false
      } else {
        this.$Message.error('请填写完整的成员信息！')
      }
    },
    handleCancel() {
      this.editIndex = -1
      this.addNew = false
    },
    handleEdit(row, index) {
      this.editName = row.name
      this.editId = row.id
      this.editDepartment = row.department
      this.editIndex = index
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
      this.addNew = false
    },
    handleAdd() {
      this.addNew = true
      const user = {
        name: '',
        id: '',
        department: ''
      }
      this.tableData.push(user)
      this.handleEdit(user, this.tableData.length - 1)
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        this.loading = true
        if (valid) {
          setTimeout(() => {
            this.$Message.success('出差申请提交成功!')
          }, 2000)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style>
</style>
