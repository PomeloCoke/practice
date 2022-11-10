import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
interface ResponseData<T = any> {
  code: number
  msg: any
  data: T
}
interface NewAxiosInstance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<ResponseData>
}
const instance: NewAxiosInstance = axios.create({
  timeout: 5000, // 请求超时时间
  baseURL: 'http://119.45.60.225:3002/api/'
}) as unknown as NewAxiosInstance
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

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

export function post(url: string, params: any) {
  return instance({
    method: 'post',
    url: url,
    data: params
  })
}
