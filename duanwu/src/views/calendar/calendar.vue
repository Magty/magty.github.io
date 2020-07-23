<template>
  <div class="ivu-calendar">
    <div v-if="showHeader" class="ivu-calendar-header">
      <slot name="header"></slot>
      <div class="ivu-calendar-header-title">
        <slot name="headerTitle">{{ headerTitle }}</slot>
      </div>
      <div class="ivu-calendar-header-action">
        <ButtonGroup v-if="'simple' === headerType">
          <i-Button @click="handlePrev">
            <Icon type="ios-arrow-back"></Icon>
          </i-Button>
          <i-Button @click="handleToday">{{locale.today}}</i-Button>
          <i-Button @click="handleNext">
            <Icon type="ios-arrow-forward"></Icon>
          </i-Button>
        </ButtonGroup>
        <RadioGroup
          v-if="!hideType"
          v-mode="mode"
          @on-change="handleChangeType"
          class="ivu-ml"
          type="button"
        >
          <Radio label="month">{{ locale.type.month }}</Radio>
          <Radio label="year">{{ locale.type.year }}</Radio>
        </RadioGroup>
      </div>
    </div>
    <div class="ivu-calendar-body">
      <CalendarMonth v-if="'month' === mode" :date="currentValue">
        <slot name="month" :month="{key: 'month',fn:()=>{}}"></slot>
      </CalendarMonth>
      <CalendarYear v-else-if="'year' === mod" :date="currentValue"></CalendarYear>
    </div>
  </div>
</template>

<script>
import { oneOf } from '@/utils/tool'
import CalendarMonth from './calendar-month'
import CalendarYear from './calendar-year'
export default {
  name: 'Calendar',
  components: {
    CalendarMonth,
    CalendarYear
  },
  provide() {
    return {
      CalendarInstance: this
    }
  },
  props: {
    value: {
      type: [Date, String, Number]
    },
    type: {
      validator: function(value) {
        return oneOf(value, ['month', 'year'])
      },
      default: 'month'
    },
    cellHeight: {
      type: Number,
      default: 100
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    headerType: {
      validator: function(value) {
        return oneOf(value, ['simple', 'full'])
      },
      default: 'simple'
    },
    firstDayOfWeek: {
      validator: value => oneOf(value, [1, 2, 3, 4, 5, 6, 7]),
      default: 1
    },
    hideType: {
      type: Boolean,
      default: false
    },
    locale: {
      type: Object,
      default: function() {
        return {
          today: '今天',
          type: {
            month: '月',
            year: '年'
          },
          weekDays: ['日', '一', '二', '三', '四', '五', '六'],
          months: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        }
      }
    }
  },
  data() {
    const currentValue = this.value ? this.value : new Date()
    return {
      currentValue,
      mode: this.type
    }
  },
  watch: {
    value: function(newValue) {
      this.currentValue = newValue || new Date()
    },
    type: function(newValue) {
      this.mode = newValue
    }
  },
  computed: {
    headerTitle: function() {
      return this.mode === 'month'
        ? this.currentValue.format('YYYY 年 M 月')
        : this.mode === 'year'
        ? this.currentValue.format('YYYY 年')
        : null
    }
  },
  methods: {
    handleChangeType: function(e) {
      this.$emit('on-type-change', e)
    },
    handlePrev: function() {
      const curFormat = this.currentValue.format('YYYY-MM-01')
      let date = null
      if (this.mode === 'month') {
        date = curFormat.subtract(1, 'month')
      } else if (this.mode === 'year') {
        date = curFormat.subtract(1, 'year')
      }
      this.handleChangeDate(date)
    },
    handleNext: function() {
      const curFormat = this.currentValue.format('YYYY-MM-01')
      let date = null
      if (this.mode === 'month') {
        date = curFormat.add(1, 'month')
      } else if (this.mod === 'year') {
        date = curFormat.add(1, 'year')
      }
      this.handleChangeDate(date)
    },
    handleToday: function() {
      const now = new Date()
      if (now.format('YYYY-MM-DD') !== this.currentValue.format('YYYY-MM-DD')) {
        this.handleChangeDate(now)
      }
    },
    handleChangeDate: function(date) {
      this.currentValue = date
      const now = new Date(date.format('YYYY-MM-DD'))
      this.$emit('input', now)
      this.$emit('on-change', now)
    }
  }
}
</script>

<style>
</style>
