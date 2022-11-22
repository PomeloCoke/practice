import userModel from '../../model/public/user'

// 用户登录接口
const login = async (ctx: ctx, next: next) => {
  const { uid, mobile, area_code, email, password, product_id } = ctx.request.body

  const validCountParams = { uid, mobile, area_code, email, password }
  const hasCountRes = await userModel.validHasUser(validCountParams)
  if (!hasCountRes.res) {
    ctx.error({
      code: hasCountRes.code,
      msg: hasCountRes.msg
    })
    return
  }

  if (hasCountRes.data.status > 2) {
    ctx.error({
      code: ctx.state.ErrorCode.DATA_EXIST,
      msg: '用户状态异常，无法登录'
    })
    return
  }

  const validPasswordParams = {
    pwd_val: password,
    pwd_res: hasCountRes.data.password,
    uid: hasCountRes.data.uid
  }
  const passwordRes = await userModel.validPassword(validPasswordParams)
  if (!passwordRes.res) {
    ctx.error({
      code: hasCountRes.code,
      msg: hasCountRes.msg
    })
    return
  }

  const loginParams = {
    id: hasCountRes.data.uid,
    product_id: product_id
  }
  const res = await userModel.login(loginParams)
  if (res.res) {
    ctx.success({
      data: res.data,
      msg: '登录成功！'
    })
  } else {

  }
  
}

const sign = async (ctx: ctx, next: next) => {
  const { mobile, area_code, email } = ctx.request.body
}

// 后台添加用户
const addUser = async (ctx: ctx, next: next) => {
  const { mobile, area_code, email } = ctx.request.body

  const validCountParams = { mobile, area_code, email }
  const hasCountRes = await userModel.validHasUser(validCountParams)
  if (hasCountRes.res) {
    ctx.error({
      code: hasCountRes.code,
      msg: hasCountRes.msg
    })
    return
  }

}


export default {
  login
}
