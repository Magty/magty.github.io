<template>
  <div v-resize="handleResize">
    <div class="i-layout-page-header">
      <PageHeader title="卡片列表" content="卡片类型的列表，配合栅格实现响应式布局。" hidden-breadcrumb></PageHeader>
    </div>
    <Row class="ivu-mt" :gutter="24" type="flex" justify="center" align="middle">
      <i-Col class="ivu-mb" :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
        <Button v-height="200" type="dashed" icon="md-add" long>新增产品</Button>
      </i-Col>
      <i-Col
        v-for="item in data"
        :key="item.project"
        class="ivu-mb"
        :xl="8"
        :lg="8"
        :md="12"
        :sm="24"
        :xs="24"
      >
        <a>
          <Card v-height="200" shadow :padding="0">
            <List class="ivu-pl ivu-pr" item-layout="vertical">
              <ListItem>
                <ListItemMeta :title="item.project">
                  <Avatar slot="avatar" :src="item.icon" size="large"></Avatar>
                  <div class="list-card-list-desc" slot="description">
                    <Ellipsis ref="ellipsis" :refInfor="true" :text="item.desc" :lines="4"></Ellipsis>
                  </div>
                </ListItemMeta>
                <template slot="action">
                  <Divider class="ivu-mb-8"></Divider>
                  <li v-width="'50%'">操作一</li>
                  <li v-width="'50%'">操作二</li>
                </template>
              </ListItem>
            </List>
          </Card>
        </a>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import cards from './cards'
export default {
  name: 'list-card-list',
  data() {
    return {
      data: []
    }
  },
  methods: {
    getData() {
      this.data = cards
    },
    handleResize() {
      this.$refs.ellipsis.forEach(item => item.init())
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss">
.list-card-list-desc {
  height: 85px;
  overflow: hidden;
}
</style>
