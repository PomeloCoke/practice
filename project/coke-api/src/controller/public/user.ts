import userModel from '../../model/public/user'

// 用户登录接口
const login = async (ctx: ctx, next: next) => {
  const { uid, mobile, email, password } = ctx.request.body

  const validCountParams = { uid, mobile, email, password }
  const hasCountRes = await userModel.validHasUser(validCountParams)
  if (!hasCountRes.res) {
    ctx.error({
      code: hasCountRes.code,
      msg: hasCountRes.msg
    })
    return
  }

  if (hasCountRes.data.status !== 0) {
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
    id: hasCountRes.data.uid
  }
  const res = await userModel.login(loginParams)
  if (res.res) {
    ctx.success({
      data: hasCountRes
    })
  } else {

  }
  
}



export default {
  login
}
