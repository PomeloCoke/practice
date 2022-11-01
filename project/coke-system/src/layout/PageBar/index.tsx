import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Styles from "./index.module.less";
import IconFont from "@/components/iconfont";

type propType = {
  Store?: STORE;
};

interface modulePropType extends propType {
  StoreData?: STORE_STATE;
}

const createPageItem = (StoreData: STORE_STATE) => {
  const { cache_list, cur_page } = StoreData.layout.pageBar;
  if (cache_list.length > 0) {
    return (
      <>
        {cache_list.map((item, idx) => {
          return (
            <Link
            key={`page-item-${idx}`}
              to={item.route}
              className={window.className([Styles.page_item])}
            >
              <span className={Styles.page_item_text}>{item.name_c}</span>
              <IconFont
                name={"icon-close1"}
                className={Styles.page_item_icon}
              />
            </Link>
          );
        })}
      </>
    );
  } else {
    return <></>;
  }
};

const PageBar = (prop: propType) => {
  const StoreData = prop.Store.data;

  return (
    <>
      <div className={window.className([Styles.layout__pagebar])}>
        <div className={window.className([Styles.page_list])}>
          <div
            className={window.className([
              Styles.page_list_arrow,
              Styles.page_list_arrow_left,
            ])}
          >
            <IconFont name={"icon-arrow-left"} />
          </div>
          <div className={window.className([Styles.page_list_box])}>
            {createPageItem(StoreData)}
          </div>
          <div
            className={window.className([
              Styles.page_list_arrow,
              Styles.page_list_arrow_right,
            ])}
          >
            <IconFont name={"icon-arrow-right"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(PageBar);
