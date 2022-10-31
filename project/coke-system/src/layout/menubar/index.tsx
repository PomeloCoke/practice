import * as React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { menuListType } from "../types";
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
 * @param menuList 菜单列表
 * @param hasChild 判断是否有子项的方法
 * @param clickMenuItem 点击菜单项的方法
 * @param isChild 是子菜单，默认为false
 * @param id 当前菜单ids，默认为空数组
 * @returns 返回菜单列表dom
 */
const createMenuItem = (
  StoreData: STORE_STATE,
  menuList: menuListType[],
  hasChild: hasChildFunction,
  clickMenuItem: createMenuItemFunction,
  isChild = false,
  id: number[] = []
) => {
  const { menuBar } = StoreData.layout;
  return (
    <>
      {menuList.map((item, idx) => {
        const menuIdx = [...id, idx];
        const menuKey = `navitem-${menuIdx.join("-")}`;
        let isActive = true;
        menuIdx.map((item, idx) => {
          if (menuBar.active_item[idx] !== item) isActive = false;
        });
        let isOpen =
          menuBar.active_list.filter((item: Number[]) =>
            _isEqual(item, menuIdx)
          ).length == 1;
        return (
          <div
            className={window.className([
              Styles.menu_list_item,
              !item.is_show ? Styles.hide : "",
              !isChild ? Styles.root_list : "",
              isActive ? Styles.active : "",
              menuBar.status && isOpen ? Styles.open : "",
            ])}
            key={menuKey}
          >
            <div
              className={window.className([
                Styles.menu_item_box,
                !isChild ? Styles.root_item : "",
                isActive ? Styles.active : "",
                !isChild || hasChild(item) ? Styles.parentItem : "",
              ])}
              onClick={() => clickMenuItem(menuIdx, item)}
            >
              <div className={Styles.icon}>
                {item.icon && <IconFont name={item.icon} />}
              </div>
              <div className={Styles.text}>{item.name_c}</div>
              <div
                className={window.className([
                  Styles.more,
                  isOpen && hasChild(item) ? Styles.active : "",
                ])}
              >
                {hasChild(item) && <IconFont name="icon-arrow-down" />}
              </div>
            </div>
            {hasChild(item) && item.is_show &&
              createMenuItem(
                StoreData,
                item.children,
                hasChild,
                clickMenuItem,
                true,
                menuIdx
              )}
          </div>
        );
      })}
    </>
  );
};

const MenuBar = (prop: propType) => {
  const navigate = useNavigate();
  const { Store } = prop;
  const StoreData = Store.data;
  const { menuBar } = StoreData.layout;

  /**
   * 判断是否有子菜单
   * @description 根据数组是否为空来判断
   * @param item 菜单项
   * @returns 子菜单里列表
   */
  const hasChild = (item: menuListType): boolean => {
    return item.children && item.children.length > 0;
  };

  /**
   * 点击菜单项事件
   * @description 点击后判断是打开子菜单列表还是跳转路由
   * @param menuIdx
   * @param item 菜单项
   */
  const clickMenuItem = (menuIdx: number[], item: menuListType) => {
    if (!hasChild(item) && menuBar.status) {
      if (menuBar.status) Store.changeMenuBar(menuIdx, item);
      navigate(item.route, { replace: true });
    } else {
      if (menuBar.status) Store.toggleMenuList(menuIdx);
    }
  };

  return (
    <>
      <div
        className={window.className([
          Styles.layout__menubar,
          menuBar.status ? Styles.active : "",
        ])}
      >
        <div className={Styles.menu_list_box}>
          {createMenuItem(StoreData, prop.menuList, hasChild, clickMenuItem)}
        </div>
      </div>
    </>
  );
};

export default observer(MenuBar);
