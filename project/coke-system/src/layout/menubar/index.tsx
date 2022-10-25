import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer, useLocalStore } from "mobx-react-lite";
import useStore from "@/stores";

import { isEqual as _isEqual } from "lodash"
import { MenuListData } from "../type";
import IconFont from "@/components/iconfont";
import styles from "./index.module.less";

type props = {
  menuList: MenuListData[];
};

type hasChildFunction = (item: MenuListData) => boolean
type createMenuItemFunction = (menuIdx: number[], item: MenuListData) => void

const menubar = (prop: props) => {
  const store = useStore();
  const navigate = useNavigate()
  const { menubar } = store.data.layout;

  const state = useLocalStore(() => ({
    // mock 产品导航列表
    menulist: prop.menuList,
  }));

  /**
   * @description 判断是否有子菜单
   * @param item 菜单项
   * @returns 
   */
   const hasChild = (item: MenuListData): boolean => {
    return item.children && item.children.length > 0;
  };

  /**
   * @description 点击菜单
   * @param menuIdx
   * @param type 菜单类型 1=>无子菜单 2=>有子菜单
   */
  const clickMenuItem = (menuIdx: number[], item: MenuListData) => {
    
    if(!hasChild(item)) {
      if(menubar.status) store.changeMenuBar(menuIdx, item)
      navigate(item.route, {replace: true})
    } else {
      if(menubar.status) store.toggleMenuList(menuIdx)
    }
  };

  return (
    <>
      <div
        className={window.className([
          styles.layout__menubar,
          menubar.status ? styles.active : "",
        ])}
      >
        <div className={styles.menuListBox}>
          {createMenuItem(
            state.menulist,
            hasChild,
            clickMenuItem)}
        </div>
      </div>
    </>
  );
};


const createMenuItem = (
  menu: MenuListData[],
  hasChild:hasChildFunction,
  clickMenuItem:createMenuItemFunction,
  isChild = false,
  id: number[] = []
) => {
  const store = useStore();
  const { menubar } = store.data.layout;

  return (
    <>
      {menu.map((item, idx) => {
        const menuIdx = [...id, idx];
        const menuKey = `navitem-${menuIdx.join("-")}`;
        let isActive = true;
        menuIdx.map((item, idx) => {
          if (menubar.active_item[idx] !== item) isActive = false;
        });
        let isOpen = menubar.active_list.filter((item:Number[])=>_isEqual(item, menuIdx)).length == 1
        return (
          <div
            className={window.className([
              styles.menuListItem,
              !isChild ? styles.rootList : "",
              isActive ? styles.active : "",
              (menubar.status && isOpen) ? styles.open : ""
            ])}
            key={menuKey}
          >
            <div
              className={window.className([
                styles.menuItemBox,
                !isChild ? styles.rootItem : "",
                isActive ? styles.active : "",
                !isChild || hasChild(item) ? styles.parentItem : ""
              ])}
              onClick={() => clickMenuItem(menuIdx, item)}
            >
              <div className={styles.icon}>
                {item.icon && <IconFont name={item.icon} />}
              </div>
              <div className={styles.text}>{item.name_c}</div>
              <div
                className={window.className([
                  styles.more,
                  // isActive && hasChild(item) ? styles.active : "",
                  isOpen && hasChild(item) ? styles.active : ""
                ])}
              >
                {hasChild(item) && <IconFont name="icon-arrow-down" />}
              </div>
            </div>
            {hasChild(item) && createMenuItem(item.children,hasChild, clickMenuItem, true, menuIdx)}
          </div>
        );
      })}
    </>
  );
};

export default observer(menubar);
