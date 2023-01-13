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