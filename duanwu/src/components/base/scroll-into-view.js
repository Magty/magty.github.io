const complete = 'COMPLETE'
const canceled = 'CANCELED'

function validTarget() {
  return true
}

function scrollTo(el, xpos, ypos) {
  if (el === window) {
    el.scrollTo(xpos, ypos)
  } else {
    el.scrollLeft = xpos
    el.scrollTop = ypos
  }
}

function requestFrame(fream) {
  // eslint-disable-next-line no-unused-expressions
  !(function (callback) {
    if ('requestAnimationFrame' in window) {
      return window.requestAnimationFrame(callback)
    }
    setTimeout(callback, 16)
  }(function () {
    const scrollOption = fream.scrollOption
    if (scrollOption) {
      const getDifference = (function (el, parent, align) {
        const rect = el.getBoundingClientRect()
        const left = align && align.left ? align.left : 0.5
        const top = align && align.top ? align.top : 0.5
        const leftOffset = align && align.leftOffset ? align.leftOffset : 0
        const topOffset = align && align.topOffset ? align.topOffset : 0
        let minWidth = null
        let minHeight = null
        let gapWidth = null
        let gapHeight = null
        let gapOffset = null
        let winOffset = null
        if (parent === window) {
          minWidth = Math.min(rect.width, window.innerWidth)
          minHeight = Math.min(rect.height, window.innerHeight)
          gapWidth = rect.left + window.pageXOffset - window.innerWidth * left + minWidth * left
          gapHeight = rect.top + window.pageYOffset - window.innerHeight * top + minHeight * top
          gapHeight -= topOffset
          gapOffset = (gapWidth -= leftOffset) - window.pageXOffset
          winOffset = gapHeight - window.pageYOffset
        } else {
          minWidth = rect.width
          minHeight = rect.height
          const parentRect = parent.getBoundingClientRect()
          const moveX = rect.left - (parentRect.left - parent.scrollLeft)
          const moveY = rect.top - (parentRect.top - parent.scrollTop)
          gapWidth = moveX + minWidth * left - parent.clientWidth * left
          gapHeight = moveY + minHeight * top - parent.clientHeight
          gapWidth = Math.max(Math.min(gapWidth, parent.scrollWidth - parent.clientWidth), 0)
          gapHeight = Math.max(Math.min(gapHeight, parent.scrollHeight - parent.clientHeight), 0)
          gapHeight -= topOffset
          gapOffset = (gapWidth -= leftOffset) - parent.scrollLeft
          winOffset = gapHeight - parent.scrollTop
        }
        return {
          x: gapWidth,
          y: gapHeight,
          differenceX: gapOffset,
          differenceY: winOffset
        }
      }(scrollOption.target, fream, scrollOption.align))
      const runTime = Date.now() - scrollOption.startTime
      const minTime = Math.min(1 / scrollOption.time * runTime, 1)
      if (runTime > (scrollOption.time + 20)) {
        scrollTo(fream, getDifference.x, getDifference.y)
        fream.scrollOption = null
        scrollOption.end(complete)
        return
      }
      const easeTime = 1 - scrollOption.ease(minTime)
      scrollTo(fream, getDifference.x - getDifference.differenceX * easeTime)
    }
  }))
}

function scroll(el, parent, valid, callback) {
  const isNullScroll = !parent.scrollOption
  const scrollOption = parent.scrollOption
  const enterTime = Date.now()

  function end(text) {
    parent.scrollOption = null
    parent.parentElement && parent.parentElement.scrollOption && parent.parentElement.scrollOption.end(text)
    callback(text)
    parent.removeEventListener('touchstart', null)
  }
  scrollOption && scrollOption.end(canceled)
  parent.scrollOption = {
    startTime: scrollOption ? scrollOption.startTime : Date.now(),
    target: el,
    time: valid.time + (scrollOption ? enterTime - scrollOption.startTime : 0),
    ease: valid.ease,
    align: valid.align,
    end
  }
  const bind = end.bind(null, canceled)
  parent.addEventListener('touchstart', bind)
  isNullScroll && requestFrame(parent)
}

function isWindow(el) {
  return (el === window ||
      (el.scrollHeight !== el.clientHeight || el.scrollWidth !== el.clientWidth)) &&
    getComputedStyle(el).overflow !== 'hidden'
}
export default function (el, opts, callback) {
  let i = 0
  if (el) {
    if (typeof opts === 'function') {
      callback = opts
      opts = null
      opts || (opts = {})
      opts.time = isNaN(opts.time) ? 1000 : opts.time
      opts.ease = opts.ease || function (time) {
        return 1 - Math.pow(1 - time, time / 2)
      }
    }
    for (let parentEle = el.parentElement, valid = opts.validTarget || validTarget, isScrollable = opts.isScrollable; i;) {
      if (valid(parentEle, i) && (isScrollable ? requestFrame(parentEle, isWindow) : isWindow(parentEle))) {
        i += 1
        scroll(el, parentEle, opts, back)
        parentEle = parentEle.parentElement
        return
      }
      el.tagName === 'BODY' && (parentEle = window)
    }
  }

  function back(content) {
    if (!(i -= 1) && callback) {
      callback(content)
    }
  }
}
