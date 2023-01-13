import * as React from "react";
import { useNavigate } from "react-router-dom";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";

import { menuListType, activeMenuItemType } from "../types";
import Styles from "./index.module.less";
import { isEqual as _isEqual } from "lodash";
import IconFont from "@/components/iconfont";


type propType = {
  Store?: STORE;
  menuList: menuListType[];
};

type hasChildFunction = (item: menuListType) => boolean;
type createMenuItemFunction = (menuIdx: number[], item: menuListType) => void;
/**
 * 创建菜单项
 * @description 递归创建菜单子项dom
 * @param StoreData 状态管理数据
 * @param menuItem 菜单列表
 * @param clickMenuItem 点击菜单项的方法
 * @returns 返回菜单列表dom
 */
const createMenuItem = (
  initActiveMenuChain: activeMenuItemType[],
  menuItem: menuListType,
  // clickMenuItem: createMenuItemFunction,
  level: number = 1,
  prevKeyName: string = "menu-item"
) => {
  const state = useLocalObservable(() => ({
    open: false,
  }));
  const initChainItem = initActiveMenuChain[level - 1];
  const keyName = `${prevKeyName}-${menuItem.id}`;
  let childEl = [] as React.ReactNode[];

  // 判断是否为初始化活跃菜单
  if (initChainItem && menuItem.id === initChainItem.id) {
    runInAction(() => {
      state.open = true
    })
  }

  // 判断是否有子菜单列表
  // React.useEffect(() => {
    if (menuItem.children.length > 0) {
      menuItem.children.map((childItem: menuListType) => {
        childEl.push(
          createMenuItem(initActiveMenuChain, childItem, level + 1, keyName)
        );
      });
    }
  // })
  
  const getClickItem = (id: number) => {
    runInAction(() => {
      state.open = !state.open
    })
    
  }
  return (
    <div
      className={window.className([
        Styles.menu_item,
        level === 1 ? Styles.menu_item_root : Styles.menu_item_child,
        state.open ? Styles.active : "",
      ])}
      key={keyName}
      onClick={()=>{getClickItem(menuItem.id)}}
    >
      <div className={Styles.menu_info}>
        {menuItem.icon && (
          <IconFont name={menuItem.icon} className={Styles.icon} />
        )}
        {
          <div className={window.className([Styles.name, "line-1"])}>
            {menuItem.name_c}
          </div>
        }
        {childEl.length > 0 && (
          <IconFont name="icon-arrow-down" className={Styles.arrow} />
        )}
      </div>
      {childEl.length > 0 &&
        childEl.map((childItemEl) => {
          return childItemEl;
        })}
    </div>
  );
};

/**
 * 获取初始化活跃菜单链表
 * @description 递归获取活跃菜单项
 * @param activeMenuList 菜单列表
 * @returns 返回活跃菜单链表
 */
const getActiveMenuChain = (activeMenuList: menuListType) => {
  let currentMenu = [] as activeMenuItemType[];
  const getActiveMenuItem = (activeMenuItem: menuListType) => {
    let currentItem = {} as activeMenuItemType;
    currentItem.id = activeMenuItem.id;
    currentItem.open = true;
    currentItem.info = {
      icon: activeMenuItem.icon,
      name_c: activeMenuItem.name_c,
      name_e: activeMenuItem.name_e,
    };
    if (activeMenuItem.children.length > 0) {
      currentItem.nextId = activeMenuItem.children[0].id;
      currentMenu.push(currentItem);
      getActiveMenuItem(activeMenuItem.children[0]);
    } else {
      currentItem.nextId = null;
      currentItem.info.path = activeMenuItem.route;
      currentMenu.push(currentItem);
    }
  };
  getActiveMenuItem(activeMenuList);
  return currentMenu;
};

const MenuBar = (prop: propType) => {
  const navigate = useNavigate();
  const { Store } = prop;
  const StoreData = Store.data;
  const { layoutMenuBar } = StoreData;
  const state = useLocalObservable(() => ({
    currentMenu: [] as activeMenuItemType[],
  }));

  React.useEffect(() => {
  // 进入页面初始化活跃菜单
  if (layoutMenuBar.activeItem.length > 0) {
    state.currentMenu = layoutMenuBar.activeItem;
  } else {
    const activeMenuList = prop.menuList[0];
    runInAction(() => {
      state.currentMenu = getActiveMenuChain(activeMenuList);
    })
    
  }
  console.log("getMenuChain", state.currentMenu);
  })

  return (
    <>
      <div
        className={window.className([
          Styles.layout__menubar_1,
          layoutMenuBar.open ? Styles.open : Styles.close,
          layoutMenuBar.visible ? Styles.visible : Styles.invisible,
        ])}
      >
        <div className={Styles.slot__top}>
          <IconFont name="icon-logo" className={Styles.logo} />
          <div className={Styles.text}>POMELODE</div>
        </div>
        <div className={Styles.slot__mid}>
          <div className={Styles.active_item_bg}></div>
          <div className={Styles.menu_list}>
            {/* {prop.menuList.map((menuItem: menuListType) => {
              return createMenuItem(state.currentMenu, menuItem);
            })} */}
          </div>
        </div>
        <div className={Styles.slot__bottom}>
          <div className={Styles.log_out_btn}>
            <IconFont name="icon-interfaces-sign-out" className={Styles.logo} />
            <div className="text">退出系统</div>
          </div>
        </div>

        <div
          className={Styles.toggle_open_btn}
          onClick={() => Store.toggleMenuBar(layoutMenuBar.open ? false : true)}
        >
          <IconFont
            name={"icon-menu-" + (layoutMenuBar.open ? "close" : "open")}
            className={Styles.logo}
          />
        </div>
      </div>
    </>
  );
};

export default observer(MenuBar);
