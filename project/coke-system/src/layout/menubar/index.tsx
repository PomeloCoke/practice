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

type itemPropType = {
  menuItem: menuListType,
  level?: number,
  activeChildId: string,
  onActiveChildClick:React.Dispatch<React.SetStateAction<string>>,
  prevKeyName?: string
}

const menuContext = React.createContext({
  activeId: '',
  setActiveId(id: string) {
    this.activeId = id
  },
})

/**
 * 创建菜单项
 * @description 递归创建菜单子项dom
 * @param menuItem 菜单列表
 * @returns 返回菜单列表dom
 */
const CreateMenuItem = (
  props: itemPropType
) => {
  const { menuItem, level, prevKeyName } = props
  const {activeId, setActiveId} = React.useContext(menuContext)
  const [activeChild, setActiveChild] = React.useState('')
  const menuLevel = level + 1 // 菜单层级
  React.useEffect(() => {
    const childId = activeId.split('-').slice(0,menuLevel + 1).join('-')
    console.log('getChildId',childId)
    setActiveChild(childId)
  },[activeId])

  const keyName = `${prevKeyName}-${menuItem.id}`;
  let childEl = [] as React.ReactNode[];

  const createChildList = () => {
    childEl = []
    menuItem.children.map((childItem: menuListType,idx: number) => {
      childEl.push(
        <CreateMenuItem 
        menuItem={childItem} 
        level={level + 1} 
        prevKeyName={keyName} 
        activeChildId={activeChild}
        onActiveChildClick={setActiveChild}
        key={`${keyName}-${idx}`}></CreateMenuItem>
      );
    });
  }

  // 判断是否有子菜单列表
  if (menuItem.children.length > 0) {
    createChildList()
  }

  const getClickItem = () => {
    props.onActiveChildClick(menuItem.id)
    if (menuItem.children.length === 0) {
      setActiveId(menuItem.id)
    }
  };

  return (
    <div
      className={window.className([
        Styles.menu_item,
        level === 1 ? Styles.menu_item_root : Styles.menu_item_child,
        props.activeChildId === menuItem.id ? Styles.active : Styles.fallow,
        activeId === menuItem.id ? 'active_route' : ''
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
  );
};

/**
 * 获取初始化活跃菜单链表
 * @description 递归获取活跃菜单项
 * @param activeMenuList 菜单列表
 * @returns 返回活跃菜单链表
 */
const getActiveId = (activeMenuList: menuListType):string => {
  if (activeMenuList.children.length > 0) {
    return getActiveId(activeMenuList.children[0])
  } else {
    return activeMenuList.id
  }
  // return activeMenuList.id
};

const MenuBar = (prop: propType) => {
  const navigate = useNavigate();
  const { Store } = prop;
  const StoreData = Store.data;
  const { layoutMenuBar } = StoreData;
  const MenuContext = React.useContext(menuContext)
  const [activeChild, setActiveChild] = React.useState('')
  const menuLevel = 1 // 菜单层级

  // 进入页面初始化活跃菜单
  if (layoutMenuBar.activeId) {
    MenuContext.activeId = layoutMenuBar.activeId
  } else {
    const activeMenuList = prop.menuList[0];
    MenuContext.activeId = getActiveId(activeMenuList);
  }

  React.useEffect(() => {
    const childId = MenuContext.activeId.split('-').slice(0,menuLevel + 1).join('-')
    console.log('getChildId',childId)
    setActiveChild(childId)
  },[MenuContext.activeId])
  console.log('getMenuList',prop.menuList[0],MenuContext.activeId)

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
            {
              prop.menuList.map((menuItem: menuListType, idx: number) => 
                {return (
                <CreateMenuItem 
                menuItem={menuItem} 
                level={menuLevel} 
                prevKeyName={'menu-item'} 
                activeChildId={activeChild}
                onActiveChildClick={setActiveChild}
                key={`menu-item-${idx}`}></CreateMenuItem>
                )}
              )
            }
            <div className={Styles.menu_bg_root}></div>
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
