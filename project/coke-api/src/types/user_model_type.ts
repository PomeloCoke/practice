export type validUser = {
  area_code?: number,
  mobile?: string,
  email?: string,
  uid?: number,
  password?: string
}

export type validPassword = {
  pwd_val: string,
  pwd_res?: string,
  uid: number
}