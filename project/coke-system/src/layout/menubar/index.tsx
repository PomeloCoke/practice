import * as React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import useStore from "@/stores";

import { MenuListData } from "../type";
import IconFont from "@/components/iconfont";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";

type props = {
  menuList: MenuListData[];
};

const menubar = (prop: props) => {
  const store = useStore();
  const { menubar } = store.data.layout;

  const state = useLocalStore(() => ({
    // mock 产品导航列表
    menulist: prop.menuList,
  }));

  return (
    <>
      <div
        className={window.className([
          styles.layout__menubar,
          menubar.status ? styles.active : "",
        ])}
      >
        <div className={styles.menuListBox}>
          {createMenuItem(state.menulist)}
        </div>
      </div>
    </>
  );
};

const createMenuItem = (
  menu: MenuListData[],
  isChild = false,
  id: number[] = []
) => {
  const store = useStore();
  const { menubar } = store.data.layout;

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
    if(menubar.status) store.changeMenuBar(menuIdx, item)
    if(item.children.length == 0) {
      const navigate = useNavigate()
      navigate(item.route, {replace: true})
    }
  };

  return (
    <>
      {menu.map((item, idx) => {
        const menuIdx = [...id, idx];
        const menuKey = `navitem-${menuIdx.join("-")}`;
        let isActive = true;
        menuIdx.map((item, idx) => {
          if (menubar.active[idx] !== item) isActive = false;
        });
        return (
          <div
            className={window.className([
              styles.menuListItem,
              !isChild ? styles.rootList : "",
              isActive ? styles.active : "",
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
                  isActive && hasChild(item) ? styles.active : "",
                ])}
              >
                {hasChild(item) && <IconFont name="icon-arrow-down" />}
              </div>
            </div>
            {hasChild(item) && createMenuItem(item.children, true, menuIdx)}
          </div>
        );
      })}
    </>
  );
};

export default observer(menubar);
