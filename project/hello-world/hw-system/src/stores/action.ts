const common = {

}

const action: STORE_ACTION = {
  setLogin(status: boolean): void {
    this.data.user.login = status
  },
  ...common
}

export default action