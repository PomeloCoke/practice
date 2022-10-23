import * as React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import useStore from "@/stores";
import envConfig from "@/settings";

import { NavListData } from "../type";
import IconFont from "@/components/iconfont";
import styles from "./index.module.less";

type props = {
  navList: NavListData[]
}

const navbar = (prop: props) => {
  const store = useStore();
  const { navbar, menubar } = store.data.layout;
  const { avatar } = store.data.user
  // console.log('getMenuList', prop.navList)
  const state = useLocalStore(() => ({
    // mock 产品导航列表
    navlist: prop.navList,
    // mock 通知数量
    notice_num: 0
  }));
  return (
    <>
      <header className={styles.layout__navbar}>
        {/*logo start***********************************/}
        <div
          className={window.className([
            styles.logoBox,
            menubar.status ? styles.active : "",
          ])}
        >
          {/* logo图片 */}
          <div
            className={window.className([
              styles.logoImg,
              envConfig.envAlias != "prod" ? styles[envConfig.envAlias] : "",
            ])}
          ></div>
          {/* logo文字 */}
          <div className={styles.logoText}>Pomelode</div>
        </div>
        {/*logo end*************************************/}

        {/*面包屑 start***********************************/}
        <div className={window.className([styles.breadcrumbBox])}>
          <div
            className={styles.icon}
            onClick={() => store.toggleMenuBar(!menubar.status)}
          >
            {menubar.status ? <IconFont name="icon-outdent" /> : <IconFont name="icon-indent" />}
          </div>
        </div>
        {/*面包屑 end*************************************/}

        {/*产品导航 start***********************************/}
        <div className={styles.navListBox}>
          {state.navlist.map((item, idx) => {
            return (
              <div className={styles.navItemBox} key={`navitem-${idx}`}>
                <nav
                  className={window.className([
                    styles.navItem,
                    navbar.active === idx ? styles.active : "",
                  ])}
                >
                  <IconFont className={styles.icon} name={item.icon} />
                  <div className={styles.text}>{item.name_c}</div>
                </nav>
              </div>
            );
          })}
        </div>
        {/*产品导航 end*************************************/}

        {/*用户头像 start***********************************/}
        <div className={window.className([
          styles.userAvaBox,
          state.notice_num ? styles.notice : ''
        ])}>
          <img className={styles.avatar} src={avatar} alt="用户头像" />
        </div>
        {/*用户头像 end*************************************/}
      </header>
    </>
  );
};

export default observer(navbar);
