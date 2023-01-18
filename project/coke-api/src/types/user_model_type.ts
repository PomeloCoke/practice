export type validUser = {
  area_code?: number,
  mobile?: string,
  email?: string,
  uid?: number,
  password?: string
}

export type validCount = {
  uid: number,
  product_id: string
}

export type validPassword = {
  pwd_val: string,
  pwd_res?: string,
  uid: number
}

export type login = {
  id: number,
  product_id: number,
  device: string,
}

export type addUser = {
  area_code?: number,
  mobile?: string,
  email?: string,
  is_staff?: 0 | 1,
  product_id: string,
  info_detail?: {
    name?: string,
    birthday?: string,
    id_number?: string,
    sex?: 1 | 2
  }
}

export type editUser = {
  id: number,
  nickname?: string,
  avatar?: string,
  description?: string,
  birthday?: string,
  mobile?: string,
  area_code?: number,
  email?: string,
  id_number?: string,
  password?: string,
  sex?: number
}

export type addCount = {
  product_id: string,
  uid: number
}

export type addLog = {
  uid: number,
  product_id: number,
  device: string
}

export type list = {
  id?: number;
  page?: number;
  page_count?: number;
};

export type detail = {
  id: number,
  product_id?: number
}

export type baseDetail = {
  id: number
}


export type countDetail = {
  id: number,
  product_id?: number
}