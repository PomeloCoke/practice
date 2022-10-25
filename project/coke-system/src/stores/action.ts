import { curMenuData, curPageData } from "./type"
import { remove as _remove, isEqual as _isEqual } from "lodash"
const common = {
  /**
   * 存储系统信息
   * @description 将store中的数据存储到浏览器的localstorage中
   */
   setSystemInfo(): void {
    localStorage.setItem('system_info', JSON.stringify(this.data))
  },
  /**
   * 获取系统信息
   * @description 将浏览器的localstorage中的数据存储到store中
   */
   getSystemInfo(): void {
    if (localStorage.getItem('system_info')) {
      this.data = JSON.parse(localStorage.getItem('system_info'))
    }
  },
  /**
   * 存储登录态
   * @description 将登录态存储到store对应的字段，并更新浏览器缓存的系统信息数据
   * @param status 
   */
   setLogin(status: boolean): void {
    this.data.user.login = status
    this.data.user.token = status ? '123' : ''
    this.setSystemInfo()
  },
}

const layout = {
  toggleMenuBar(status: boolean): void {
    this.data.layout.menubar.status = status
    this.setSystemInfo()
  },
  toggleMenuList(menuIdx: number[]): void {
    const isActive = this.data.layout.menubar.active_list.filter((item:Number[])=>_isEqual(item, menuIdx)).length == 1 
    if (isActive) {
      _remove(this.data.layout.menubar.active_list, function(item) {
        return _isEqual(item, menuIdx)
      })
    } else {
      this.data.layout.menubar.active_list.push(menuIdx)
    }
    this.setSystemInfo()
  },
  changeMenuBar(menuIdx: number[], item:curMenuData): void {
    this.data.layout.menubar.active_item = [0,0,0,0,0]
    menuIdx.map((item, idx)=> {
      this.data.layout.menubar.active_item[idx] = item
    })
    if(item.children.length == 0) {
      const {name_c, name_e, route} = item
      const curPage = {
        name_c, name_e, route
      }
      this.changePage(curPage)
    }
    this.setSystemInfo()
  },
  changePage(page:curPageData):void {
    this.data.layout.pagebar.cur_page = page
  }
}

const action: STORE_ACTION = {
  ...common,
  ...layout
}

export default action