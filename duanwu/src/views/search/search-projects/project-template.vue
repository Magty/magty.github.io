<template>
  <Row class="ivu-mt" :gutter="24">
    <i-Col
      v-for="(project,index) in projectList"
      :key="index"
      class="ivu-mb"
      :xl="compact ? 12 : 6"
      :lg="compact ? 12 : 8"
      :md="24"
      :sm="24"
      :xs="24"
    >
      <i-link :to="project.link" target="_blank">
        <Card class="search-search-projects-item" :bordered="bordered" :padding="0">
          <img :src="project.cover" class="search-search-projects-item-cover" />
          <div class="ivu-p-8">
            <div>
              <strong>{{project.title}}</strong>
            </div>
            <div class="search-search-projects-item-desc">{{project.desc}}</div>
            <div class="search-search-projects-item-extra ivu-mt-8 ivu-pb-8">
              <Time :time="project.time" type="date"></Time>
              <span class="ivu-fr">
                <AvatarList :list="project.avatarList" size="small"></AvatarList>
              </span>
            </div>
          </div>
        </Card>
      </i-link>
    </i-Col>
  </Row>
</template>

<script>
export default {
  props: {
    projectList: {
      type: Array
    },
    compact: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      avatarList: [
        {
          src:
            'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
          tip: '史蒂夫·乔布斯'
        },
        {
          src:
            'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
          tip: '斯蒂夫·沃兹尼亚克'
        },
        {
          src:
            'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
          tip: '乔纳森·伊夫'
        }
      ]
    }
  }
}
</script>

<style>
</style>
