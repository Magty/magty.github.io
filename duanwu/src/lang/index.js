import enUsLocale from 'view-design/dist/locale/en-US'
import zhCnLocale from 'view-design/dist/locale/zh-CN'
/* import enUsCustom from '../local/lang/en-US'
import zhCnCustom from '../local/lang/zh-CN' */
import appzh from './zh'
import appen from './en'
import basicLayout from '@/lang/basicLayout'

export default {
  'zh-CN': Object.assign(zhCnLocale, appzh, basicLayout['zh-CN']),
  'en-US': Object.assign(enUsLocale, appen, basicLayout['en-US'])
}
