export { }
declare global {
  interface Array<T> {
    remove(val: T): Array<T>
  }

  type ROUTER = {
    path: string,
    redirect?: string,
    component?: any
    meta?: {
      title?: string,
      authority?: boolean,
    },
    children?: ROUTER[]
  }

  type STORE_STATE = {
    layout: {
      loading: boolean,
      theme: string,
    },
    user: {
      login: boolean,
      token: string,
      uid: number,
      pid: string,
      user_name: string,
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
  }
  interface STORE extends STORE_ACTION {
    data: STORE_STATE
  }
}