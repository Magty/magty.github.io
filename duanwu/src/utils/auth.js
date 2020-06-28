import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export const setToken = (token, tokenName = TokenKey) => {
  Cookies.set(tokenName, token)
}

export const getToken = (tokenName = TokenKey) => {
  return Cookies.get(tokenName)
}

export const removeToken = (tokenName = TokenKey) => {
  return Cookies.remove(tokenName)
}
