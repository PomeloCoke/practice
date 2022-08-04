import { ROUTER } from '@/settings/types/base/types_base_index';
import * as React from 'react';

const App = React.lazy(() => import("@/views/index"))
const Login = React.lazy(() => import('@/views/single/login'))

const route: ROUTER[] = [
  {
    path: '1',
    component: App
  }
]

const mainRouteConfig = {
  
}

export default mainRouteConfig