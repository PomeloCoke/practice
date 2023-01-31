import * as React from "react";
import { useNavigate } from "react-router-dom";
import { makeAutoObservable, runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";

import { menuListType, activeMenuItemType } from "../types";
import Styles from "./index.module.less";
import { isEqual as _isEqual } from "lodash";
import IconFont from "@/components/iconfont";

type propType = {
  Store?: STORE;
  menuList: menuListType[];
};

type itemPropType = {
  menuItem: menuListType,
  menuContext: menuContextType,
  level?: number,
  prevKeyName?: string
}

type menuContextType = {
  clickCount: number,
  initActiveMenuChain: activeMenuItemType[],
  setInitActiveMenuChain(menuChain: activeMenuItemType[]): void,
  setClickCount(): void
}

const MenuStore = {
  clickCount: 0,
  initActiveMenuChain: [] as activeMenuItemType[],
  setInitActiveMenuChain(menuChain: activeMenuItemType[]) {
    this.initActiveMenuChain = menuChain
  },
  setClickCount() {
    this.clickCount++
  }
}

const MenuValue = React.createContext(MenuStore)

/**
 * 创建菜单项
 * @description 递归创建菜单子项dom
 * @param menuItem 菜单列表
 * @param clickMenuItem 点击菜单项的方法
 * @returns 返回菜单列表dom
 */
const CreateMenuItem = (
  props: itemPropType
) => {
  const MenuContext = React.useContext(MenuValue)
  const { menuItem, level, prevKeyName } = props
  const state = useLocalObservable(() =>({
    open: false,
    clickCount: 0,
    activeChild: 0,
  }));
  const initChainItem = MenuContext.initActiveMenuChain[level - 1];
  const keyName = `${prevKeyName}-${menuItem.id}`;
  let childEl = [] as React.ReactNode[];
  console.log('获取活跃菜单链表',MenuContext.clickCount)

  const createChildList = () => {
    childEl = []
    menuItem.children.map((childItem: menuListType,idx: number) => {
      childEl.push(
        <CreateMenuItem menuItem={childItem} level={level + 1} prevKeyName={keyName} menuContext={MenuContext} key={`${keyName}-${idx}`}></CreateMenuItem>
      );
    });
  }

  React.useEffect(() => {
    console.log('获取活跃菜单链表',MenuContext.clickCount)
  },[MenuContext.clickCount])
  if (
    initChainItem &&
    !state.clickCount &&
    MenuContext.clickCount &&
    menuItem.id === initChainItem.id
  ) {
    runInAction(() => {
      state.open = true;
    });
  }

  // 判断是否有子菜单列表
  if (menuItem.children.length > 0) {
    runInAction(() => {
      state.activeChild = initChainItem.nextId;
    });
    createChildList()
  }


  const getClickItem = () => {
    if (menuItem.children.length > 0) {
      MenuContext.setClickCount()
      console.log('获取活跃菜单链表',MenuContext.clickCount)
      runInAction(() => {
        if (
          menuItem.id === initChainItem.id &&
          !state.clickCount &&
          !MenuContext.clickCount
        ) {
          state.open = false;
        } else {
          state.open = !state.open;
          // closeMenuItem(menuItem.id);
        }
        state.clickCount++;
        
      });
    }
  };

  return (
    <MenuValue.Provider value={MenuStore}>
    <div
      className={window.className([
        Styles.menu_item,
        level === 1 ? Styles.menu_item_root : Styles.menu_item_child,
        initChainItem && menuItem.id === initChainItem.id
          ? Styles.active_init
          : "",
        // state.open ? Styles.active : (!state.open &&state.clickCount ? Styles.fallow : ''),
        initChainItem && MenuContext.clickCount === 0 && menuItem.id === initChainItem.id
          ? "active_init"
          : initChainItem && MenuContext.clickCount && menuItem.id === initChainItem.id
          ? ""
          : "",
        state.open
          ? "active"
          : state.clickCount
          ? "fallow"
          : "",
        // clickCount ? (state.open ? 'active' : 'fallow') : ''
      ])}
    >
      <div
        className={Styles.menu_info}
        onClick={(e) => {
          e.stopPropagation();
          getClickItem();
        }}
      >
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
    </MenuValue.Provider>
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
  const menuContext = React.useContext(MenuValue)
  let currentMenu = [] as activeMenuItemType[];

  // 进入页面初始化活跃菜单
  if (layoutMenuBar.activeItem.length > 0) {
    currentMenu = layoutMenuBar.activeItem;
    menuContext.setInitActiveMenuChain(layoutMenuBar.activeItem)
  } else {
    const activeMenuList = prop.menuList[0];
    currentMenu = getActiveMenuChain(activeMenuList);
    menuContext.setInitActiveMenuChain(getActiveMenuChain(activeMenuList))
  }

  
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
          <div className={Styles.menu_list}>{
            prop.menuList.map((menuItem: menuListType, idx: number) => 
              {return (
              <CreateMenuItem menuItem={menuItem} level={1} prevKeyName={'menu-item'} menuContext={menuContext} key={`menu-item-${idx}`}></CreateMenuItem>
              )}
            )
          }</div>
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
