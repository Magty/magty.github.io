<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader title="分步表单" content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。" hidden-breadcrumb></PageHeader>
    </div>
    <Card class="ivu-mt" :bordered="false" dis-hover>
      <Row>
        <i-Col
          :xl="{span:12,offset:6}"
          :lg="{span:12,offset:6}"
          :md="{span:16,offset:4}"
          :sm="{span:20,offset:2}"
          :xs="24"
        >
          <div class="ivu-p ivu-mb">
            <Steps :current="currentStep">
              <Step title="填写转账信息"></Step>
              <Step title="确认转账信息"></Step>
              <Step title="完成"></Step>
            </Steps>
          </div>
          <Step1 v-if="0 === currentStep" @on-next-step="data => handleSetStep(1,data)"></Step1>
          <Step2
            v-if="1 === currentStep"
            @on-next-step="handleSetStep(2)"
            @on-prev-step="handleSetStep(0)"
            :info-data="data"
          ></Step2>
          <Step3 v-if="2 === currentStep" @on-prev-step="handleSetStep(1)" :info-data="data"></Step3>
          <div v-if="0 === currentStep">
            <Divider></Divider>
            <Alert>
              <strong v-color="'#808695'">说明</strong>
              <div v-color="'#808695'" slot="desc">
                <p>
                  <strong>转账到微信</strong>
                </p>
                <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
                <p>
                  <strong>转账到支付宝</strong>
                </p>
                <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
              </div>
            </Alert>
          </div>
        </i-Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
export default {
  name: 'form-step-form',
  components: {
    Step1,
    Step2,
    Step3
  },
  data() {
    return {
      currentStep: 0,
      data: {}
    }
  },
  methods: {
    handleSetStep(step, data) {
      this.currentStep = step
      if (data) {
        this.data = Object.assign(this.data, data)
      }
    }
  }
}
</script>

<style>
</style>
