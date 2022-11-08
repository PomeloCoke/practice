import { querySql } from "../../db"
import { SqlDefaultVal } from "../../enum/sql"

type listParamsType = {
  id?: number,
  parent_id?: number,
  name_c?: string,
  side?: 0 | 1 | 2,
  page?: number,
  page_count?: number
}

function getPageLimit(page?: number, page_count?: number): {
  limitStr: string,
  limitStart: number,
  limitCount: number
} {
  let limitStart = SqlDefaultVal.LIMIT_START
  let limitCount = SqlDefaultVal.LIMIT_COUNT
  if (page_count) {
    limitCount = page_count
  }
  if (page) {
    limitStart = (page - 1) * limitCount
  }
  return {
    limitStr: `${limitStart},${limitCount}`,
    limitStart,
    limitCount
  }
}

export async function getOptionList(params: listParamsType) {
  let resArr = [] as any[]
  const { limitStr, limitCount } = getPageLimit(params.page, params.page_count)
  const countSql: querySql = {
    select: [
      { name: `SQL_CALC_FOUND_ROWS id` },
      { name: 'create_time' },
      { name: 'edit_time' },
      { name: 'parent_id' },
      { name: 'name_c' },
      { name: 'name_e' },
      { name: 'side' },
    ],
    from: 't_public_setting_option',
    where: [
      {
        name: 'is_del',
        opt: '=',
        val: 0,
      }, 
      {
        name: 'parent_id',
        opt: 'IS',
        val: 'NULL',
      }
    ],
    limit: limitStr
  }
  const totalSql: querySql = {
    select: [
      {
        name: 'FOUND_ROWS()',
        alias: 'total'
      }
    ]
  }

  if (params.name_c && countSql.where) {
    countSql.where.push({
      name: 'name_c',
      opt: 'LIKE',
      val: `%${params.name_c}%`,
    })
  }

  if (params.side && countSql.where) {
    countSql.where.push({
      name: 'side',
      opt: '=',
      val: params.side
    })
  }

  const res = await querySql(countSql)
  const total = await querySql(totalSql)
  for (let parent of res) {
    const countSql: querySql = {
      select: [
        { name: `id` },
        { name: 'create_time' },
        { name: 'edit_time' },
        { name: 'parent_id' },
        { name: 'name_c' },
        { name: 'name_e' },
        { name: 'side' },
      ],
      from: 't_public_setting_option',
      where: [
        {
          name: 'is_del',
          opt: '=',
          val: 0,
        }, 
        {
          name: 'parent_id',
          opt: '=',
          val: parent.id,
        }
      ],
    }
    const children = await querySql(countSql)
    resArr.push({
      ...parent,
      children
    })
  }
  return {
    data: resArr,
    total: total[0].total,
    page: params.page,
    page_count: params.page_count,
    page_total: Math.ceil(total[0].total / limitCount)
  }
}