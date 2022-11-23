import userModel from '../../model/public/user'
import { UserStatus } from '../../enum/defaultOption'

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
  if (hasCountRes.data.status != UserStatus.NORMAL && 
      hasCountRes.data.status != UserStatus.FREQUENT) {
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
      code: passwordRes.code,
      msg: '输入密码不正确'
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
    ctx.error({
      msg: res.msg
    })
  }
  
}

const sign = async (ctx: ctx, next: next) => {
  const { mobile, area_code, email } = ctx.request.body
}

// 后台添加用户
const addUser = async (ctx: ctx, next: next) => {
  const { mobile, area_code, email, birthday, id_number, sex, name, is_staff } = ctx.request.body

  const validCountParams = { mobile, area_code, email }
  const hasCountRes = await userModel.validHasUser(validCountParams)
  if (hasCountRes.res) {
    ctx.error({
      code: hasCountRes.code,
      msg: hasCountRes.msg
    })
    return
  }

  const addParams = {
    area_code,
    mobile,
    email,
    is_staff,
    info_detail: {
      birthday,
      id_number,
      sex,
      name
    }
  }
  const res = await userModel.addUser(addParams)
  if (res.res) {
    ctx.success({
      msg: '添加用户成功！'
    })
  } else {
    ctx.error({
      code: res.code,
      msg: '添加用户失败',
      data: res.msg
    })
  }

}


export default {
  login,
  addUser
}
