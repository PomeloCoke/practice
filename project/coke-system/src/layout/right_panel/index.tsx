import * as React from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import useStore from "@/stores";

import { Drawer, Tabs } from "antd";
import styles from './index.module.less'

const bodyStyle = {
  padding: '0',
  
}

const rightPanel = () => {
  const store = useStore();
  const { status } = store.data.layout.rightPannel;
  return (
    <>
      <Drawer
        zIndex={1051}
        placement="right"
        closable={false}
        onClose={() => store.toggleRightPanel(!status)}
        // visible={status}
        visible={true}
        bodyStyle={bodyStyle}
      >
        <div className={styles.right_panel_container}>
          {/*基本展示 start***********************************/}
          <div className={styles.base_info}>
            <div className={styles.base_info_avatar}>
              <img src={store.data.user.avatar} alt="" className={styles.base_info_avatar_img} />
            </div>
            <div className={styles.base_info_nickname}>{store.data.user.nickname}</div>
            <div className={styles.base_info_uid}>uid: {store.data.user.uid}</div>
          </div>
          {/*基本展示 end*************************************/}


        </div>
      </Drawer>
    </>
  );
};

export default observer(rightPanel);
