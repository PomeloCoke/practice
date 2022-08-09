import { ROUTER } from '@/settings/types/base/types_base_index';
import * as React from 'react';

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
      title: '仪表盘'
    },
  },
]

const mainRouteConfig = {
  
}

export default mainRouteConfig