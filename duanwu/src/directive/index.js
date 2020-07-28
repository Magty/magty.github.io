import directive from './directives'
const importDirective = Vue => {
  Vue.directive('resize', directive.resize)
}
export default importDirective
