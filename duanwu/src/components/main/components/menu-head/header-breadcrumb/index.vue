<template>
  <Breadcrumb v-if="!isLimit" ref="breadcrumb" class="i-layout-header-breadcrumb">
    <BreadcrumbItem>
      <menu-head-title :item="topItem" :hide-icon="!showBreadcrumbIcon"></menu-head-title>
    </BreadcrumbItem>
    <BreadcrumbItem v-for="item in items" :key="item.path">
      <menu-head-title :item="item" :hide-icon="!showBreadcrumbIcon"></menu-head-title>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <menu-head-title :item="siderMenuObject[activePath]" :hide-icon="!showBreadcrumbIcon"></menu-head-title>
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
import { mapState } from 'vuex'

import menuHeadTitle from '../menu-head-title'
import { throttle, on, off } from '@/utils/tools'
import { addRoutes } from '@/utils/route'

export default {
  name: 'headerBreadcrumb',
  components: {
    menuHeadTitle
  },
  data() {
    return {
      handleResize: () => {},
      isLimit: false,
      maxWidth: 560,
      breadcrumbWidth: 0
    }
  },
  computed: {
    ...mapState('admin/layout', ['showBreadcrumbIcon', 'menuCollapse']),
    ...mapState('admin/menu', [
      'openNames',
      'activePath',
      'header',
      'headerName',
      'menuSider'
    ]),
    siderMenuObject: function() {
      const siderMenu = {}
      this.allSiderMenu.forEach(item => {
        if ('path' in item) {
          siderMenu[item.path] = item
        }
      })
      return siderMenu
    },
    items: function() {
      const items = []
      this.openNames.forEach(item => {
        items.push(this.siderMenuObject[item])
      })
      return items
    },
    topItem: function() {
      return this.header.find(item => item.name === this.headerName)
    },
    allSiderMenu: function() {
      return addRoutes(this.menuSider, [])
    }
  },
  methods: {
    handleCheckWidth: function() {
      this.$nextTick(() => {
        this.isLimit =
          this.$parent.$el.width - this.maxWidth <= this.breadcrumbWidth
      })
    },
    handleGetWidth: function() {
      this.isLimit = false
      this.$nextTick(() => {
        this.breadcrumbWidth = parseInt(this.$refs.breadcrumb.$el.width)
      })
    }
  },
  watch: {
    topItem: {
      handler: function() {
        this.handleGetWidth()
        this.handleCheckWidth()
      },
      deep: true
    },
    items: {
      handler: function() {
        this.handleGetWidth()
        this.handleCheckWidth()
      },
      deep: true
    },
    activePath: {
      handler: function() {
        this.handleGetWidth()
        this.handleCheckWidth()
      },
      deep: true
    }
  },
  mounted: function() {
    this.handleResize = throttle(this.handleCheckWidth, 100, {
      leading: false
    })
    on(window, 'resize', this.handleResize)
    this.handleGetWidth()
    this.handleCheckWidth()
  },
  beforeDestroy: function() {
    off(window, 'resize', this.handleResize)
  }
}
</script>

<style lang="scss">
.i-layout-header-breadcrumb {
  display: inline-block;
  .ivu-breadcrumb-item-link {
    color: inherit;
  }
  & > span:last-child {
    font-weight: 400;
  }
  .ivu-breadcrumb-item-separator {
    vertical-align: middle;
  }
}
</style>
