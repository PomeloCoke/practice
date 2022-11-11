import axios from "axios";

const instance = axios.create({
  timeout: 5000,
  // baseURL: 'http://119.45.60.225:3002'
})

instance.defaults.timeout = 20 * 1000
// instance.defaults.baseURL = 'http://119.45.60.225:3002/api/'
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.data = JSON.stringify(config.data)
    }
    /*     console.log('方法:', config.method)
    console.log('接口:', config.url)
    console.log('参数:', config.data || 'null') */
    config.headers['uid'] = 1
    config.headers['token'] = ''
    config.headers['appkey'] = 'pomelode'
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    // Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.status != 200) {
    // if (res.data.code) Toast.fail(res.data.message)

    return Promise.reject(res.data)
  }
  // if (res.data.code) Toast.fail(res.data.message)
  return res.data
})

export default instance

export function post(url:string, params:any = {}, headers:any  = {}, other:any  = {}) {
  return new Promise<any>((resolve, reject) => {
    let sendData = {
      ...params
    }
    instance
      .post(
        `${url}`,
        sendData,
        {
          timeout: other.timeout || 20 * 1000,
          headers: {
            ...headers
          }
        }
      )
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
