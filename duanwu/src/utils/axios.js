import axios from 'axios'
// import store from '@/store'
// import { Spin } from 'iview'
import {
  getToken
} from './auth'

import {
  baseURL
} from '@/config/settings'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = []
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
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
      return data
    }, error => {
      this.destory(url)
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
