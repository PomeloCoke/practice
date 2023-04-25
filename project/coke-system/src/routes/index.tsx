import * as React from 'react';
import workRoutes from './configs/blog'

export const defaultRoutes: ROUTER[] = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      fullpath: '/',
      is_verify: false,
      is_login: true,
    },
    menu: {
      is_show:false,
    }
  },
  {
    path: '/login',
    component: React.lazy(() => import('@/views/single/login')),
    meta: {
      fullpath: '/login',
      title: '登录',
      is_verify: false,
      is_login: false,
    },
    menu: {
      is_show: false,
    }
  },
  {
    path: '/dashboard',
    component: React.lazy(() => import("@/views/index")),
    meta: {
      fullpath: '/dashboard',
      title: '仪表盘',
      is_verify: false,
      is_login: true,
    },
    menu: {
      is_show: true,
      name_c: '仪表盘',
      name_e: 'dashboard',
      route: '/dashboard',
      icon: 'icon-interface-home'
    }
  },
]

export const routes: ROUTER[] = [
  ...defaultRoutes,
  ...workRoutes
]
