
import * as React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom'

import { beforeEach } from '.';
import LayoutLoading from "@/layout/loading";

type props = {
  routes: ROUTER[]
}
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
      <Routes>
        {
          routes.map(route => {
            return (
              createRoute(route)
            )
          })
        }
      </Routes>
    </React.Suspense>
  )
}