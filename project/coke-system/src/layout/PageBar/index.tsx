import * as React from "react";
import { observer } from "mobx-react-lite";

import Styles from './index.module.less'
import IconFont from "@/components/iconfont";

type propType = {
  Store?: STORE;
}

const PageBar = (prop:propType) => {
  return (
    <>
    <div className={window.className([
      Styles.layout__pagebar
    ])}>
      <div className={window.className([
        Styles.page_list,
      ])}>
        <div className={window.className([
          Styles.page_list_arrow,
          Styles.page_list_arrow_left
        ])}>
          <IconFont name={'icon-arrow-left'} />
        </div>
        <div className={window.className([
          Styles.page_list_box
        ])}></div>
        <div className={window.className([
          Styles.page_list_arrow,
          Styles.page_list_arrow_right
        ])}>
          <IconFont name={'icon-arrow-right'} />
        </div>
      </div>
    </div>
    </>
  )
}

export default observer(PageBar)