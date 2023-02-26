export type curMenuType = {
  id?: string,
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

export type STATE_USER = {
  login: boolean, // 是否登录
  token: string, // 密钥
  uid: number, // 用户id
  nickname: string,  // 昵称
  avatar: string | null,  // 头像
  birthday: string | null,  // 生日
  sex: number | null, // 性别
  description: string | null, // 个人介绍
  count_info: {
    id: number,  // 账户id
    batch: number, // 账户批次
    create_time: string, // 创建时间
    is_update: 0 | 1, // 是否已更新
    need_update: 0 | 1, //是否需要更新
    permission_ids: string | null, // 权限组id
    permission_names: string | null, // 权限组名
  }
  advance_info: {
    email: string | null, // 邮箱
    area_code: number, // 手机区号
    mobile: string, // 手机号
    id_number: string | null, // 身份证号
  }
}

type menuItemType = {
  id: number,
  nextId: number | null,
  open: boolean,
  info: {
    icon: string,
    name_c: string,
    name_e: string,
    path?: string
  }
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
  layoutMenuBar: {
    open: boolean,
    visible: boolean,
    activeId: string
  }
  user: STATE_USER
}

export type ACTION = {
  setSystemInfo(): void,
  getSystemInfo(): void,
  setLogin(status: boolean, user: STATE_USER): void,
  toggleMenuBar(status: boolean): void,
  toggleMenuList(menuIdx: number[]): void,
  changeMenuBar(item: curMenuType): void,
  toggleRightPanel(status: boolean): void,
  changeRightPanelTab(active: number): void,
  addPageItem(page: curPageType): void,
  delPageItem(idx: number): void,
}
