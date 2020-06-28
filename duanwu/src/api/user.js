import axios from './index'

export const getUserInfo = ({
  userId
}) => {
  return axios.request({
    url: '/getUserInfo',
    method: 'post',
    data: {
      userId
    }
  })
}

export const login = ({
  userName,
  password
}) => {
  return axios.request({
    url: '/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export const logout = () => {
  return axios.request({
    url: '/logout',
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
    url: '/register',
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
    url: '/authorization',
    method: 'get'
  })
}
