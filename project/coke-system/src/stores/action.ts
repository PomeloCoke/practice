import { curMenuType, curPageType, STATE_USER } from "./types";
import { remove as _remove, isEqual as _isEqual, indexOf as _indexOf } from "lodash";

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
  setLogin(status: boolean, user?: STATE_USER): void {
    if (status) {
      this.data.user = user
    }
    this.data.user.login = status;
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
    this.data.layoutMenuBar.open = status;
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
      ).length === 1;
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
  changeMenuBar(item: curMenuType): void {
    this.data.layoutMenuBar.activeId = item.id
    // const { name_c, name_e, route } = item;
    // const curPage = {
    //   name_c,
    //   name_e,
    //   route,
    // };
    // if (route !== '/' && route !== '/login') {
    //   this.addPageItem(curPage);
    // }
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
    const cache_list = this.data.layout.pageBar.cache_list
    this.data.layout.pageBar.cur_page = page;
    let hasItem = false
    if (cache_list.length > 0) {
      hasItem = cache_list.filter((item: curPageType[])=>_isEqual(item, page)).length === 1
    }
    if (!hasItem) {
      this.data.layout.pageBar.cache_list.push(page)
      this.data.layout.pageBar.active = this.data.layout.pageBar.cache_list.length - 1
    } else {
      
      for( let i = 0; i < cache_list.length; i++) {
        if (_isEqual(cache_list[i], page)) {
          this.data.layout.pageBar.active = i
          break
        }
      }
    }
  },

  delPageItem(idx: number) {
    const cache_list = this.data.layout.pageBar.cache_list
    if (idx > -1) {
      if (idx < this.data.layout.pageBar.active) this.data.layout.pageBar.active-- 
      this.data.layout.pageBar.cache_list = cache_list.filter((item: curPageType, i:number)=> {
        return i !== idx
      })
    } else {
      this.data.layout.pageBar.active = 0
      this.data.layout.pageBar.cache_list =[]
    }
    this.setSystemInfo();
  }
};

const action: STORE_ACTION = {
  ...common,
  ...layout,
};

export default action;
