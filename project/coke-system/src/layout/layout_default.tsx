import * as React from 'react'; 
import { useState } from 'react';
import { routes } from '@/routes';
import { observer, useLocalStore } from 'mobx-react-lite';

import getMenuList from './menubar/config';
import RouterView from '@/routes/view_util';
import NavBar from './navbar'
import MenuBar from './menubar'
import RightPanel from './right_panel'
import './index.less'


const defaultLayout = () => {
  const menuList = getMenuList('blog')
  const state = useLocalStore(() => ({
    // mock 产品导航列表
    navlist: [
      {
        id: 1,
        name_c: "博客",
        name_e: "blog",
        icon: "icon-edit-square",
      },
      {
        id: 2,
        name_c: "时间管理",
        name_e: "time_management",
        icon: "icon-time-circle",
      },
    ],
    // mock 菜单列表
    menulist: menuList
  }));

  return (
    <div className="layout__default__container">
      <NavBar navList={state.navlist} menuList={state.menulist}/>
      <div className='layout__main'>
        <MenuBar menuList={state.menulist}/>
        <div className='layout__slot__mid'>
        <RouterView routes={routes}/>
        </div>
      </div>
      <RightPanel/>
    </div>
  )
}

export default observer(defaultLayout)