import * as React from 'react';

const workRoutes: ROUTER[] = [
  {
    path: '/development',
    redirect: 'dashboard',
    meta: {
      fullpath: '/development',
      title: '测试页面',
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
          title: '测试仪表盘',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: true,
          name_c: '测试仪表盘',
          name_e: 'testboard',
          route: '/development/dashboard'
        }
      },
      {
        path: 'login',
        redirect: 'dashboard',
        component: React.lazy(() => import("@/views/single/login")),
        meta: {
          fullpath: '/development/login',
          title: '测试登录',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: true,
          name_c: '测试登录',
          name_e: 'testlogin',
          icon: 'icon-code'
          // route: '/development/login'
        },
        children: [
          {
            path: 'dashboard',
            component: React.lazy(() => import("@/views/single/test")),
            meta: {
              fullpath: '/development/login/dashboard',
              title: '测试仪表盘',
              is_verify: true,
              is_login: true,
            },
            menu: {
              is_show: true,
              name_c: '测试仪表盘',
              name_e: 'testboard',
              route: '/development/login/dashboard'
            }
          },
          {
            path: 'login',
            component: React.lazy(() => import("@/views/single/login")),
            meta: {
              fullpath: '/development/login/login',
              title: '测试登录',
              is_verify: true,
              is_login: true,
            },
            menu: {
              is_show: true,
              name_c: '测试登录',
              name_e: 'testlogin',
              route: '/development/login/login'
            },
            
          }
        ]
      }
    ]
  },
  {
    path: '/design',
    redirect: 'dashboard',
    meta: {
      fullpath: '/design',
      title: '测试页面',
      is_verify: true,
      is_login: true,
    },
    menu: {
      is_show: true,
      name_c: '测试测试',
      name_e: 'design',
      icon: 'icon-question-circle'
    },
    children: [
      {
        path: 'dashboard',
        component: React.lazy(() => import("@/views/single/test")),
        meta: {
          fullpath: '/design/dashboard',
          title: '测试仪表盘',
          is_verify: true,
          is_login: true,
        },
        menu: {
          is_show: true,
          name_c: '测试仪表盘',
          name_e: 'testboard',
          route: '/design/dashboard'
        }
      },
      {
        path: 'login/:id',
        component: React.lazy(() => import("@/views/single/login")),
        meta: {
          fullpath: '/design/login/:id',
          title: '测试登录',
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