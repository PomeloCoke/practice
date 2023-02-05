export type navListType = {
  id: number,
  name_c: string,
  name_e: string,
  icon: string
}

export type menuListType = {
  id: string,
  name_c: string,
  name_e: string,
  is_show: boolean,
  route?: string,
  icon?: string,
  children?: menuListType[]
}

export type activeMenuItemType = {
  id: string,
  nextId: number | null,
  open: boolean,
  info: {
    icon: string,
    name_c: string,
    name_e: string,
    path?: string
  }
}