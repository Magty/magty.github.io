import axios from 'axios'
// import iView from 'view-design'
// import store from '@/store'
// import { Spin } from 'iview'
import stroe from '@/store'
import {
  getToken
} from './auth'

import {
  baseURL,
  errorModalType,
  modalDuration
} from '@/config/settings'

function recordError(error) {
  stroe.dispatch('admin/log/push', {
    message: '数据请求异常',
    type: 'error',
    meta: {
      error
    }
  })
  if (errorModalType === 'Message') {
    this.$Message.error({
      content: error.message,
      duration: modalDuration
    })
  }
}

function createError(err) {
  const error = new Error(err)
  recordError(error)
  return error
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = []
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 5000,
      headers: {

      }
    }
    return config
  }

  destory(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      config.headers.Authorization = getToken()
      // config.headers['X-Token'] = getToKen()
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destory(url)
      const {
        data
      } = res
      const {
        code
      } = data
      switch (code) {
        case 0:
          return data
        case 'xxx':
          createError('[ code: xxx ] '.concat(data.msg, ': ').concat(res.config.url))
          break
        default:
          createError(''.concat(data.msg, ': ').concat(res.config.url))
          break
      }
    }, error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '请求错误'
            break
          case 401:
            error.message = '未授权，请登录'
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = '请求地址出错: '.concat(error.response.config.url)
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器内部错误'
            break
          case 501:
            error.message = '服务未实现'
            break
          case 502:
            error.message = '网关错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网关超时'
            break
          case 505:
            error.message = 'HTTP版本不受支持'
            break
          default:
            break
        }
      }
      this.destory(url)
      createError(error)
      return Promise.reject(error.response.data)
    })
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
