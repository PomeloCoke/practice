const state:STORE_STATE = {
  layout: {
    loading: false,
    theme: 'default',
    theme_mod: 'light',
    navBar: {
      status: true,
      active: 0,
    },
    menuBar: {
      status: false,
      active_item: [2,0,0,0,0],
      active_list:[],
    },
    pageBar: {
      status: true,
      active: 0,
      cur_page: {
        name_c: '仪表盘',
        name_e: 'dashboard',
        route: '/dashboard',
      },
      cache_list: []
    },
    rightPannel: {
      status: false,
      active: 1
    }
  },
  layoutMenuBar: {
    open: true,
    visible: true,
    activeItem: []
  },
  user: {
    login: false,
    token: '',
    uid: 0,
    nickname: 'PomeloCoke',
    avatar: 'https://www.ygexing.com/upload/150/new/20210303/16137992359659254.jpg',
    birthday: '',
    sex: null,
    description: null,
    count_info: {
      id: 1,
      batch: 1,
      create_time: '',
      is_update: 1,
      need_update: 0,
      permission_ids: null,
      permission_names: null
    },
    advance_info: {
      email: null,
      area_code: 86,
      mobile: '',
      id_number: null
    }
  }
}

export default state