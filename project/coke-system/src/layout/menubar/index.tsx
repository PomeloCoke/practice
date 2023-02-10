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

type itemPropType = {
  menuItem: menuListType,
  level?: number,
  activeChildId: string,
  onActiveChildClick:React.Dispatch<React.SetStateAction<string>>,
  prevKeyName?: string
}

type menuItemType = Required<MenuProps>['items'][number]

const menuContext = React.createContext({
  activeId: '',
  height: 0,
  setActiveId(id: string) {
    this.activeId = id
  },
  setHeight(height: number) {
    this.height = height
  } 
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
  const [height, setHeight] = React.useState(0)
  const labelRef = React.useRef<HTMLDivElement>(null)
  const ref = React.useRef<HTMLDivElement>(null)
  const menuLevel = level + 1 // 菜单层级
  const keyName = `${prevKeyName}-${menuItem.id}`;
  let childEl = [] as React.ReactNode[];

  React.useEffect(() => {
    const childId = activeId.split('-').slice(0,menuLevel + 1).join('-')
    setActiveChild(childId)
  },[activeId])

  React.useEffect(()=> {
    setHeight(ref.current?.scrollHeight)
    
  })
  
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
    // culListHeight()
    if (menuItem.children.length === 0) {
      setActiveId(menuItem.id)
    } else {

    }
  };

  return (
    <div
      // style={{
      //   height: height + 'px'
      // }}
      ref={ref}
      className={window.className([
        Styles.menu_item,
        level === 1 ? Styles.menu_item_root : Styles.menu_item_child,
        props.activeChildId === menuItem.id ? Styles.active : Styles.fallow,
        activeId === menuItem.id ? 'active_route' : ''
      ])}
    >
      <div
        ref={labelRef}
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
            {menuItem.name_c}{height}
          </div>
        }
        {childEl.length > 0 && (
          <IconFont name="icon-arrow-down" className={Styles.arrow} />
        )}
      </div>
      <div className={Styles.menu_child_list}>
      {childEl.length > 0 &&
        childEl.map((childItemEl) => {
          return childItemEl;
        })}
      </div>
    </div>
  );
};

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
            {/* <div className={Styles.menu_bg_root}></div> */}
            <Menu
            defaultSelectedKeys={[MenuContext.activeId]}
            defaultOpenKeys={[MenuContext.activeId]}
            mode="inline"
            
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
