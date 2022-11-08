export type select = {
  name: string,
  alias?: string
}
export type where = {
  name: string | string[],
  opt?: '=' | '<>' | '>' | '<' | '>=' | '<=' | 'BETWEEN' | 'LIKE' | 'IN' | 'IS' | 'IS NOT',
  val?: number | string,
  join?: 'AND' | 'OR' | ('AND' | 'OR')[]  | string
}
export type orderBy = {
  name: string,
  order?: 'asc' | 'desc'
}

export type groupBy = {
  name: string
}

export type limit = {
  start: number,
  count: number
}

export type sqlValType = select | where | orderBy

export type query = {
  select: '*' | string | (string | select)[],
  from?: string,
  where?: (string | where)[],
  group_by?: string,
  order_by?: (string | orderBy)[],
  limit?: string | limit 
}