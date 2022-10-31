export type Router = {
  path: string,
  redirect?: string,
  component?: any
  meta: {
    fullpath: string,
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
  children?: Router[],
  idxs?: number[]
}