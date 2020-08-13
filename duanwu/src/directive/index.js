import resize from './resize'
import styles from './styles'
import lineClamp from './line-clamp'
const importDirective = Vue => {
  Vue.directive('display', styles.display)
  Vue.directive('width', styles.width)
  Vue.directive('height', styles.height)
  Vue.directive('margin', styles.margin)
  Vue.directive('padding', styles.padding)
  Vue.directive('font', styles.font)
  Vue.directive('color', styles.color)
  Vue.directive('bg-color', styles.bgColor)
  Vue.directive('resize', resize)
  Vue.directive('line-clamp', lineClamp)
}
export default importDirective
