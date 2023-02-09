export function typeData(data: any, type: string): boolean {
  const dType = Object.prototype.toString.call(data)
  return dType === `[object ${type}]`
}

export function formatDate(val: string, join?: string):string {
  let format = '%Y-%m-%d %H:%i:%S'
  switch(join) {
    case '/':
    format = '%Y/%m/%d'
    break
    case 'char':
    format = '%Y年%m月%d日'
  }
  return `DATE_FORMAT(${val}, '${format}') AS ${val}`
}

global.validPermission =  function (permission: number[], ctx: ctx):boolean {
  const set = new Set(permission)
  const permission_ids = ctx.session.user.permission_ids
  for (let i = 0; i < permission_ids.length; i++) {
    if (set.has(permission_ids[i])) {
      return true
    }
  }
  ctx.error({
    code: ctx.state.ErrorCode.NO_PERMISSION,
    msg: '没有操作权限'
  })
  return false
}

export { }