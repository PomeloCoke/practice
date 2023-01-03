window.className = function className(styleList: string[]): string {
  return styleList.filter(item=>item).join(" ")
}

const getWinHeight = () => {
  let height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0

  return height
}
export default {}