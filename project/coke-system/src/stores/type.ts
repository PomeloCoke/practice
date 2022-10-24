export type curMenuData = {
  id: number,
  name_c: string,
  name_e: string,
  route?: string,
  icon?: string,
  children?: curMenuData[]
}

export type curPageData = {
  name_c: string,
  name_e?: string,
  route: string,
  params?: any
}