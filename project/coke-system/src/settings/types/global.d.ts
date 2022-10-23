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
        active: number[],
      },
      pagebar: {
        status: boolean,
        active: number,
      }
    },
    user: {
      login: boolean,
      token: string,
      uid: number,
      pid: string,
      user_name: string,
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
  }
  interface STORE extends STORE_ACTION {
    data: STORE_STATE
  }
}
