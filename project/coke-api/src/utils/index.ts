
export function typeData(data: any, type: string): boolean {
  const dType = Object.prototype.toString.call(data)
  return dType === `[object ${type}]`
}

export { }