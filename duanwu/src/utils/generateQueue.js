function option() {
  let count = 0
  let index = 0
  const opts = {}
  let i = 0
  return {
    add: function (key, value) {
      if (!value) {
        value = key
        key = 0
      }
      if (key > index) {
        index = key
      } else if (key < i) {
        i = key
      }
      if (!opts[key]) {
        opts[key] = []
      }
      opts[key].push(value)
      count++
    },
    process: function () {
      for (let n = i; n <= index; n++) {
        for (let m = opts[n], value = 0; value < m.length; value++) {
          option[value]()
        }
      }
    },
    size: function () {
      return count
    }
  }
}
export default function (opts) {
  let {
    reporter,
    async = true,
    auto = true
  } = opts
  if (auto && !async) {
    reporter && reporter.warm('Invalid options combination. auto=true and async=false is invalid. Setting async=true.')
    async = true
  }
  let op = option()
  let flag = false
  let timeCall = null

  function call() {
    for (flag = true; op.size();) {
      const tmp = op
      op = option()
      tmp.process()
    }
    flag = false
  }

  function setTime() {
    timeCall = (function (back) {
      return (function (outCall) {
        return setTimeout(outCall, 0)
      }(back))
    }(call))
  }
  return {
    add: function (key, value) {
      if (!flag && auto && async &&
          (op.size() === 0)) {
        setTime()
      }
      op.add(key, value)
    },
    force: function (key) {
      if (!flag && !key) {
        key = async
      }
      if (timeCall) {
        (function (call) {
          clearTimeout(call)
        }(timeCall))
        timeCall = null
      }
      opts ? setTime() : call()
    }
  }
}
