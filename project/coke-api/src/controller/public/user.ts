import * as userModel from '../../model/public/user'
import { UserStatus } from '../../enum/defaultOption'

// 用户登录接口
const login = async (ctx: ctx, next: next) => {
  const { uid, mobile, area_code, email, password, product_id } = ctx.request.body

  // 检验用户是否存在
  const validUserParams = { uid, mobile, area_code, email, password }
  const hasUserRes = await userModel.validHasUser(validUserParams)
  if (!hasUserRes.res) {
    ctx.error({
      code: hasUserRes.code,
      msg: hasUserRes.msg
    })
    return
  }
  // 校验账户是否存在
  const validCountParams = { uid: hasUserRes.data.uid, product_id }
  const hasCountRes = await userModel.validCount(validCountParams)
  if (!hasCountRes.res) {
    ctx.error({
      code: hasCountRes.code,
      msg: hasCountRes.msg
    })
    return
  }
  // 校验用户状态
  if (hasUserRes.data.status != UserStatus.NORMAL &&
    hasUserRes.data.status != UserStatus.FREQUENT) {
    ctx.error({
      code: ctx.state.ErrorCode.DATA_EXIST,
      msg: '用户状态异常，无法登录'
    })
    return
  }
  // 校验用户密码是否正确
  const validPasswordParams = {
    pwd_val: password,
    pwd_res: hasUserRes.data.password,
    uid: hasUserRes.data.uid
  }
  const passwordRes = await userModel.validPassword(validPasswordParams)
  if (!passwordRes.res) {
    ctx.error({
      code: passwordRes.code,
      msg: '输入密码不正确'
    })
    return
  }

  // 登录操作
  const loginParams = {
    id: hasUserRes.data.uid,
    product_id: product_id,
    device: ctx.request.header['device']
  }
  const res = await userModel.login(loginParams)
  if (res.res) {
    ctx.success({
      data: res.data,
      msg: '登录成功！'
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.OPERATE_FAIL,
      msg: res.msg
    })
  }

}

// 用户注册接口
const sign = async (ctx: ctx, next: next) => {
  // TODO 完善注册接口
  const { mobile, area_code, email, product_id } = ctx.request.body
}

// 后台添加用户
const addUser = async (ctx: ctx, next: next) => {
  const { mobile, area_code, email, birthday, id_number, sex, name, is_staff, product_id } = ctx.request.body

  // 校验用户是否已存在
  const validCountParams = { mobile, area_code, email }
  const hasCountRes = await userModel.validHasUser(validCountParams)
  if (hasCountRes.res) {
    ctx.error({
      code: hasCountRes.code,
      msg: hasCountRes.msg
    })
    return
  }
  if (!is_staff && !product_id) {
    ctx.error({
      code: ctx.state.ErrorCode.PARAM_LACK,
      msg: '缺少产品id参数'
    })
    return
  }

  // 添加用户操作
  const addParams = {
    area_code,
    mobile,
    email,
    is_staff,
    product_id,
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

const editUser = async (ctx: ctx, next: next) => {
  const {id, nickname, avatar, description, birthday, mobile, area_code, email, id_number, password, sex, is_staff } = ctx.request.body

  const params = {
    id, nickname, avatar, description, birthday, mobile, area_code, email, id_number, password, sex, is_staff
  }
  const hasUserRes = await userModel.validHasUser({uid:id})
  if (!hasUserRes.res) {
    ctx.error({
      code: ctx.state.ErrorCode.DATA_INEXISTENCE,
      msg: '用户不存在',
    })
    return
  }
  const res = await userModel.editUser(params)
  if (res.res) {
    ctx.success({
      msg: res.msg
    })
  } else {
    ctx.error({
      code: res.code,
      msg: res.msg,
    })
  }
  
}

// 后台获取用户列表
const getList = async (ctx: ctx, next: next) => {
  const { id, page, page_count } = ctx.request.body

  const params = { id, page, page_count }
  const res = await userModel.getUserList(params)
  if (res.res) {
    ctx.success({
      data: res.data
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.QUERY_FAIL,
      msg: res.msg
    })
  }
}

const getDetail = async (ctx: ctx, next: next) => {
  const {id, product_id} = ctx.request.body

  const params = {id, product_id}
  const res = await userModel.getUserDetail(params)

  if (res.res) {
    ctx.success({
      data: res.data
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.QUERY_FAIL,
      msg: res.msg
    })
  }
}

export default {
  login,
  addUser,
  editUser,
  getList,
  getDetail
}
