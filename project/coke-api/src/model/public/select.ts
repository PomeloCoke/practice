import { SqlDefaultVal } from "../../enum/sql"
export function getPageLimit(page?: number, page_count?: number): {
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