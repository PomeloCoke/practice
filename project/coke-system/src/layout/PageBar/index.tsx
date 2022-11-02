import * as React from "react";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Styles from "./index.module.less";
import { isEqual as _isEqual } from "lodash";
import { Dropdown as AntDropdown, Menu as AntMenu } from "antd";
import IconFont from "@/components/iconfont";

type propType = {
  Store?: STORE;
};

interface modulePropType extends propType {
  StoreData?: STORE_STATE;
}

const createPageItem = (Store: STORE, navigate: NavigateFunction) => {
  const StoreData = Store.data;
  const { cache_list, cur_page, active } = StoreData.layout.pageBar;

  /**
   * 关闭页面标签
   * @param event 点击事件
   * @param idx 页面标签索引
   */
  const delPageItem = (event: React.MouseEvent, idx: number) => {
    event.preventDefault();

    if (cache_list.length === 1) {
      Store.delPageItem(-1);
      navigate("/dashboard", { replace: true });
    } else if (active === idx) {
      let nextIdx = 0;
      let nextRoute = "/dashboard";
      if (idx === cache_list.length - 1) {
        nextIdx = idx - 1;
      } else {
        nextIdx = idx + 1;
      }
      nextRoute = cache_list[nextIdx].route;
      Store.delPageItem(idx);
      navigate(nextRoute);
    } else if (active !== idx) {
      Store.delPageItem(idx);
    }
  };
  return (
    <>
      {cache_list.map((item, idx) => {
        return (
          <Link
            key={`page-item-${idx}`}
            to={item.route}
            className={window.className([
              Styles.page_item,
              _isEqual(item, cur_page) ? Styles.active : "",
            ])}
          >
            <span className={Styles.page_item_text}>{item.name_c}</span>
            <div
              className={Styles.page_item_icon}
              onClick={(e) => delPageItem(e, idx)}
            >
              <IconFont name={"icon-close1"} />
            </div>
          </Link>
        );
      })}
    </>
  );
};

const moreMenu = (Store: STORE) => {
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
                Store.delPageItem(-1);
              }}
            >
              清空列表
            </div>
          ),
          key: "page-more-menu-item-1",
        },
      ]}
    ></AntMenu>
  );
};

const PageBar = (prop: propType) => {
  const navigate = useNavigate();
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
            {createPageItem(prop.Store, navigate)}
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
        <div className={Styles.more_list}>
          <AntDropdown overlay={moreMenu(prop.Store)}>
            <IconFont name={"icon-ellipsis"} />
          </AntDropdown>
        </div>
      </div>
    </>
  );
};

export default observer(PageBar);
