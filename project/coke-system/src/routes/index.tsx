import * as React from 'react';
import blogRoutes from './configs/blog'

export const defaultRoutes: ROUTER[] = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      is_verify: false,
      is_login: false,
    },
    menu: {
      is_show:false,
    }
  },
  {
    path: '/login',
    component: React.lazy(() => import('@/views/single/login')),
    meta: {
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
      title: '仪表盘',
      is_verify: false,
      is_login: true,
    },
    menu: {
      is_show: true,
      name_c: '仪表盘',
      name_e: 'dashboard',
      route: '/dashboard',
      icon: 'icon-dashboard-fill'
    }
  },
]

export const routes: ROUTER[] = [
  ...defaultRoutes,
  ...blogRoutes
]
