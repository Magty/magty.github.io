const path = require('path')
const defaultSettings = require('./src/settings')

const resolve = dir => path.join(__dirname, dir)

const name = defaultSettings.title || '端午'
// port = 9527 npm run dev OR npm run dev --port = 9527
// const port = process.env.port || process.env.npm_config_port || 9527

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    // open: true, // 运行时默认打开浏览器
    proxy: 'http://localhost:3000'
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        _c: resolve('src/components')
      }
    }
  }
}
