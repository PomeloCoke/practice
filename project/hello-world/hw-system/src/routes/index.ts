import { ROUTER } from '@/settings/types/base/types_base_index';
import * as React from 'react';

const App = React.lazy(() => import("@/views/index"))
const Login = React.lazy(() => import('@/views/single/login'))

export const routes: ROUTER[] = [
  {
    path: '/',
    // redirect: '/login',
    component: App,
    meta: {},
    children: [
      {
        path: '/login',
        component: Login,
        meta: {},
      }
    ]
  },
  
]

const mainRouteConfig = {
  
}

export default mainRouteConfig