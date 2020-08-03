import axios from './index'

export const getUserInfo = ({
  userId
}) => {
  return axios.request({
    url: '/api/getUserInfo',
    method: 'post',
    data: {
      userId
    }
  })
}

export const login = ({
  username,
  password
}) => {
  // console.log(username + '===api==:' + password)
  return axios.request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export const logout = () => {
  return axios.request({
    url: '/api/logout',
    method: 'post'
  })
}

export const register = ({
  email,
  password,
  phone,
  captcha
}) => {
  return axios.request({
    url: '/api/register',
    method: 'post',
    data: {
      email,
      password,
      phone,
      captcha
    }
  })
}

export const authorization = () => {
  return axios.request({
    url: '/api/authorization',
    method: 'get'
  })
}
