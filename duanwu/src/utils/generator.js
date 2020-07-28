export default function (opt) {
  const generator = opt.idGenerator
  const getState = opt.stateHandler.getState
  return {
    get: function (id) {
      const state = getState(id)
      return state && state.id ? state.id : null
    },
    set: function (id) {
      const state = getState(id)
      if (!state) {
        throw new Error('setId required the element to have a resize detection state.')
      }
      const generId = generator.generate()
      state.id = generId
      return generId
    }
  }
}
