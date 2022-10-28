export type NavListData = {
  id: number,
  name_c: string,
  name_e: string,
  icon: string
}

export type MenuListData = {
  id: number,
  name_c: string,
  name_e: string,
  route?: string,
  icon?: string,
  children?: MenuListData[]
}