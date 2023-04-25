import * as React from "react";
import { observer } from "mobx-react-lite";
import envConfig from "@/settings";
import useStore from "@/stores";

import { menuListType, navListType } from "../types";
import Styles from "./index.module.less";
import { Breadcrumb as AntBreadcrumb, Dropdown as AntDropdown, Menu as AntMenu } from "antd";
import IconFont from "@/components/iconfont";


type propType = {
  Store?: STORE;
  navList?: navListType[];
  menuList?: menuListType[];
};

interface modulePropType extends propType {
  StoreData?: STORE_STATE;
  notice_num?: number;
}

/*面包屑 start***********************************/
const BreadcrumbModule = (prop: modulePropType) => {
  const { Store, menuList } = prop;
  const [activePage, setActivePage] = React.useState({} as menuListType)
  const [pageList, setPageList] = React.useState([])

  // 遍历活跃菜单索引数组，获取活跃菜单路径
  // TODO 刷新页面后面包屑路径不对
  const getActiveList = (id: string[], parent: menuListType[], idx = 0) => {
    const itemId = id.slice(0, idx + 1).join('-')
    const parentItem = parent.find(item => item.id === itemId)
    if (idx < id.length - 1) {
      const beforeArr = idx === 0 ? [] : pageList
      setPageList([...beforeArr, parentItem])
      getActiveList(id, parentItem.children, idx + 1)
    }
    if (idx === id.length - 1) {
      setActivePage(parentItem)
    }
  }

  React.useEffect(() => {
    setPageList([])
    const ids = Store.data.layoutMenuBar.activeId.split('-')
    getActiveList(ids, menuList)
  }, [Store.data.layoutMenuBar.activeId])

  return (
    <div className={window.className([Styles.breadcrumb_box])}>
      <div className={Styles.active_page}>{activePage?.name_c}</div>
      <AntBreadcrumb>
        {pageList.map((item, idx) => {
          return (
            <AntBreadcrumb.Item
              className={Styles.page_item}
              key={`breadcrumbItem-${idx}`}
            >
              {item.name_c}
            </AntBreadcrumb.Item>
          );
        })}
      </AntBreadcrumb>
    </div>
  );
};
/*面包屑 end*************************************/

/*产品导航 start***********************************/
const NavigationModule = observer((prop: modulePropType) => {
  const Store = useStore();
  const { open, visible, activeIdx } = Store.data.layoutNavBar
  
  const toggleOpen = () => {
    Store.toggleNavBar(!open)
  }

  const changeActiveNav = (id: number, idx: number) => {
    if (idx === activeIdx) return
    Store.changeNavBar(id, idx)
  }

  return (
    <div className={window.className([
      Styles.nav_list_box,
      open ? Styles.open : '',
      visible ? Styles.visible : ''
    ])}>
      <div className={Styles.nav_list}>
        <IconFont name="icon-arrow-left" className={Styles.icon} />
        <div className={Styles.nav_item_box}>
          {prop.navList.map((nav, idx) => {
            return (
              <div className={window.className([
                Styles.nav_item,
                activeIdx === idx ? Styles.active : ''
              ])} key={`nav-item-${idx}`}
                onClick={()=>changeActiveNav(nav.id, idx)}
              >
                <IconFont name={nav.icon} className={Styles.icon} />
                <span className={Styles.text}>{nav.name_c}</span>
              </div>
            )
          })}
        </div> 
        <IconFont name="icon-arrow-right" className={Styles.icon} />       
      </div>
      <div className={Styles.toggle_btn} onClick={(e)=>{toggleOpen()}}>
        <div className={Styles.icon_box}>
          <IconFont name={prop.navList[activeIdx].icon} className={window.className([
            Styles.icon,
            open ? Styles.hidden : '',
          ])}/>
          <IconFont name="icon-interface-list" className={Styles.icon}/>
        </div>
      </div>
    </div>
  );
});
/*产品导航 end*************************************/

/*用户头像 start***********************************/
const AvatarMenu = (Store: STORE) => {
  const menuStyle = {
    marginTop: "5px",
    width: "90px",
  };
  return (
    <AntMenu
      style={menuStyle}
      items={[
        {
          label: (
            <div
              onClick={() => {
                // Store.toggleRightPanel(true);
                // Store.changeRightPanelTab(1);
              }}
            >
              个人中心
            </div>
          ),
          key: "ava-menu-item-1",
        },
        {
          label: (
            <div
              onClick={() => {
                // Store.toggleRightPanel(true);
                // Store.changeRightPanelTab(2);
              }}
            >
              设置
            </div>
          ),
          key: "ava-menu-item-2",
        },
        { type: "divider" },
        {
          label: <div>退出</div>,
          key: "ava-menu-item-3",
        },
      ]}
    ></AntMenu>
  );
};

const AvatarModule = (prop: modulePropType) => {
  const { Store, StoreData } = prop;
  const { avatar } = StoreData.user;

  return (
    <div
      className={window.className([
        Styles.user_avatar_box,
        prop.notice_num ? Styles.notice : "",
      ])}
    >
      <AntDropdown dropdownRender={()=>AvatarMenu(Store)} placement="bottomRight">
        <img
          className={Styles.avatar}
          // src={avatar}
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F21%2F20200721225542_2R83m.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680008080&t=cb5ececaaba394418b167f515490387a"
          alt="用户头像"
          onClick={() => {
            Store.toggleRightPanel(true);
            Store.changeRightPanelTab(1);
          }}
        />
      </AntDropdown>
    </div>
  );
};
/*用户头像 end*************************************/

const TopBar = (prop: propType) => {
  const { Store, menuList, navList } = prop;
  const StoreData = Store.data;
  return (
    <>
      <header className={Styles.layout__navbar}>
        {BreadcrumbModule({ Store, StoreData, menuList })}
        {/* 页面栏+导航栏 */}
        <div className={window.className([Styles.list_box])}>
        <NavigationModule navList={navList}/>
        </div>
        {/* {NavigationModule({Store,StoreData,navList})} */}
        
        {AvatarModule({Store,StoreData})}
      </header>
    </>
  );
};

export default observer(TopBar);