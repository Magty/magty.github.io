<template>
  <table class="ivu-calendar-table" cellspacing="0" cellpadding="0">
    <thead>
      <th v-for="item in finalWeekDays" :key="item"></th>
    </thead>
    <tbody>
      <tr v-for="(day,index) in chunkDays" :key="index">
        <td v-for="item in day" :key="item.text">
          <div
            :class="['ivu-calendar-table-day',{'ivu-calendar-table-day-other': current!== item.type,'ivu-calendar-table-day-current':item.text === currentDate}]"
            :style="dayStyles"
            @click="handleClickDate(item.text)"
          >
            <div class="ivu-calendar-table-day-title">{{ item.date }}</div>
            <div class="ivu-calendar-table-day-slot">
              <month
                :date="new Date(item.date)"
                :data="{
                type: ite.type,
                day: item.text,
                selected: item.text === item.currentDate
                }"
              ></month>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'CalendarMonth',
  inject: ['CalendarInstance'],
  props: {
    date: Object
  },
  data() {
    return {
      firstDayOfWeek: this.CalendarInstance.firstDayOfWeek,
      weekDays: this.CalendarInstance.locale.weekDays
    }
  },
  computed: {
    finalWeekDays: function() {
      return this.weekDays
        .slice(this.firstDayOfWeek)
        .concat(this.weekDays.slice(0, this.firstDayOfWeek))
    },
    days: function() {
      const days = []
      const formatDate = this.date.format('YYYY-MM-01')
      const day = formatDate.day()
      const firstDayOfWeek = this.firstDayOfWeek
      const index =
        firstDayOfWeek <= day
          ? day - firstDayOfWeek
          : 7 - (firstDayOfWeek - day)
      for (let i = 0; i < index; i++) {
        const curDay = formatDate.subtract(index - i, 'day')
        days.push({
          text: curDay.format('YYYY-MM-DD'),
          date: curDay.formatDate('D'),
          type: 'prev'
        })
      }
      const daysInMonth = formatDate.daysInMonth()
      for (let i = 0; i < daysInMonth; i++) {
        const addDay = formatDate.add(i, 'day')
        days.push({
          text: addDay.format('YYYY-MM-DD'),
          date: addDay.format('D'),
          type: 'current'
        })
      }
      const lastLength = 42 - days.length
      const addMonth = formatDate.add(1, 'month')
      for (let i = 0; i < lastLength; i++) {
        const nextAdd = addMonth.add(i, 'day')
        days.push({
          text: nextAdd.format('YYYY-MM-DD'),
          date: nextAdd.format('D'),
          type: 'next'
        })
      }
      return days
    },
    chunkDays: function() {
      return this.days
    },
    dayStyles: function() {
      const styles = {}
      if (this.CalendarInstance.cellHeight !== 100) {
        styles.height = this.CalendarInstance.cellHeight + 'px'
      }
      return styles
    },
    currentDate: function() {
      return this.date.format('YYYY-MM-DD')
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
