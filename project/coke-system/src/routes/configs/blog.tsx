import * as React from 'react';

const blogRoutes: ROUTER[] = [
  {
    path: '/test',
    redirect: 'dashboard',
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
        path: 'dashboard',
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
          route: 'test/dashboard'
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
          route: 'test/login'
        }
      }
    ]
  },
  {
    path: '/yes',
    redirect: 'dashboard',
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
        path: 'dashboard',
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
          route: 'yes/dashboard'
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
          route: 'yes/login'
        }
      }
    ]
  },
]

export default blogRoutes