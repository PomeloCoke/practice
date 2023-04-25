export type userValid = {
  uid: number,
  id: number
};

export type list = {
  id?: number,
  product_id?: number,
  name_c?: number,
  name_e?: number,
  page?: number,
  page_count?: number,
};

export type add = { 
  name_c: string;
  name_e: string,
  product_id: number,
  description?: string,
}

export type edit = {
  id: number,
  name_e?: string,
  name_c?: string;
  description?: string,
}

export type editUser = {
  id: number,
  name_c: string,
  cids: string,
}

export type editValid = {
  id?: number,
  product_id: number,
  name_c: string;
  // name_e: string,
}