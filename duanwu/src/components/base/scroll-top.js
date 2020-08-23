function scrollTop(el, opt, callback) {
  if (el) {
    if (typeof opt === 'function') {
      callback = opt
      opt = null
    }
    if (!opt) {
      opt = {}
    }
    opt.time = isNaN(opt.time) ? 500 : opt.time
    const scrollTop = el.scrollTop
    const to = opt.to || 0
    const gap = Math.abs(scrollTop - to)

    // eslint-disable-next-line no-inner-declarations
    function scroll(scTop, to, step) {
      if (scTop !== to) {
        let stepTo = scTop + step > to ? to : scTop + step
        if (scTop > to) {
          stepTo = scTop - step < to ? to : scTop - step
        }
        el.scrollTop = stepTo

        animateScroll(() => {
          scroll(stepTo, to, step)
        })
      } else {
        callback && callback()
      }
    }
    scroll(scrollTop, to, Math.ceil(gap / opt.time * 50))
  }
}

function animateScroll(call) {
  if ('requestAnimationFrame' in window) {
    return window.requestAnimationFrame(call)
  }
  setTimeout(call, 16)
}
export default scrollTop
