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
    activeId: ''
  },
  user: {
    login: false,
    token: '',
    uid: 0,
    nickname: 'PomeloCoke',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F21%2F20200721225542_2R83m.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680008080&t=cb5ececaaba394418b167f515490387a',
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