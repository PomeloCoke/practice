import { curMenuType, curPageType } from "./types";
import { remove as _remove, isEqual as _isEqual } from "lodash";
const common = {
  /**
   * 存储系统信息
   * @description 将store中的数据存储到浏览器的localstorage中
   */
  setSystemInfo(): void {
    localStorage.setItem("system_info", JSON.stringify(this.data));
  },

  /**
   * 获取系统信息
   * @description 将浏览器的localstorage中的数据存储到store中
   */
  getSystemInfo(): void {
    if (localStorage.getItem("system_info")) {
      this.data = JSON.parse(localStorage.getItem("system_info"));
    }
  },

  /**
   * 存储登录态
   * @description 将登录态存储到store对应的字段，并更新浏览器缓存的系统信息数据
   * @param status
   */
  setLogin(status: boolean): void {
    this.data.user.login = status;
    this.data.user.token = status ? "123" : "";
    this.setSystemInfo();
  },
};

const layout = {
  /**
   * 切换菜单栏状态
   * @description 打开/收起菜单栏
   * @param status 菜单状态
   */
  toggleMenuBar(status: boolean): void {
    this.data.layout.menuBar.status = status;
    this.setSystemInfo();
  },

  /**
   * 切换菜单列表项状态
   * @description 打开/收起菜单列表项
   * @param menuIdx 菜单列表项对应的ids
   */
  toggleMenuList(menuIdx: number[]): void {
    const isActive =
      this.data.layout.menuBar.active_list.filter((item: Number[]) =>
        _isEqual(item, menuIdx)
      ).length == 1;
    if (isActive) {
      _remove(this.data.layout.menuBar.active_list, function (item) {
        return _isEqual(item, menuIdx);
      });
    } else {
      this.data.layout.menuBar.active_list.push(menuIdx);
    }
    this.setSystemInfo();
  },

  /**
   * 改变活跃的菜单项
   * @description 将活跃菜单项的相关信息存储到系统信息中
   * @param menuIdx 活跃菜单项的ids
   * @param item 活跃菜单项数据
   */
  changeMenuBar(menuIdx: number[], item: curMenuType): void {
    this.data.layout.menuBar.active_item = [0, 0, 0, 0, 0];
    menuIdx.map((item, idx) => {
      this.data.layout.menuBar.active_item[idx] = item;
    });
    if (item.children && item.children.length == 0) {
      const { name_c, name_e, route } = item;
      const curPage = {
        name_c,
        name_e,
        route,
      };
      this.addPageItem(curPage);
    }
    this.setSystemInfo();
  },

  /**
   * 切换右侧个人面板状态
   * @description 打开/收起面板
   * @param status 面板状态
   */
  toggleRightPanel(status: boolean): void {
    this.data.layout.rightPannel.status = status;
    this.setSystemInfo();
  },

  /**
   * 改变个人面板中的tab项
   * @param active 活跃的tab项id
   */
  changeRightPanelTab(active: number): void {
    this.data.layout.rightPannel.active = active;
    this.setSystemInfo();
  },
  /**
   * 增加页面标签栏项
   * @description 改变活跃页面
   * @param page 页面相关信息
   */
  addPageItem(page: curPageType) {
    this.data.layout.pageBar.cur_page = page;
    let hasItem = false
    if (this.data.layout.pageBar.cache_list.length > 0) {
      hasItem = this.data.layout.pageBar.cache_list.filter((item: curPageType[])=>_isEqual(item, page)).length == 1
    }
    if (!hasItem) this.data.layout.pageBar.cache_list.push(page)
  }
};

const action: STORE_ACTION = {
  ...common,
  ...layout,
};

export default action;
