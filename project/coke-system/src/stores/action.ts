const common = {
  /**
   * 存储系统信息
   * @description 将store中的数据存储到浏览器的localstorage中
   */
   setSystemInfo(): void {
    localStorage.setItem('system_info', JSON.stringify(this.data))
  },
  /**
   * 获取系统信息
   * @description 将浏览器的localstorage中的数据存储到store中
   */
   getSystemInfo(): void {
    if (localStorage.getItem('system_info')) {
      this.data = JSON.parse(localStorage.getItem('system_info'))
    }
  },
  /**
   * 存储登录态
   * @description 将登录态存储到store对应的字段，并更新浏览器缓存的系统信息数据
   * @param status 
   */
   setLogin(status: boolean): void {
    this.data.user.login = status
    this.data.user.token = status ? '123' : ''
    this.setSystemInfo()
  },
}

const action: STORE_ACTION = {
  ...common
}

export default action