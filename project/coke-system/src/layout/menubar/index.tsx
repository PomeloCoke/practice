import * as React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { menuListType } from "../types";
import Styles from "./index.module.less";
import { isEqual as _isEqual } from "lodash";
import type { MenuProps } from "antd";
import { Menu } from 'antd'
import IconFont from "@/components/iconfont";

type propType = {
  Store?: STORE;
  menuList: menuListType[];
};

type menuItemType = Required<MenuProps>['items'][number]

const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?:React.ReactNode,
  children?:menuItemType[],
  type?: 'group'
): menuItemType => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as menuItemType
}

const createMenuList = (menuList: menuListType[]) => {
  let listArr = [] as menuItemType[]
  menuList.map((menu: menuListType) => {
    let childArr = [] as menuItemType[]
    let iconNode: React.ReactNode
    const itemNode = (
      <div>{menu.name_c}</div>
    )
    if (menu.icon) {
      iconNode = <IconFont name={menu.icon} className={Styles.icon} />
    }
    if (menu.children.length > 0) {
      childArr = createMenuList(menu.children)
      listArr.push(
        getMenuItem(
          itemNode,
          menu.id,
          iconNode,
          childArr
        )
      )
    } else {
      listArr.push(
        getMenuItem(
          itemNode,
          menu.id,
          iconNode
        )
      )
    }
  })
  return listArr
}

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

const getActiveIds = (id: string):string[]=> {
  const idsVal = id.split('-')
  let idsArr = [] as string[]
  let prev = ''
  idsVal.forEach((item: string) => {
    prev = prev ? prev + '-' + item : item
    idsArr.push(prev)
  })
  return idsArr
}

const getRootIds = (menuList: menuListType[]):string[] => {
  let idsArr = [] as string[]
  menuList.forEach((item: menuListType) => {
    idsArr.push(item.id)
  })
  return idsArr
}

const MenuBar = (prop: propType) => {
  const navigate = useNavigate();
  const { Store } = prop;
  const StoreData = Store.data;
  const { layoutMenuBar } = StoreData;
  const [activeId, setActiveId] = React.useState('')
  const [openKeys, setOpenKeys] = React.useState([''])
  const rootMenuKeys = getRootIds(prop.menuList)
  
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootMenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  React.useEffect(() => {
    // 进入页面初始化活跃菜单
    if (layoutMenuBar.activeId) {
      setActiveId(layoutMenuBar.activeId)
    } else {
      const activeMenuList = prop.menuList[0];
      setActiveId(getActiveId(activeMenuList))
    }
    setOpenKeys(getActiveIds(activeId))
  },[activeId])
  console.log('getMenuList',prop.menuList[0],activeId)

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
            <Menu
            // defaultSelectedKeys={[activeId]}
            selectedKeys={[activeId]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            mode="inline"
            inlineCollapsed={!layoutMenuBar.open}
              items={createMenuList(prop.menuList)}
            />
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
