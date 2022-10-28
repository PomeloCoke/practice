import * as React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import useStore from "@/stores";
import envConfig from "@/settings";

import { MenuListData, NavListData } from "../types";
import Styles from "./index.module.less";
import { Breadcrumb, Dropdown, Menu } from "antd";
import IconFont from "@/components/iconfont";


type propType = {
  Store?: STORE,
  navList?: NavListData[];
  menuList?: MenuListData[];
};

interface modulePropType extends propType {
  StoreData?: STORE_STATE
}

/**
 * 获取子菜单列表
 * @param item 父菜单项
 * @param idx 子菜单项索引
 * @returns {MenuListData} 子菜单项
 */
const getParentItem = (item: MenuListData, idx: number): MenuListData => {
  return item.children[idx];
};

const avatarMenu = (store: STORE) => {
  const { status } = store.data.layout.rightPannel;
  const menuStyle = {
    marginTop: "5px",
    width: "80px",
  };
  return (
    <Menu
      style={menuStyle}
      items={[
        {
          label: (
            <div
              onClick={() => {
                store.toggleRightPanel(true);
                store.changeRightPanelTab(1);
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
                store.toggleRightPanel(true);
                store.changeRightPanelTab(2);
              }}
            >
              设置
            </div>
          ),
          key: "ava-menu-item-2",
        },
        { type: "divider" },
        {
          label: <div className={Styles.menu_item}>退出</div>,
          key: "ava-menu-item-3",
        },
      ]}
    ></Menu>
  );
};

/*logo start***********************************/
const LogoModule = (prop: modulePropType) => {
  const { StoreData } = prop
  const { menubar } = StoreData.layout
  return (
    <div
      className={window.className([
        Styles.logoBox,
        menubar.status ? Styles.active : "",
      ])}
    >
      {/* logo图片 */}
      <div
        className={window.className([
          Styles.logoImg,
          envConfig.envAlias != "prod" ? Styles[envConfig.envAlias] : "",
        ])}
      ></div>
      {/* logo文字 */}
      <div className={Styles.logoText}>Pomelode</div>
    </div>
  )
}
/*logo end*************************************/


const navbar = (prop: propType) => {
  const store = useStore();
  const { Store } = prop
  const StoreData = Store.data
  const state = useLocalStore(() => ({
    // mock 通知数量
    notice_num: 0,
  }));
  const { navbar, menubar } = store.data.layout;
  const { avatar } = store.data.user;

  let pageList: MenuListData[] = [];
  let parentItem = prop.menuList[menubar.active_item[0]];

  // 遍历活跃菜单索引数组，获取活跃菜单路径
  for (let i = 0; i < menubar.active_item.length; i++) {
    if (i == 0) {
      parentItem = prop.menuList[menubar.active_item[0]];
      pageList.push(parentItem);
    }
    if (i != 0 && parentItem.children.length > 0) {
      parentItem = getParentItem(parentItem, menubar.active_item[i]);
      pageList.push(parentItem);
    } else if (i != 0 && parentItem.children.length == 0) {
      break;
    }
  }

  // 组件实例
  const logoModule = <LogoModule StoreData={StoreData}/>
  return (
    <>
      <header className={Styles.layout__navbar}>
        {logoModule}
        {/*面包屑 start***********************************/}
        <div className={window.className([Styles.breadcrumbBox])}>
          <div
            className={Styles.icon}
            onClick={() => store.toggleMenuBar(!menubar.status)}
          >
            {menubar.status ? (
              <IconFont name="icon-outdent" />
            ) : (
              <IconFont name="icon-indent" />
            )}
          </div>
          <div className={Styles.pageList}>
            <Breadcrumb>
              {pageList.map((item, idx) => {
                return (
                  <Breadcrumb.Item
                    className={Styles.pageItem}
                    key={`breadcrumbItem-${idx}`}
                  >
                    {item.name_c}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
        </div>
        {/*面包屑 end*************************************/}

        {/*产品导航 start***********************************/}
        <div className={Styles.navListBox}>
          {prop.navList.map((item, idx) => {
            return (
              <div className={Styles.navItemBox} key={`navitem-${idx}`}>
                <nav
                  className={window.className([
                    Styles.navItem,
                    navbar.active === idx ? Styles.active : "",
                  ])}
                >
                  <IconFont className={Styles.icon} name={item.icon} />
                  <div className={Styles.text}>{item.name_c}</div>
                </nav>
              </div>
            );
          })}
        </div>
        {/*产品导航 end*************************************/}

        {/*用户头像 start***********************************/}
        <div
          className={window.className([
            Styles.userAvaBox,
            state.notice_num ? Styles.notice : "",
          ])}
        >
          <Dropdown overlay={avatarMenu(store)} placement="bottomRight">
            <img
              className={Styles.avatar}
              src={avatar}
              alt="用户头像"
              onClick={() => {
                store.toggleRightPanel(true);
                store.changeRightPanelTab(1);
              }}
            />
          </Dropdown>
        </div>
        {/*用户头像 end*************************************/}
      </header>
    </>
  );
};

export default observer(navbar);
