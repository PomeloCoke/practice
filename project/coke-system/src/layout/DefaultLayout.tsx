import * as React from "react";
import { routes } from "@/routes";
import { observer, useLocalObservable } from "mobx-react-lite";
import useStore from "@/stores";

import "./index.less";
import getMenuList from "./MenuBar/configs";
import RouterView from "@/routes/RouterView";
import NavBar from "./NavBar";
import MenuBar from "./MenuBar";
import PageBar from './PageBar'
import RightPanel from "./RightPanel";

const DefaultLayout = () => {
  const Store = useStore();
  const state = useLocalObservable(() => ({
    // mock 产品导航列表
    navList: [
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
    // TODO 后期需要跟接口配合展示该用户可见菜单
    menuList: getMenuList(1),
  }));

  return (
    <div className="layout__default__container">
      <NavBar Store={Store} navList={state.navList} menuList={state.menuList} />
      <div className="layout__main">
        <MenuBar Store={Store} menuList={state.menuList} />
        <div className="layout__slot__mid">
          <PageBar Store={Store} />
          <RouterView routes={routes} />
        </div>
      </div>
      <RightPanel />
    </div>
  );
};

export default observer(DefaultLayout);
