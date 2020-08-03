import Mock from 'mockjs'
import qs from 'qs'

import account from './account'

Mock.setup({
  timeout: '200-300'
})

function setup(url, method, handle) {
  Mock.mock(new RegExp(url), method, typeof handle === 'function' ? (result) => handle(format(result)) : handle)
}

var Generator = function (key, value) {
  const options = {}
  options[key] = value
  return Mock(options)
}
var Repeat = function (key, value) {
  return Generator('data|'.concat(key), value).data
}
const mockData = {
  Generator,
  Repeat,
  Mock,
  Random: Mock.Random
}

function format({
  url,
  type,
  body
}) {
  return Object.assign({}, {
    method: type,
    params: qs.parse(url.split('?').length > 1 ? url.split('?')[1] : ''),
    body: JSON.parse(body),
    url: qs.parse(url.split('?')[0])
  }, mockData)
}

function extend(key, value) {
  mockData[key] = value
}

function load({
  path,
  method,
  handle
}) {
  if (method === '*') {
    method = ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch']
  }
  if (typeof method === 'string' && method.indexOf('|') > -1) {
    method = method.split('|')
  }
  method instanceof Array ? method.map(item => setup(path, item, handle)) : setup(path, method, handle)
}
const baseMock = {
  setup,
  load,
  extend
}
account.forEach(item => {
  baseMock.load(item)
})
export default Mock
