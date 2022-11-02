import * as React from "react";
import { observer } from "mobx-react-lite";
import envConfig from "@/settings";

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

/*logo start***********************************/
const LogoModule = (prop: modulePropType) => {
  const { StoreData } = prop;
  const { menuBar } = StoreData.layout;
  return (
    <div
      className={window.className([
        Styles.logo_box,
        menuBar.status ? Styles.active : "",
      ])}
    >
      {/* logo图片 */}
      <div
        className={window.className([
          Styles.logo_img,
          envConfig.envAlias != "prod" ? Styles[envConfig.envAlias] : "",
        ])}
      ></div>
      {/* logo文字 */}
      <div className={Styles.logo_text}>Pomelode</div>
    </div>
  );
};
/*logo end*************************************/

/*面包屑 start***********************************/
/**
 * 获取子菜单列表
 * @param item 父菜单项
 * @param idx 子菜单项索引
 * @returns {menuListType} 子菜单项
 */
const getParentItem = (item: menuListType, idx: number): menuListType => {
  return item.children[idx];
};

const BreadcrumbModule = (prop: modulePropType) => {
  const { Store, StoreData } = prop;
  const { menuBar } = StoreData.layout;
  let page_list: menuListType[] = [];
  let parentItem = prop.menuList[menuBar.active_item[0]];
  // 遍历活跃菜单索引数组，获取活跃菜单路径
  for (let i = 0; i < menuBar.active_item.length; i++) {
    if (i === 0) {
      parentItem = prop.menuList[menuBar.active_item[0]];
      page_list.push(parentItem);
    }
    if (i != 0 && parentItem.children.length > 0) {
      parentItem = getParentItem(parentItem, menuBar.active_item[i]);
      page_list.push(parentItem);
    } else if (i != 0 && parentItem.children.length === 0) {
      break;
    }
  }

  return (
    <div className={window.className([Styles.breadcrumb_box])}>
      <div
        className={Styles.icon}
        onClick={() => Store.toggleMenuBar(!menuBar.status)}
      >
        {menuBar.status ? (
          <IconFont name="icon-outdent" />
        ) : (
          <IconFont name="icon-indent" />
        )}
      </div>
      <div className={Styles.page_list}>
        <AntBreadcrumb>
          {page_list.map((item, idx) => {
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
    </div>
  );
};
/*面包屑 end*************************************/

/*产品导航 start***********************************/
const NavigationModule = (prop: modulePropType) => {
  const { StoreData } = prop;
  const { navBar } = StoreData.layout;
  return (
    <div className={Styles.nav_list_box}>
      {prop.navList.map((item, idx) => {
        return (
          <div className={Styles.nav_item_box} key={`navitem-${idx}`}>
            <nav
              className={window.className([
                Styles.nav_item,
                navBar.active === idx ? Styles.active : "",
              ])}
            >
              <IconFont className={Styles.icon} name={item.icon} />
              <div className={Styles.text}>{item.name_c}</div>
            </nav>
          </div>
        );
      })}
    </div>
  );
};
/*产品导航 end*************************************/

/*用户头像 start***********************************/
const AvatarMenu = (Store: STORE) => {
  const menuStyle = {
    marginTop: "5px",
    width: "80px",
  };
  return (
    <AntMenu
      style={menuStyle}
      items={[
        {
          label: (
            <div
              onClick={() => {
                Store.toggleRightPanel(true);
                Store.changeRightPanelTab(1);
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
                Store.toggleRightPanel(true);
                Store.changeRightPanelTab(2);
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
      <AntDropdown overlay={AvatarMenu(Store)} placement="bottomRight">
        <img
          className={Styles.avatar}
          src={avatar}
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

const NavBar = (prop: propType) => {
  const { Store, menuList, navList } = prop;
  const StoreData = Store.data;
  return (
    <>
      <header className={Styles.layout__navbar}>
        {LogoModule({StoreData})}
        {BreadcrumbModule({Store,StoreData,menuList})}
        {NavigationModule({Store,StoreData,navList})}
        {AvatarModule({Store,StoreData})}
      </header>
    </>
  );
};

export default observer(NavBar);
