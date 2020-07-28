const successText = '复制成功'
const errorText = '复制失败'
export default function (copy) {
  /* const text = copy.text ? copy.text : ''
  const successTip = copy.successTip ? copy.successTip : successMsg
  const errorTip = copy.errorTip ? copy.errorTip : errorMsg
  const success = copy.success
  const error = copy.error
  const showTips = copy.showTips */
  let {
    text,
    successTip,
    errorTip,
    success,
    error,
    showTips
  } = copy
  text = text || ''
  successTip = successTip || successText
  errorTip = errorTip || errorText

  const isDir = document.documentElement.getAttribute('dir') === 'rtl'
  const $textarea = document.createElement('textarea')
  $textarea.style.fontSize = '12pt'
  $textarea.style.border = '0'
  $textarea.style.padding = '0'
  $textarea.style.margin = '0'
  $textarea.style.position = 'absolute'
  $textarea.style[isDir ? 'right' : 'left'] = '-9999px'
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  $textarea.style.top = scrollTop + 'px'
  $textarea.setAttribute('readonly', '')
  $textarea.value = text
  document.body.appendChild($textarea)
  try {
    document.execCommand('copy')
    showTips && this.$Message.success({
      content: successTip
    })
    success && success.call()
  } catch (err) {
    showTips && this.$Message.error({
      content: errorTip
    })
    document.body.removeChild($textarea)
    error && error.call()
  }
}
