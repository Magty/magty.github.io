const id = '_erd'

function getState(state) {
  return state[id]
}
export default {
  initState: function (state) {
    state[id] = {}
    getState(state)
  },
  getState,
  cleanState: function (state) {
    delete state[id]
  }
}
