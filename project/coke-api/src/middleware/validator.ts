import path from 'path'
import fs from 'fs'
import Ajv from 'ajv'
const ajv = new Ajv()

// 读取JSON Schema
function readSchema(url: string) {
  return new Promise<string>((resolve, reject) => {
    // TODO 打包时需注意读取路径
    const filePath = `./schema${url}.json`
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        resolve('error')
      } else {
        resolve(data)
      }
    })
  })
}

async function validator(ctx: ctx) {
  const { url, method } = ctx
  const apiUrl = url.split('?')[0].split('/api')[1]
  let params
  if ( method === 'GET' ) {
    params = ctx.request.queryString || ctx.request.query
  }
  if ( method === 'POST' ) {
    params = ctx.request.body
  }

  const schema = await readSchema(apiUrl)
  if(schema === 'error') {
    return {
      res: false,
      msg: '无法找到对应的入参检验文件'
    }
  }
  const validate = ajv.compile(JSON.parse(schema))
  const valid = validate(params)
  return {
    res: valid,
    msg: ''
  }
}

export default function() {
  return async function (ctx: ctx, next: next) {
    try {
      const validRes = await validator(ctx)
      if (validRes.res) {
        await next()
      } else {
        ctx.error({
          code: ctx.state.ErrorCode.MIDDLEWARE,
          msg: validRes.msg ? validRes.msg : '字段有误'
        })
      }
    } catch(err:any) {
      ctx.error({
        code: ctx.state.ErrorCode.SERVER,
        msg: err.message
      })
    }
  }
}