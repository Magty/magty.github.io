const baseURL = process.env.NODE_ENV === 'production' ? 'http://production.com' : ''
module.exports = {
  title: '端午',
  homeName: 'home',
  baseURL,
  cookieExpires: '1d',
  useI18n: false,
  errorLog: 'production',

  titleSuffix: 'duanwu',
  routerMode: 'history',
  routerBase: '/',
  showProgressBar: true,
  apiBaseURL: '/',
  modalDuration: 3,
  errorModalType: 'Message',
  cookiesExpires: 1,
  i18n: {
    default: 'zh-CN',
    auto: false
  },
  menuSideWidth: 256,
  layout: {
    siderTheme: 'dark',
    headerTheme: 'light',
    headerStick: false,
    tabs: true,
    showTabsIcon: true,
    tabsFix: true,
    tabsReload: false,
    tabsOrder: true,
    siderFix: true,
    headerFix: true,
    headerHide: false,
    headerMenu: false,
    menuAccordion: true,
    showSiderCollapse: true,
    menuCollapse: false,
    menuSiderReload: false,
    menuHeaderReload: false,
    showCollapseMenuTitle: false,
    showReload: true,
    showSearch: true,
    showNotice: true,
    showFullscreen: true,
    showMobileLogo: true,
    showBreadcrumb: true,
    showBreadcrumbIcon: false,
    showLog: true,
    showI18n: true,
    enableSetting: true,
    logoutConfirm: true
  },
  page: {
    opened: []
  },
  sameRouteForceUpdate: false,
  dynamicSiderMenu: false
}
