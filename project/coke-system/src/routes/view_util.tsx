
import * as React from 'react';
import { useEffect } from 'react';
import { Navigate, Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { beforeEach } from '.';
import useStore from '@/stores';
import LayoutLoading from "@/layout/loading";

type props = {
  routes: ROUTER[]
}

/**
 * 导航守卫
 * @param routes 
 * @returns if 路由未被拦截=>返回路由列表元素
 */
function routeGurad(routes: ROUTER[]) {
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

export default function RouterView(props: props) {
  const { routes } = props

  return (
    <React.Suspense fallback={<LayoutLoading />}>
      {routeGurad(routes)}
    </React.Suspense>
  )
}