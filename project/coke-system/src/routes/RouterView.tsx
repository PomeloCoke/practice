
import * as React from 'react';

import { routeGurad } from './utils';
import LayoutLoading from "@/layout/loading";

type propType = {
  routes: ROUTER[]
}

export default function RouterView(prop: propType) {
  const { routes } = prop
  return (
    <React.Suspense fallback={<LayoutLoading />}>
      {routeGurad(routes)}
    </React.Suspense>
  )
}