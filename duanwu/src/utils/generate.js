export default function () {
  let index = 1
  return {
    generate: function () {
      return index++
    }
  }
}
