<template>
  <table class="ivu-calendar-table ivu-calendar-table-year" cellspacing="0" cellpadding="0">
    <tbody>
      <tr v-for="(month,index) in chunkMonths" :key="index">
        <td v-for="item in month" :key="item.text">
          <div
            :class="['ivu-calendar-table-day',{'ivu-calendar-table-day-current': item.text === currentMonth}]"
            :style="dayStyles"
            @click="handleClickDate(item.text)"
          >
            <div class="ivu-calendar-table-day-title">{{ item.month }}</div>
            <div class="ivu-calendar-table-day-slot">
              <slot name="year"></slot>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'CalendarYear',
  inject: ['CalendarInstance'],
  props: {
    date: Object
  },
  data() {
    return {}
  },
  computed: {
    months: function() {
      const month = []
      const curFormat = this.date.format('YYYY-01-01')
      for (let i = 0; i < 12; i++) {
        const addMonth = curFormat.add(i, 'month')
        month.push({
          text: addMonth.format('YYYY-MM'),
          month: this.CalendarInstance.locale.months[i],
          type: 'current'
        })
      }
      return month
    },
    chunkMonths: function() {
      return this.months
    },
    dayStyles: function() {
      const style = {}
      if (this.CalendarInstance.cellHeight !== 100) {
        style.height = this.CalendarInstance.cellHeight + 'px'
      }
      return style
    },
    currentMonth: function() {
      return this.date.format('YYYY-MM')
    }
  },
  methods: {
    handleClickDate: function(date) {
      this.CalendarInstance.handleChangeDate(date)
    }
  }
}
</script>

<style>
</style>
