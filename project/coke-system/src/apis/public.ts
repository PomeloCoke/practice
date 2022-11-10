import axios, { post } from './index'
const Public = {
  getOptionList() {
    // const url = 
    const params = {}
    return axios({
      method: 'post',
      url: 'public/option/list',
      data: params
    })
  },
}

export default Public