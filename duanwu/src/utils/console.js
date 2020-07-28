export default function (bReport) {
  function empty() {

  }
  const cmd = {
    log: empty,
    warm: empty,
    error: empty
  }
  if (!bReport && window.console) {
    const real = function (obj, fun) {
      obj[fun] = function () {
        const original = console[fun]
        if (original.apply) {
          original.apply(console, arguments)
        } else {
          for (let i = 0; i < arguments.length; i++) {
            original(arguments[i])
          }
        }
      }
    }
    real(cmd, 'log')
    real(cmd, 'warm')
    real(cmd, 'error')
  }
  return cmd
}
