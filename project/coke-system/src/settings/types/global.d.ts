import { MenuListData } from "@/layout/type"
import { curPageData } from "@/stores/type"
export { }
declare global {
  interface Array<T> {
    remove(val: T): Array<T>
  }
  interface Window {
    className: Function
  }

  type ROUTER = {
    path: string,
    redirect?: string,
    component?: any
    meta: {
      title?: string,
      is_verify: boolean,
      is_login: boolean,
    },
    menu: {
      is_show: boolean,
      name_c?: string,
      name_e?: string,
      route?: string,
      icon?: string,

    },
    children?: ROUTER[]
  }

  type STORE_STATE = {
    layout: {
      loading: boolean,
      theme: string,
      theme_mod: 'light' | 'dark',
      navbar: {
        status: boolean,
        active: number,
      },
      menubar: {
        status: boolean,
        active_item: number[],
        active_list:[
          number[]?
        ]
      },
      pagebar: {
        status: boolean,
        active: number,
        cur_page: {
          name_c: string,
          name_e?: string,
          route: string,
          params?: any
        }
      },
      rightPannel: {
        status: boolean,
        active: number,
      }
    },
    user: {
      login: boolean,
      token: string,
      uid: number,
      pid: string,
      nickname: string,
      avatar: string,
      birthday: string,
      age: number,
      gender: number
      // is_new: boolean,
    }
  }
  type STORE_ACTION = {
    setSystemInfo(): void,
    getSystemInfo(): void,
    setLogin(status: boolean): void,
    toggleMenuBar(status: boolean): void,
    toggleMenuList(menuIdx: number[]): void,
    changeMenuBar(menuIdx: number[], item: MenuListData): void,
    changePage(page: curPageData): void,
    toggleRightPanel(status: boolean): void,
    changeRightPanelTab(active: number): void
  }
  interface STORE extends STORE_ACTION {
    data: STORE_STATE
  }
}
