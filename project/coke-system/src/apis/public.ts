import { post } from './index'
const Public = {
  loginAdmin(params:any) {
    return post('/api/public/user/login', params)
  },
  getOptionList() {
    const params = {}
    return post('/api/public/option/list', params)
  },
}

export default Public