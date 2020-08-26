<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="基础详情页" hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt i-table-no-border" :bordered="false" dis-hover>
      <DescriptionList title="基本信息">
        <Description term="姓名：">Magty</Description>
        <Description term="性别：">男</Description>
        <Description term="城市：">上海市</Description>
        <Description term="生日：">1991-09-11</Description>
        <Description term="邮箱：">1249093124@qq.com</Description>
        <Description term="地址：">上海市闵行区</Description>
      </DescriptionList>
      <Divider></Divider>
      <DescriptionList title="其他信息" :col="2">
        <Description term="姓名：">豆豆</Description>
        <Description term="性别：">男</Description>
        <Description term="城市：">上海市</Description>
        <Description term="生日：">1991-09-11</Description>
        <Description term="邮箱：">1249093124@qq.com</Description>
        <Description term="地址：">上海市闵行区</Description>
      </DescriptionList>
      <Divider></Divider>
      <DescriptionList title="表格信息"></DescriptionList>
      <Table :columns="columns" :data="tableData">
        <template slot-scope="{ row }" slot="name">
          <Avatar :src="row.avatar" size="small"></Avatar>
          <span class="ivu-ml-8">{{row.name}}</span>
        </template>
        <template slot-scope="{row}" slot="gender">{{'male' == row.gender ? '男' : '女'}}</template>
      </Table>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'profile-basic',
  data() {
    return {
      columns: [{
        title: '姓名',
        slot: 'name',
        minWidth: 140
      },
      {
        title: '性别',
        slot: 'gender',
        minWidth: 140
      }, {
        title: '城市',
        key: 'city',
        minWidth: 140
      }, {
        title: '邮箱',
        key: 'mail',
        minWidth: 180
      }],
      tableData: [
        {
          name: 'Magty',
          gender: 'male',
          city: '上海市',
          mail: '1249094124@qq.com',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'
        },
        {
          name: 'Magty1',
          gender: 'male',
          city: '上海市',
          mail: '1249094124@qq.com',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'
        },
        {
          name: 'Magty2',
          gender: 'female',
          city: '成都市',
          mail: '1249094124@qq.com',
          avatar: 'https://dev-file.iviewui.com/userinforaP8NeQgYpmKgkpWlqZP7rfewbHiIzJY/avatar'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
