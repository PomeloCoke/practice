import { menuListType } from "@/layout/types"

export type curMenuType = {
  id?: number,
  name_c: string,
  name_e: string,
  route?: string,
  icon?: string,
  children?: curMenuType[]
}

export type curPageType = {
  name_c: string,
  name_e?: string,
  route: string,
  params?: any
}

export type STATE = {
  layout: {
    loading: boolean,
    theme: string,
    theme_mod: 'light' | 'dark',
    navBar: {
      status: boolean,
      active: number,
    },
    menuBar: {
      status: boolean,
      active_item: number[],
      active_list:[
        number[]?
      ]
    },
    pageBar: {
      status: boolean,
      active: number,
      cur_page: {
        name_c: string,
        name_e?: string,
        route: string,
        params?: any
      },
      cache_list:curPageType[] | []
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

export type ACTION = {
  setSystemInfo(): void,
  getSystemInfo(): void,
  setLogin(status: boolean): void,
  toggleMenuBar(status: boolean): void,
  toggleMenuList(menuIdx: number[]): void,
  changeMenuBar(menuIdx: number[], item: curMenuType): void,
  toggleRightPanel(status: boolean): void,
  changeRightPanelTab(active: number): void,
  addPageItem(page: curPageType): void,
}
