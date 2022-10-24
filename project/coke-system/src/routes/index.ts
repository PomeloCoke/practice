import * as React from 'react';
import { NavigateFunction } from 'react-router-dom';

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

export const blogRoutes: ROUTER[] = [
  {
    path: '/test',
    redirect: 'dashborad',
    meta: {
      title: '测试页面',
      is_verify: true,
      is_login: true,
    },
    menu: {
      is_show: true,
      name_c: '测试测试',
      name_e: 'test',
      icon: 'icon-question-circle'
    },
    children: [
      {
        path: 'dashborad',
        component: React.lazy(() => import("@/views/single/test")),
        meta: {
          title: '测试仪表盘',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: true,
          name_c: '测试仪表盘',
          name_e: 'testboard',
          route: '/test/dashboard'
        }
      },
      {
        path: 'login',
        component: React.lazy(() => import("@/views/single/login")),
        meta: {
          title: '测试登录',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: true,
          name_c: '测试登录',
          name_e: 'testlogin',
          route: '/test/login'
        }
      }
    ]
  },
]

export const routes: ROUTER[] = [
  ...defaultRoutes,
  ...blogRoutes
]

/**
 * 路由前置钩子函数
 * @description 在路由跳转前进行检验：1=>路由是否存在 2=>路由是否要登录&&token是否有效
 * @param location 活跃路由信息
 * @param navigate 路由方法
 * @param routes 路由列表
 * @param storeData 状态管理store
 * @returns 
 */
export const beforeEach = (
  location: any,
  navigate: NavigateFunction,
  routes: ROUTER[],
  storeData: STORE_STATE
) => {
  const { pathname } = location
  const routeInfo = routeSearch(pathname, routes)

  // TODO 404页面
  if (!routeInfo) return false

  if (routeInfo.meta.is_login) {
    // TODO 接口校验token是否有效
    const token = storeData.user.token
    if (!token) {
      console.log('token无效，登录', storeData.user)
      navigate('/login', { replace: true })
      return false
    }
  }

  document.title = routeInfo.meta.title
  return true
}

/**
 * 路由查找
 * @description 在路由列表中查找路由是否存在
 * @param path 需要查找的路由名
 * @param routes 路由列表
 * @returns if 存在=>返回该路由的信息 else=>返回null
 */
export function routeSearch (path: string, routes: ROUTER[]): ROUTER | null {
  for (let item of routes) {
    if (item.path === path) return item
    if (item.children) return routeSearch(path, item.children)
  }
  return null
}