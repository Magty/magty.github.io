<template>
  <div>
    <Card :bordered="false" dis-hover>
      <div class="ivu-mt ivu-mb ivu-pt ivu-pb">
        <Result type="success" :title="title" :desc="desc">
          <!-- <div slot="extra">已提交申请，等待部门审核。</div> -->
          <template v-slot:extra>
            <div class="project-name">项目名称</div>
            <Steps :current="1">
              <Step title="创建项目">
                <template slot="content">
                  <div>曲丽丽</div>
                  <div>2020-08-16 01:08</div>
                </template>
              </Step>
              <Step title="部门初审" content="这里是该步骤的描述信息"></Step>
              <Step title="财务复核"></Step>
              <Step title="完成"></Step>
            </Steps>
          </template>
          <template #actions>
            <Button type="primary">返回列表</Button>
            <Button>查看项目</Button>
            <Button @click="print">打印</Button>
          </template>
        </Result>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '提交成功',
      desc: '提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message 全局提示反馈即可。本文字区域可以展示简单的补充说明，如果有类似展示“单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。'
    }
  },
  methods: {
    print() {
      window.print()
    }
  }
}
</script>

<style lang="scss" scop>
.project-name {
  font-size: 16px;
  color: #000;
  font-weight: 500;
  margin-bottom: 20px;
}
</style>
