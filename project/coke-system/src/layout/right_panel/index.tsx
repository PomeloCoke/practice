import * as React from "react";
import { observer } from "mobx-react-lite";
import useStore from "@/stores";

import Styles from "./index.module.less";
import {
  Sticky as AntSticky,
  StickyContainer as AntStickyContainer,
} from "react-sticky";
import { Drawer as AntDrawer, Tabs as AntTabs, TabsProps } from "antd";
import IconFont from "@/components/iconfont";

const bodyStyle = {
  padding: "0",
};

const CountTabList = () => {
  return <div>我是账户面板</div>;
};

const SettingTabList = () => {
  return <div>我是设置面板</div>;
};

/*标签页 start***********************************/
const itemAttributes = [
  {
    id: 1,
    iconName: "icon-user",
    labelName: "账户",
    component: <CountTabList />,
  },
  {
    id: 2,
    iconName: "icon-setting",
    labelName: "设置",
    component: <SettingTabList />,
  },
];
const tabItem = itemAttributes.map((item) => {
  return {
    label: (
      <div className="">
        <IconFont name={item.iconName} />
        <span className="">{item.labelName}</span>
      </div>
    ),
    key: `right-pannel-tab-item-${item.id}`,
    children: item.component,
  };
});
/*标签页 end*************************************/

const rightPanel = () => {
  const Store = useStore();
  const StoreData = Store.data;
  const { status, active } = StoreData.layout.rightPannel;

  const clickTabItem = (key: string) => {
    const active = key.split('-')
    const activeId = Number(active[active.length-1])
    Store.changeRightPanelTab(activeId)
  }

  return (
    <>
      <AntDrawer
        zIndex={1051}
        placement="right"
        closable={false}
        onClose={() => Store.toggleRightPanel(!status)}
        open={status}
        // open={true}
        bodyStyle={bodyStyle}
      >
        <div className={Styles.right_panel_container}>
          
            {/*基本展示 start***********************************/}
            <div className={Styles.base_info}>
              <div className={Styles.base_info_avatar}>
                <img
                  src={StoreData.user.avatar}
                  alt=""
                  className={Styles.base_info_avatar_img}
                />
              </div>
              <div className={Styles.base_info_nickname}>
                {StoreData.user.nickname}
              </div>
              <div className={Styles.base_info_uid}>
                uid: {StoreData.user.uid}
              </div>
            </div>
            {/*基本展示 end*************************************/}
            {/* <AntStickyContainer> */}
            {/*标签页 start***********************************/}
            <AntTabs
              defaultActiveKey="right-pannel-tab-item-1"
              activeKey={`right-pannel-tab-item-${active}`}
              onTabClick={(key)=>clickTabItem(key)}
              items={tabItem}
              centered={true}
            />
            {/*标签页 end*************************************/}
          {/* </AntStickyContainer> */}
        </div>
      </AntDrawer>
    </>
  );
};

export default observer(rightPanel);
