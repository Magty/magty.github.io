import generate from './generate'
import generator from './generator'
import stateHandler from './state-handler'
import cmd from './console'
import genQuee from './generateQueue'

function initProperty(obj, name, base) {
  const att = obj[name]
  return att || !base ? att : base
}
export default function (options = {}) {
  let idHandler = {}
  if (options.idHandler) {
    idHandler = {
      get: function (id) {
        return options.idHandler.get(id, true)
      },
      set: options.idHandler.set
    }
  } else {
    const idGenerator = generate()
    idHandler = generator({
      idGenerator,
      stateHandler
    })
  }
  let reporter = options.reporter
  if (reporter) {
    reporter = cmd(reporter === false)
  }
  initProperty(options, 'batchProcessor', genQuee({
    reporter
  }))

  /* return {
    listenTo: function (el, parent, call) {

    }
  } */
  return idHandler
}
