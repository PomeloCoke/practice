export type list = {
  id?: number;
  parent_id?: number;
  name_c?: string;
  side?: 0 | 1 | 2;
  page?: number;
  page_count?: number;
};

export type detail = {
  id: number;
};

export type add = {
  parent_id?: number,
  name_e?: string,
  name_c: string;
  side: number;
}

export type edit = {
  id: number,
  parent_id?: number,
  name_e?: string,
  name_c: string;
  side: number;
}

export type del = {
  id: number
};

export type editValid = {
  parent_id?: number;
  name_c: string;
  side: number;
}

export type delValid = {
  id: number
};