export type select = {
  name: string,
  alias?: string
}
export type where = {
  name: string,
  opt: '=' | '<>' | '>' | '<' | '>=' | '<=' | 'BETWEEN' | 'LIKE' | 'IN',
  val: number | string 
}
export type orderBy = {
  name: string,
  order?: 'asc' | 'desc'
}

export type sqlValType = select | where | orderBy

export type query = {
  select: '*' | (string | select)[],
  from: string,
  where?: (string | where)[],
  order_by?: (string | orderBy)[]
}