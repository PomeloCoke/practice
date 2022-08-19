import * as React from 'react';
import { useLocation } from 'react-router-dom';

export const routes: ROUTER[] = [
  {
    path: '/',
    redirect: '/login',
    meta: {},
  },
  {
    path: '/login',
    component: React.lazy(() => import('@/views/single/login')),
    meta: {
      title: '登录'
    },
  },
  {
    path: '/dashboard',
    component: React.lazy(() => import("@/views/index")),
    meta: {
      title: '仪表盘'
    },
  },
  {
    path: '/test',
    component: React.lazy(() => import('@/views/single/test')),
    meta: {
      title: '测试页面'
    },
  },
]

export const beforeEach = () => {
  const location = useLocation()
  console.log('getCurPath', location)
}

const mainRouteConfig = {
  
}

export default mainRouteConfig