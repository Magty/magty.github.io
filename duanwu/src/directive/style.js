function addUnit(value) {
  return String(value).endsWith('%') ? '' : 'px'
}
export default {
  display: {
    inserted: function (el, binding) {
      binding.value && (el.style.display = binding.value)
    },
    update: function (el, binding) {
      binding.value && (el.style.display = binding.value)
    },
    unbind: function (el) {
      el.style.display = null
    }
  },
  width: {
    inserted: function (el, binding) {
      binding.value && (el.style.width = binding.value + addUnit(binding.value))
    },
    update: function (el, binding) {
      binding.value && (el.style.width = binding.value + addUnit(binding.value))
    },
    unbind: function (el) {
      el.style.width = null
    }
  },
  height: {
    inserted: function (el, binding) {
      binding.value && (el.style.height = binding.value + addUnit(binding.value))
    },
    update: function (el, binding) {
      binding.value && (el.style.height = binding.value + addUnit(binding.value))
    },
    unbind: function (el) {
      el.style.height = null
    }
  },
  margin: {
    inserted: function (el, binding) {
      binding.value && (el.style.margin = binding.value + addUnit(binding.value))
    },
    update: function (el, binding) {
      binding.value && (el.style.margin = binding.value + addUnit(binding.value))
    },
    unbind: function (el) {
      el.style.margin = null
    }
  },
  padding: {
    inserted: function (el, binding) {
      binding.value && (el.style.padding = binding.value + addUnit(binding.value))
    },
    update: function (el, binding) {
      binding.value && (el.style.padding = binding.value + addUnit(binding.value))
    },
    unbind: function (el) {
      el.style.padding = null
    }
  },
  font: {
    inserted: function (el, binding) {
      binding.value && (el.style.fontSize = String(binding.value) + 'px')
    },
    update: function (el, binding) {
      binding.value && (el.style.fontSize = String(binding.value) + 'px')
    },
    unbind: function (el) {
      el.style.fontSize = null
    }
  },
  color: {
    inserted: function (el, binding) {
      binding.value && (el.style.color = binding.value)
    },
    update: function (el, binding) {
      binding.value && (el.style.color = binding.value)
    },
    unbind: function (el) {
      el.style.color = null
    }
  },
  bgColor: {
    inserted: function (el, binding) {
      binding.value && (el.style.backgroundColor = binding.value)
    },
    update: function (el, binding) {
      binding.value && (el.style.backgroundColor = binding.value)
    },
    unbind: function (el) {
      el.style.backgroundColor = null
    }
  }
}
