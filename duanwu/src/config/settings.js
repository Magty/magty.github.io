const baseURL = process.env.NODE_ENV === 'production' ? 'http://production.com' : ''
module.exports = {
  title: '端午',
  homeName: 'home',
  baseURL,
  cookieExpires: '1d',
  useI18n: false,
  errorLog: 'production'
}
