const state:STORE_STATE = {
  layout: {
    loading: false,
    theme: 'vitality',
    theme_mod: 'light',
    navbar: {
      status: true,
      active: 0,
    },
    menubar: {
      status: false,
      active_item: [0,0,0,0,0],
      active_list:[],
    },
    pagebar: {
      status: true,
      active: 0,
      cur_page: {
        name_c: '仪表盘',
        name_e: 'dashboard',
        route: '/dashboard',
      }
    },
    rightPannel: {
      status: false,
      active: 0
    }
  },
  user: {
    login: true,
    token: '123',
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