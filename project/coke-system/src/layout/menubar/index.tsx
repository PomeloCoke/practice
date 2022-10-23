import * as React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import useStore from "@/stores";

import { MenuListData } from "../type";
import IconFont from "@/components/iconfont";
import styles from "./index.module.less";

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

const createMenuItem = (menu: MenuListData[], isChild = false, id:number[] = []) => {
  const store = useStore();
  const { menubar } = store.data.layout;
  return (
    <>
      {menu.map((item, idx) => {
        const menuIdx = [...id,idx]
        const menuKey = `navitem-${menuIdx.join('-')}`
        
        console.log('getMenuKey', menuKey)
        let isActive = true
        menuIdx.map((item, idx)=> {
          if (menubar.active[idx] !== item) isActive = false
        })
        return (
          <div
            className={window.className([
              styles.menuListItem,
              !isChild ? styles.rootList : "",
              isActive ? styles.active : ""
            ])}
            key={menuKey}
          >
            <div className={window.className([
              styles.menuItemBox,
              !isChild ? styles.rootItem : "",
              isActive ? styles.active : ""
            ])}>
              <div className={styles.icon}>
                {item.icon && <IconFont name={item.icon} />}
              </div>
              <div className={styles.text}>{item.name_c}</div>
              <div className={styles.more}>
                {item.children && item.children.length > 0 && (
                  <IconFont name="icon-arrow-down" />
                )}
              </div>
            </div>
            {item.children &&
              item.children.length > 0 &&
              createMenuItem(item.children, true, menuIdx)}
          </div>
        );
      })}
    </>
  );
};

export default observer(menubar);
