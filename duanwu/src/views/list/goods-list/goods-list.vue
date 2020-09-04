<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="商品列表" content="以卡片的形式展现商品或图片信息。" hidden-breadcrumb></PageHeader>
    </div>
    <div class="ivu-mt">
      <div v-if="loading" style="position: relative;height:100px">
        <Spin fix size="large"></Spin>
      </div>
      <Row :gutter="24">
        <i-Col
          v-for="(item,index) in data"
          :key="index"
          class="ivu-mb"
          :xxl="6"
          :xl="8"
          :lg="8"
          :md="12"
          :sm="24"
          :xs="24"
        >
          <i-link :to="item.link" target="_blank">
            <Card class="list-goods-list-item" :bordered="false">
              <Tag v-if="item.is_recommend" color="green">推荐</Tag>
              <Tag v-if="2 === item.status" color="red">缺货</Tag>
              <img :src="item.cover" alt="cover" />
              <div class="list-goods-list-item-title">{{item.title}}</div>
              <div class="list-goods-list-item-desc">{{item.desc}}</div>
              <div class="list-goods-list-item-price">
                <span>￥{{item.price}}元</span>
                <del v-if="item.old_price">￥{{item.old_price}}元</del>
              </div>
            </Card>
          </i-link>
        </i-Col>
      </Row>
      <div class="ivu-mt ivu-text-center" slot="footer">
        <Page :total="100" show-elevator show-sizer show-total :simple="isMobile"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const data = [
{
    cover: 'https://dev-file.iviewui.com/yxsk0RFxdR0X3S0N7QN33mvwLnkfHEJV/middle',
    title: 'Vue.js 实战',
    desc: 'Vue.js 作者尤雨溪作序',
    link: 'https://dev.iviewui.com/shop/1016967896695443456',
    price: 69,
    status: 1,
    is_recommend: 1
  }, {
    cover: 'https://dev-file.iviewui.com/8WwJ7tWv9uZ8hepq8pDTjLQiHZy2MB9I/middle',
    title: '蒙马特城市安全防盗背包',
    desc: 'XDDESIGN 经典版',
    link: 'https://dev.iviewui.com/shop/1022361972508856320',
    price: 350,
    old_price: 450,
    status: 1,
    is_recommend: 0
  }, {
    cover: 'https://dev-file.iviewui.com/PKCycgm3DWJOca5I2uAEqneuLFQAcKa7/middle',
    title: 'Sony 无线立体声耳机',
    desc: 'WH-H800',
    link: 'https://dev.iviewui.com/shop/1022369255729008640',
    price: 1450,
    status: 1,
    is_recommend: 0
  }, {
    cover: 'https://dev-file.iviewui.com/KUa7CaC6m7vRtDCfY0SAXlp7dw9OvBrf/middle',
    title: '京东 E 卡（100元）',
    desc: '面值 100 元的京东E卡（电子卡）',
    link: 'https://dev.iviewui.com/shop/1018787663790084096',
    price: 100,
    status: 2,
    is_recommend: 0
  }, {
    cover: 'https://dev-file.iviewui.com/UTPgv8fkOHXszM8Xxm33C2ABuTw7AlRE/middle',
    title: 'Cherry 机械键盘背光版',
    desc: 'Cherry MX BOARD 1.0',
    link: 'https://dev.iviewui.com/shop/1022357783686811648',
    price: 600,
    status: 1,
    is_recommend: 0
  }, {
    cover: 'https://dev-file.iviewui.com/OYZqqiP1bbwN22Ai2HnwvSagxuSNchdD/middle',
    title: '妙控鼠标 2 - 银色',
    desc: 'Apple Mouse',
    link: 'https://dev.iviewui.com/shop/1022375656002031616',
    price: 582,
    status: 1,
    is_recommend: 0
  }
]
export default {
  name: 'list-goods-list',
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
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss">
.list-goods-list-item {
  text-align: center;
  position: relative;
  img {
    width: 60%;
  }
  .ivu-tag {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  &-title {
    font-size: 16px;
    font-weight: 700;
    margin: 8px 0;
  }
  &-desc {
    font-size: 14px;
    color: #808695;
  }
  &-price {
    font-size: 14px;
    color: #ff6700;
    margin: 8px 0;
    del {
      color: #c5c8ce;
    }
  }
}
</style>
