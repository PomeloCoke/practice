import axios, { post } from './index'
const Public = {
  getOptionList() {
    const params = {}
    return post('/api/public/option/list', params)
  },
}

export default Public