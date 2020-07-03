import Cookies from 'js-cookie'

import config from '@/config/settings.js'
const {
  cookieExpires
} = config

const TokenKey = 'Admin-Token'

export const setToken = (token, tokenName = TokenKey) => {
  Cookies.set(tokenName, token, {
    expires: cookieExpires || '1d'
  })
}

export const getToken = (tokenName = TokenKey) => {
  return Cookies.get(tokenName)
}

export const removeToken = (tokenName = TokenKey) => {
  return Cookies.remove(tokenName)
}
