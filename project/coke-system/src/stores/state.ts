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
  user: {
    login: false,
    token: '',
    uid: 0,
    pid: '',
    nickname: 'PomeloCoke',
    avatar: 'https://www.ygexing.com/upload/150/new/20210303/16137992359659254.jpg',
    birthday: '',
    age: 0,
    gender: 0
  }
}

export default state