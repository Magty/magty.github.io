// 工具函数
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  const len = arr.length
  while (++i < len) {
    const item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

export const objEqual = (obj1, obj2) => {
  const keyArray1 = Object.keys(obj1)
  const keyArray2 = Object.keys(obj2)
  if (keyArray1.length !== keyArray2.length) {
    return false
  } else if (keyArray1.length === 0 && keyArray2.length === 0) {
    return true
  } else {
    return !keyArray1.some(key => obj1[key] !== obj2[key])
  }
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

export const debounce = function (func, wait, extra) {
  if (typeof func !== 'function') {
    throw new Error('参数错误')
  }
  let timer = null
  let result
  const {
    maxWait,
    trailing
  } = extra
  const debounced = () => {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    const waitTime = Math.max(maxWait || 0, wait)
    if (trailing) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, waitTime)
      if (callNow) {
        result = func.apply(...args)
      }
    } else {
      timer = setTimeout(() => {
        func.apply(...args)
      }, waitTime)
    }
    return result
  }
  debounced.cancel = () => {
    clearTimeout(timer)
    timer = null
  }
  debounced.flush = () => {
    if (timer) {
      debounced()
    }
  }
  return debounced
}

export const throttle = function (func, wait, options) {
  if (typeof func !== 'function') {
    throw new Error('参数不对')
  }
  const {
    leading,
    trailing
  } = options || {}
  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing
  })
}
