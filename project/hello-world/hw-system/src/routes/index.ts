import * as React from 'react';
import { NavigateFunction } from 'react-router-dom';

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
      title: '仪表盘',
      authority: true
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

export const beforeEach = (
  location: any,
  navigate: NavigateFunction,
  routes: ROUTER[]
) => {
  const { pathname } = location
  const routeInfo = routeSearch(pathname, routes)

  // TODO 404页面
  if (!routeInfo) return false

  if (routeInfo.meta.authority) {
    // TODO 接口校验token是否有效
    const token = localStorage.getItem('test_token')
    if (!token) {
      console.log('token无效，登录')
      navigate('/login', { replace: true })
      return false
    }
  }

  return true
}

export function routeSearch (path: string, routes: ROUTER[]): ROUTER | null {
  for (let item of routes) {
    if (item.path === path) return item
    if (item.children) return routeSearch(path, item.children)
  }
  return null
}