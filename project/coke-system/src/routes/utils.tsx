
import * as React from 'react';
import { useEffect } from 'react';
import { Navigate, Routes, Route, useLocation, useNavigate, NavigateFunction } from 'react-router-dom';
import useStore from '@/stores';

/**
 * 路由前置钩子函数
 * @description 在路由跳转前进行检验：1=>路由是否存在 2=>路由是否要登录&&token是否有效
 * @param location 活跃路由信息
 * @param navigate 路由方法
 * @param routes 路由列表
 * @param storeData 状态管理store
 * @returns 
 */
const beforeEach = (
  location: any,
  navigate: NavigateFunction,
  routes: ROUTER[],
  storeData: STORE_STATE
) => {
  const { pathname } = location
  const routeInfo = routeSearch(pathname, routes)

  // TODO 404页面
  if (!routeInfo) return false

  if (routeInfo.meta.is_login) {
    // TODO 接口校验token是否有效
    const token = storeData.user.token
    if (!token) {
      console.log('token无效，登录', storeData.user)
      navigate('/login', { replace: true })
      return false
    }
  }

  document.title = routeInfo.meta.title
  return true
}

/**
 * 路由查找
 * @description 在路由列表中查找路由是否存在
 * @param path 需要查找的路由名
 * @param routes 路由列表
 * @returns if 存在=>返回该路由的信息 else=>返回null
 */
function routeSearch (path: string, routes: ROUTER[]): ROUTER | null {
  for (let item of routes) {
    if (item.path === path) return item
    if (item.children) return routeSearch(path, item.children)
  }
  return null
}

/**
 * 创建路由元素
 * @param route 路由项
 * @returns 生成的路由元素
 */
 function createRoute(route: ROUTER) {
  if (route.children && route.children.length > 0) {
    // 有子路由
    return (
      <Route key={route.path}
             path={route.path}
      >
        {!route.redirect &&
          <Route index
                 key={route.path}
                 element={<route.component/>}
          ></Route>
        }
        {route.redirect &&
          <Route key={route.path}
                 path={route.path}
                 element={<Navigate to={route.redirect} replace/>}
          ></Route>
        }
        {
          route.children.map(childRoute => {
            return (
              createRoute(childRoute)
            )
          })
        }
    </Route>
    )
  }

  if (route.redirect) {
    // 路由重定向
    return (
      <Route key={route.path}
             path={route.path}
             element={<Navigate to={route.redirect} replace/>}
      >
      </Route>
    )
  }

  return (
    <Route key={route.path}
           path={route.path}
           element={<route.component/>}
      >
      </Route>
  )
}

/**
 * 导航守卫
 * @param routes 路由列表
 * @returns if 路由未被拦截=>返回路由列表元素 else =>执行beforeEach中的判断
 */
 export function routeGurad(routes: ROUTER[]) {
  const navigate = useNavigate()
  const location = useLocation()
  const store = useStore()
  const storeData = store.data

  useEffect(() => {
    beforeEach(location, navigate, routes, storeData)
  })

  return (
    <Routes>
      {
        routes.map(route => {
          return (
            createRoute(route)
          )
        })
      }
    </Routes>
  )  
}