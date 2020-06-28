// 工具函数
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
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
