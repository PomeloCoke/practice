import * as React from 'react';

const blogRoutes: ROUTER[] = [
  {
    path: '/test',
    redirect: 'dashboard',
    meta: {
      fullpath: '/test',
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
        path: 'dashboard',
        component: React.lazy(() => import("@/views/single/test")),
        meta: {
          fullpath: '/test/dashboard',
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
          fullpath: '/test/login',
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
  {
    path: '/yes',
    redirect: 'dashboard',
    meta: {
      fullpath: '/yes',
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
        path: 'dashboard',
        component: React.lazy(() => import("@/views/single/test")),
        meta: {
          fullpath: '/yes/dashboard',
          title: '测试仪表盘',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: true,
          name_c: '测试仪表盘',
          name_e: 'testboard',
          route: '/yes/dashboard'
        }
      },
      {
        path: 'login/:id',
        component: React.lazy(() => import("@/views/single/login")),
        meta: {
          fullpath: '/yes/login/:id',
          title: '测试登录',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: false,
          name_c: '测试登录',
          name_e: 'testlogin',
          route: '/yes/login'
        }
      }
    ]
  },
]

export default blogRoutes