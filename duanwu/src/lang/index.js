import en from 'view-design/dist/locale/en-US'
import zh from 'view-design/dist/locale/zh-CN'
import appzh from './zh'
import appen from './en'
import basicLayout from '@/lang/basicLayout'
export default {
  'zh-CN': Object.assign(appzh, zh, basicLayout['zh-CN']),
  'en-US': Object.assign(appen, en, basicLayout['en-US'])
}
