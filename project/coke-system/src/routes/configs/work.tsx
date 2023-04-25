import * as React from 'react';

const workRoutes: ROUTER[] = [
  {
    path: '/development',
    redirect: 'dashboard',
    meta: {
      fullpath: '/development',
      title: '开发',
      is_verify: true,
      is_login: true,
    },
    menu: {
      is_show: true,
      name_c: '开发',
      name_e: 'developement',
      icon: 'icon-code'
    },
    children: [
      {
        path: 'dashboard',
        component: React.lazy(() => import("@/views/single/test")),
        meta: {
          fullpath: '/development/dashboard',
          title: '开发仪表盘',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: true,
          name_c: '开发仪表盘',
          name_e: 'testboard',
          route: '/development/dashboard'
        }
      },
    ]
  },
  {
    path: '/design',
    redirect: 'dashboard',
    meta: {
      fullpath: '/design',
      title: '设计',
      is_verify: true,
      is_login: true,
    },
    menu: {
      is_show: true,
      name_c: '设计',
      name_e: 'design',
      icon: 'icon-ux-design-studio'
    },
    children: [
      {
        path: 'dashboard',
        component: React.lazy(() => import("@/views/single/test")),
        meta: {
          fullpath: '/design/dashboard',
          title: '设计仪表盘',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: true,
          name_c: '设计仪表盘',
          name_e: 'testboard',
          route: '/design/dashboard'
        }
      },
      {
        path: 'login/:id',
        component: React.lazy(() => import("@/views/single/login")),
        meta: {
          fullpath: '/design/login/:id',
          title: '设计详情',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: false,
          name_c: '测试登录',
          name_e: 'testlogin',
          route: '/design/login'
        }
      }
    ]
  },
]

export default workRoutes