type select = {
  name: string,
  alias?: string
}
type where = {
  name: string,
  opt: '=' | '<>' | '>' | '<' | '>=' | '<=' | 'BETWEEN' | 'LIKE' | 'IN',
  val: number | string 
}
type orderBy = {
  name: string,
  order?: 'asc' | 'desc'
}

export type query = {
  select: '*' | (string | select)[],
  from: string,
  where?: (string | where)[],
  order_by?: (string | orderBy)[]
}