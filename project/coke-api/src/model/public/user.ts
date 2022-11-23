import bcrypt from 'bcryptjs'
import { query } from "@/types/sql";
import { querySql, insertSql, updateSql, deleteSql } from "../../db";
import { getPageLimit } from "./select";
import { ErrorCode } from "../../enum/errorCode";

const userBaseTable = 'temp_public_user_baseinfo';
const userCountTable = 'temp_public_user_countinfo';
const userLogTable = 'temp_public_user_loginlog'
/**
  * TODO
  * 校验信息、数据处理
  * 1. 根据手机号/邮箱/uid 判断数据库内是否有该用户
  * 2. 登录：根据手机号/邮箱和密码 判断是否为该用户
  * 3. 注册：根据邮箱验证码 校验注册数据安全性（待完善）
  * 4. 请求接口：已登录用户token是否过期（中间件）
  * 5. 请求接口：判断是否需要登录、是否拥有权限（中间件）
  * 6. 明文密码转为加密密码
  * 7. 生成token
 */

type validUserType = {
  area_code?: number,
  mobile?: string,
  email?: string,
  uid?: number,
  password?: string
}
/**
 * 判断用户是否存在
 * @param params 
 * @returns 
 */
export async function validHasUser(params: validUserType): Promise<validResType> {
  const { area_code, mobile, email, uid } = params
  if (!mobile && !email && !uid) {
    return {
      code: ErrorCode.PARAM_LACK,
      res: false,
      msg: '手机号/邮箱/uid至少传入一个',
      data: ''
    }
  }

  const totalSql: querySql = {
    select: ['password', 'status', { name: 'id', alias: 'uid' }],
    from: userBaseTable,
    where: [{
      name: 'is_del',
      opt: '=',
      val: 0
    }]
  }
  if (mobile) {
    totalSql.where?.push({
      name: 'mobile',
      opt: '=',
      val: mobile
    }, {
      name: 'area_code',
      opt: '=',
      val: area_code
    })

  }
  if (email) {
    totalSql.where?.push({
      name: 'email',
      opt: '=',
      val: email
    })
  }
  if (uid) {
    totalSql.where?.push({
      name: 'id',
      opt: '=',
      val: uid
    })
  }

  try {
    const total = await querySql(totalSql)
    if (total.length === 1) {
      return {
        code: ErrorCode.DATA_EXIST,
        res: true,
        msg: '存在该用户',
        data: total[0]
      }
    } else {
      return {
        code: ErrorCode.DATA_INEXISTENCE,
        res: false,
        msg: '不存在该用户',
        data: ''
      }
    }
  } catch (error) {
    return {
      code: ErrorCode.VALID_FAIL,
      res: false,
      msg: error,
      data: ''
    }
  }

}

type validPasswordType = {
  pwd_val: string,
  pwd_res?: string,
  uid: number
}
/**
 * 判断用户密码是否正确（相同）
 * @param params 
 * @returns 
 */
export async function validPassword(params: validPasswordType) {
  const { pwd_val, pwd_res, uid } = params
  if (pwd_res) {
    return {
      code: ErrorCode.DATA_EXIST,
      res: bcrypt.compareSync(pwd_val, pwd_res),
      data: '',
      msg: ''
    }
  }

  const getPasswordSql: querySql = {
    select: 'password',
    from: userBaseTable,
    where: [{
      name: 'id',
      opt: '=',
      val: uid
    }]
  }
  try {
    const res = await querySql(getPasswordSql)
    return {
      code: ErrorCode.DATA_EXIST,
      res: bcrypt.compareSync(pwd_val, res[0].password),
      data: '',
      msg: ''
    }
  } catch (error) {
    return {
      code: ErrorCode.VALID_FAIL,
      res: false,
      data: '',
      msg: error
    }
  }
}

// TODO 用户列表
// TODO 用户详情
type loginParamsType = {
  id: number
}
/**
 * 用户登录
 * @param params 
 * @returns
 */
export async function login(params: loginParamsType) {
  let res = {}
  const baseSql: querySql = {
    select: [
      'id',
      'create_time',
      'status',
      'nickname',
      'avatar',
      'description',
      'birthday',
      'mobile',
      'area_code',
      'email',
      'id_number',
      'sex',
      'is_staff'
    ],
    from: userBaseTable,
    where: [
      {
        name: 'id',
        opt: '=',
        val: params.id
      }
    ]
  }

  const countSql: querySql = {
    select: [
      'id',
      'create_time',
      'batch',
      'need_update',
      'is_update',
      'permission_ids',
      'permission_names'
    ],
    from: userCountTable,
    where: [{
      name: 'user_id',
      opt: '=',
      val: params.id
    }]
  }
  const baseInfo = await querySql(baseSql)

  res = {
    ...baseInfo[0]
  }
  // TODO 获取对应产品账户信息
  // TODO 记录token，登录日志，session
  return {
    data: res,
    res: true,
    msg: ''
  }
}

type addUserParamsType = {
  area_code?: number,
  mobile?: string,
  email?: string,
  is_staff: 0 | 1,
  info_detail?: {
    name?: string,
    birthday?: string,
    id_number?: string,
    sex?: 1 | 2
  }
}
/**
 * 注册、添加用户
 * @param params 
 */
export async function addUser({
  is_staff = 0,
  ...params
}: addUserParamsType) {
  let addSql: insertSql = {
    table: userBaseTable,
    values: []
  }
  // TODO 随机默认头像
  let valueArr = [
    { key: 'is_staff', value: is_staff },
    { key: 'nickname', value: `用户${new Date().getTime()}` },
    { key: 'password', value: bcrypt.hashSync('123456', 10) }
  ] as any[]
  if (params.mobile) {
    valueArr.push({ key: 'area_code', value: params.area_code }, { key: 'mobile', value: params.mobile })
  }
  if (params.email) {
    valueArr.push({ key: 'email', value: params.email })
  }
  if (params.info_detail) {
    type keyType = keyof typeof params.info_detail
    Object.keys(params.info_detail).map((key) => {
      valueArr.push({ key: key, value: params.info_detail![key as keyType] })
    })
  }
  addSql.values = valueArr

  try {
    const res = await insertSql(addSql)
    return {
      res: true,
      msg: "",
    }
  } catch (error) {
    return {
      res: false,
      msg: error,
      code: ErrorCode.INSERT_FAIL
    }
  }

  // TODO 用户根据product_id添加对应账户，员工添加所有产品对应账户
}
// TODO 添加账户
// TODO 添加登录日志
// TODO 编辑基本信息
// TODO 编辑重要信息
// TODO 编辑员工相关信息
// TODO 更改密码
// TODO 账户更改更新状态
// TODO 更改用户状态

export default {
  validHasUser,
  validPassword,
  login,
  addUser
}