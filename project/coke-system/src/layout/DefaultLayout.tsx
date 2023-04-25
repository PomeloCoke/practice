import * as React from "react";
import { routes } from "@/routes";
import { observer, useLocalObservable } from "mobx-react-lite";
import useStore from "@/stores";

import "./index.less";
import getMenuList from "./menuBar/configs";
import RouterView from "@/routes/RouterView";
import NavBar from "./topBar";
import MenuBar from "./menuBar";
import PageBar from './PageBar'
import RightPanel from "./RightPanel";
import { menuListType } from "./types";

const DefaultLayout = () => {
  const Store = useStore();
  const state = useLocalObservable(() => ({
    // mock 产品导航列表
    navList: [
      {
        id: 1,
        name_c: "工作中台",
        name_e: "work_stages",
        icon: "icon-nav-work-stage",
      },
      {
        id: 2,
        name_c: "博客",
        name_e: "blog",
        icon: "icon-nav-blog",
      }
    ],
    // mock 菜单列表
    // TODO 后期需要跟接口配合展示该用户可见菜单
    menuList: getMenuList(1),
  }));
  const [menuList, setMenuList] = React.useState(getMenuList(Store.data.layoutNavBar.activeId))
    React.useEffect(() => {
      setMenuList(getMenuList(Store.data.layoutNavBar.activeId))
    },[Store.data.layoutNavBar.activeId])
  return (
    <div className="layout__default__container">
      
      <MenuBar Store={Store} menuList={menuList} />
      <div className="layout__main">
        <NavBar Store={Store} navList={state.navList} menuList={menuList} />
        <div className="layout__slot__mid">
          {/* <PageBar Store={Store} /> */}
          <RouterView routes={routes} />
        </div>
      </div>
      <RightPanel />
    </div>
  );
};

export default observer(DefaultLayout);
