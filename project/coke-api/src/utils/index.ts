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

global.validPermission =  function (permission: number[], user: number[]):boolean {
  const set = new Set(permission)
  for (let i = 0; i < user.length; i++) {
    if (set.has(user[i])) {
      return true
    }
  }
  return false
}

export { }