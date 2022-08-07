
import * as React from 'react';
import { Navigate, Routes, Route, Outlet } from 'react-router-dom'
import { ROUTER } from "@/settings/types/base/types_base_index";
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
        <Route index
               key={route.path}
               element={<route.component/>}
        ></Route>
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