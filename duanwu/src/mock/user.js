const users = [{
  username: 'admin',
  password: 'admin',
  uuid: 'admin-uuid',
  info: {
    name: 'Aresn',
    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
    access: ['admin']
  }
}]

export default [{
  path: '/api/login',
  method: 'post',
  handle: function (params) {
    const body = params.body
    const loginUser = users.find(function (user) {
      return user.username === body.username && user.password === body.password
    })
    return loginUser ? {
      code: 0,
      msg: '登录成功',
      /* data: Object.assign({}, loginUser, {
        token: 'A68NUPaXVBJYRStwvd9frcUn8rlf30h6'
      }) */
      data: {
        ...loginUser,
        token: 'A68NUPaXVBJYRStwvd9frcUn8rlf30h6'
      }
    } : {
      code: 401,
      msg: '用户名或密码错误',
      data: {}
    }
  }
}, {
  path: '/api/register',
  method: 'post',
  handle: function (params) {
    return {
      code: 0,
      msg: '注册成功',
      data: {
        username: 'admin',
        uuid: 'admin-uuid',
        info: {
          name: 'Aresn',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          access: ['admin']
        },
        token: 'A68NUPaXVBJYRStwvd9frcUn8rlf30h6'
      }
    }
  }
}]
