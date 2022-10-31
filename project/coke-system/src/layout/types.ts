export type navListType = {
  id: number,
  name_c: string,
  name_e: string,
  icon: string
}

export type menuListType = {
  id: number,
  name_c: string,
  name_e: string,
  is_show: boolean,
  route?: string,
  icon?: string,
  children?: menuListType[]
}