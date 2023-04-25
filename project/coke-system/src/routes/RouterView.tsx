
import * as React from 'react';

import { routeGurad } from './utils';
import LayoutLoading from "@/layout/Loading";

type propType = {
  routes: ROUTER[]
}

export default function RouterView(prop: propType) {
  const { routes } = prop
  return (
    <>
    {routeGurad(routes)}
    </>
  )
}