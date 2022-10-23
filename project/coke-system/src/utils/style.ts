window.className = function className(styleList: string[]): string {
  return styleList.filter(item=>item).join(" ")
}
export default {}