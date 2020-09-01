import dayjs from 'dayjs'

function proxyParams(target) {
  return new Proxy(target, {
    get: function (obj, prop) {
      if (dayjs.isDayjs(obj)) {
        return obj[prop]
      } else if (dayjs(obj).isValid()) {
        return dayjs(obj)[prop]
      } else {
        return function () {
          return '无效日期'
        }
      }
    },
    set: function (obj, prop, value) {
      obj[prop] = value
    }
  })
}

export default {
  day: (time) => {
    return time ? dayjs(time) : time
  },
  date_unix: (time) => {
    return dayjs.unix(time)
  },
  date_year: (time) => {
    return time ? proxyParams(time).year() : time
  },
  date_month: (time) => {
    return time ? proxyParams(time).month() : time
  },
  date_date: (time) => {
    return time ? proxyParams(time).date() : time
  },
  date_day: (time) => {
    return time ? proxyParams(time).day() : time
  },
  date_hour: (time) => {
    return time ? proxyParams(time).hour() : time
  },
  date_minute: (time) => {
    return time ? proxyParams(time).minute() : time
  },
  date_second: (time) => {
    return time ? proxyParams(time).second() : time
  },
  date_millisecond: (time) => {
    return time ? proxyParams(time).millisecond() : time
  },
  date_set: (time, prop, value) => {
    return time ? proxyParams(time).set(prop, value) : time
  },
  date_add: (time, prop, value) => {
    return time ? proxyParams(time).add(prop, value) : time
  },
  date_subtract: (time, prop, value) => {
    return time ? proxyParams(time).subtract(prop, value) : time
  },
  date_startof: (time, prop) => {
    return time ? proxyParams(time).startOf(prop) : time
  },
  date_endof: (time, prop) => {
    return time ? proxyParams(time).endOf(prop) : time
  },
  date_format: (time, str = 'YYYY-MM-DD HH:mm:ss') => {
    return time ? proxyParams(time).format(str) : time
  },
  date_diff: (time, input = '', units = 'millisecond', float) => {
    return time ? proxyParams(time).diff(dayjs(input), units, float) : time
  },
  date_value_millisecond: (time) => {
    return time ? proxyParams(time).valueOf() : time
  },
  date_value_second: (time) => {
    return time ? proxyParams(time).unix() : time
  },
  date_days_in_month: (time) => {
    return time ? proxyParams(time).daysInMonth() : time
  },
  date_to_date: (time) => {
    return time ? proxyParams(time).toDate() : time
  },
  date_to_array: (time) => {
    return time ? proxyParams(time).toArray() : time
  },
  date_to_json: (time) => {
    return time ? proxyParams(time).toJSON() : time
  },
  date_to_iso: (time) => {
    return time ? proxyParams(time).toISOString() : time
  },
  date_to_object: (time) => {
    return time ? proxyParams(time).toObject() : time
  },
  date_to_string: (time) => {
    return time ? proxyParams(time).toString() : time
  },
  date_is_before: (time, input = '', units = 'millisecond') => {
    return time ? proxyParams(time).isBefore(dayjs(input), units) : time
  },
  date_is_after: (time, input = '', units = 'millisecond') => {
    return time ? proxyParams(time).isAfter(dayjs(input), units) : time
  },
  date_is_same: (time, input = '', units = 'millisecond') => {
    return time ? proxyParams(time).isSame(dayjs(input), units) : time
  }
}
