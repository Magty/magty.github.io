import cloneDeep from 'clone-deep'
// 一些路由的处理

/**
 *
 * @param {当前路由} route
 * @param {路由添加的header} header
 * @return 为所有子路由添加header之后的路由，子路由只包含path和header
 */
export function headerRoute(route, header) {
  if (route.children && route.children.length) {
    return route.children.reduce((total, item) => {
      total.push({
        path: item.path,
        header
      })
      return total.concat(headerRoute(item, header))
    }, [])
  } else {
    return [route]
  }
}

/**
 *通过path获取header
 */
export function getHeaderByPath(path, routers) {
  const allRoute = []
  routers.forEach(item => {
    const header = item.header || ''
    const headerRouter = headerRoute(item, header)
    allRoute.push({
      path: item.path,
      header
    })
    headerRouter.forEach(item => {
      allRoute.push(item)
    })
  })
  const route = allRoute.find(item => item.path === path)
  return route ? route.header : null
}

export function getRouteByHeader(route) {
  const header = (arguments.length > 1 && arguments[1]) ? arguments[1] : ''
  if (header) {
    return route.filter(item => item.header === header)
  } else {
    return route
  }
}
/**
 *
 * @param {当前路由} route
 * @param {能打开的name} openNames
 * @returns 返回添加opennames之后的route
 */
export function openNamesRoute(route, openNames) {
  if (route.children && route.children.length) {
    const newOpenNames = openNames.concat([route.path])
    return route.children.reduce((total, item) => {
      total.push({
        path: item.path,
        openNames: newOpenNames
      })
      const child = openNamesRoute(item, openNames)
      return total.concat(child)
    }, [])
  }
  return [route].map(item => {
    return {
      path: item.path,
      openNames
    }
  })
}

export function getOpenNamesByPath(path, routers) {
  const openNamesRoutes = []
  routers.forEach(item => {
    const childOpenNamesRoutes = openNamesRoute(item, [])
    openNamesRoutes.push({
      path: item.path,
      openNames: []
    })
    childOpenNamesRoutes.forEach(item => openNamesRoutes.push(item))
  })
  const route = openNamesRoutes.find(item => item.path === path)
  return route ? route.openNames : []
}
/**
 *
 * @param {根路由} route
 * @returns 数组化路由
 */
export function arrayRoute(route) {
  if (route.children && route.children.length) {
    return route.children.reduce((total, item) => {
      const childRoute = arrayRoute(item)
      return total.concat(childRoute)
    }, [])
  } else {
    return [route]
  }
}

/**
 *
 * @param {根路由数组} routes
 * 返回数组化的路由
 */
export function arrayRoutes(routes) {
  const routesArray = []
  routes.forEach(route => {
    if (route.children && route.children.length) {
      const routeArray = arrayRoute(route)
      routeArray.forEach(item => routesArray.push(item))
    } else {
      routesArray.push(route)
    }
  })
  return routesArray
}

export function addRoutes(routes, target) {
  routes.forEach(route => {
    const newRoute = {}
    for (const key in route) {
      if (key !== 'children') {
        newRoute[key] = cloneDeep(route[key])
      }
    }
    target.push(newRoute)
    route.children && addRoutes(route.children, target)
  })
  return target
}

/**
 * 判断大数组是否包含小数组
 * @param {大数组} array1
 * @param {小数组} array2
 */
export function isInArray(array1, array2) {
  let flag = true
  array2.forEach(item => {
    if (!array1.includes(item)) {
      flag = false
    }
  })
  return flag
}
