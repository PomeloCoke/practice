import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import redis from '../../cache'
import { querySql, insertSql, updateSql, deleteSql } from "../../db";
import { getPageLimit } from "./select";
import * as paramsType from '../../types/user_model_type'
import { ErrorCode } from "../../enum/errorCode";
import { DefaultOption } from '../../enum/defaultOption';

const userBaseTable = 'temp_public_user_baseinfo';
const userCountTable = 'temp_public_user_countinfo';
const userLogTable = 'temp_public_user_loginlog'
const optionTable = "t_public_setting_option";
/**
  * TODO
  * 校验信息、数据处理
  * 1. 根据手机号/邮箱/uid 判断数据库内是否有该用户 done
  * 2. 登录：根据手机号/邮箱和密码 判断是否为该用户 done
  * 3. 注册：根据邮箱验证码 校验注册数据安全性（待完善）
  * 4. 请求接口：已登录用户token是否过期（中间件）
  * 5. 请求接口：判断是否需要登录、是否拥有权限（中间件）
  * 6. 明文密码转为加密密码
  * 7. 生成token
 */

/**
 * 判断用户是否存在
 * @param params 
 * @returns 
 */
export async function validHasUser(params: paramsType.validUser): Promise<validResType> {
  const { area_code, mobile, email, uid } = params
  if (!mobile && !email && !uid) {
    return {
      code: ErrorCode.PARAM_LACK,
      res: false,
      msg: '手机号/邮箱/uid至少传入一个',
      data: ''
    }
  }

  /** sql语句 start */
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
  /** sql语句 end */

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

export async function validCount(params: paramsType.validCount): Promise<validResType> {
  const product_ids = params.product_id.split(',')
  /** sql语句 start */
  const totalSql: querySql = {
    select: ['product_id'],
    from: userCountTable,
    where: [
      { name: 'is_del', opt: '=', val: 0 },
      { name: 'user_id', opt: '=', val: params.uid }
    ]
  }
  /** sql语句 end */
  try {
    const total = await querySql(totalSql)
    const lack_ids = [] as number[]
    product_ids.map((id: string) => {
      const is_lack = total.filter((item: any) => { return item.product_id === Number(id) }).length === 0
      if (is_lack) lack_ids.push(Number(id))
    })
    if (lack_ids.length !== 0) {
      return {
        code: ErrorCode.DATA_INEXISTENCE,
        res: false,
        msg: '账户不存在',
        data: lack_ids
      }
    } else {
      return {
        code: ErrorCode.DATA_EXIST,
        res: true,
        msg: '账户已存在',
        data: lack_ids
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

/**
 * 判断用户密码是否正确（相同）
 * @param params 
 * @returns 
 */
export async function validPassword(params: paramsType.validPassword): Promise<validResType> {
  const { pwd_val, pwd_res, uid } = params
  if (pwd_res) {
    return {
      code: ErrorCode.DATA_EXIST,
      res: bcrypt.compareSync(pwd_val, pwd_res),
      data: '',
      msg: ''
    }
  }

  /** sql语句 start */
  const getPasswordSql: querySql = {
    select: 'password',
    from: userBaseTable,
    where: [{
      name: 'id',
      opt: '=',
      val: uid
    }]
  }
  /** sql语句 end */

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
/**
 * 用户列表
 * @param params 
 * @returns
 */
export async function getUserList(params: paramsType.list) {
  let resArr = [] as any[];
  const { limitStr, limitCount } = getPageLimit(params.page, params.page_count);
  /** sql语句 start */
  const countSql: querySql = {
    select: [
      "SQL_CALC_FOUND_ROWS id",
      "create_time",
      "edit_time",
      "status",
      "nickname",
      "avatar",
      "description",
      "birthday",
      "mobile",
      "area_code",
      "email",
      "name",
      "id_number",
      "sex",
      "is_staff",
    ],
    from: userBaseTable,
    where: [
      { name: "is_del", opt: "=", val: 0 },
    ],
    limit: limitStr,
  };
  const totalSql: querySql = {
    select: [
      {
        name: "FOUND_ROWS()",
        alias: "total",
      },
    ],
  };
  /** sql语句 end */

  const res = await querySql(countSql);
  const total = await querySql(totalSql);

  return {
    data: res,
    total: total[0].total,
    page: params.page,
    page_count: params.page_count,
    page_total: Math.ceil(total[0].total / limitCount),
  }

}

// TODO 用户详情

/**
 * 用户登录
 * @param params 
 * @returns
 */
export async function login(params: paramsType.login) {
  let res = {}

  /** sql语句 start */
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
    where: [{ name: 'id', opt: '=', val: params.id }]
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
    where: [
      { name: 'user_id', opt: '=', val: params.id },
      { name: 'product_id', opt: '=', val: params.product_id }
    ]
  }
  const logParams = {
    uid: params.id,
    product_id: params.product_id,
    device: params.device
  }
  /** sql语句 end */

  try {
    const baseInfo = await querySql(baseSql)
    const countInfo = await querySql(countSql)
    const logInfo = await addLoginLog(logParams)

    // TODO 获取对应产品账户信息
    // TODO 记录token，登录日志，session
    res = {
      ...baseInfo[0],
      token: logInfo.data,
      count_info: countInfo[0],
    }
    
    /** redis存入session start */
    const sessionParams = {
      uid: baseInfo[0].id,
      permission_ids: countInfo.permission_ids ? countInfo.permission_ids.split(',') : [],
      authorization: logInfo.data
    }
    console.log('getRedisSet', sessionParams)
    const cache = await redis.set(logInfo.data || '',JSON.stringify(sessionParams))
    /** redis存入session end */

    return {
      data: res,
      res: true,
      msg: ''
    }
  } catch (error) {
    return {
      code: ErrorCode.OPERATE_FAIL,
      res: false,
      data: '',
      msg: error
    }
  }

}

/**
 * 注册、添加用户
 * @param params 
 */
export async function addUser({ is_staff = 0, ...params }: paramsType.addUser) {
  let uid
  /** sql语句 end */
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
  /** sql语句 end */

  try {
    const res = await insertSql(addSql)
    uid = res.insertId
  } catch (error) {
    return {
      res: false,
      msg: error,
      code: ErrorCode.INSERT_FAIL
    }
  }
  // 用户根据product_id添加对应账户，员工添加所有产品对应账户
  try {
    if (is_staff === 1) {
      let product_ids = [] as number[]
      /** sql语句 start */
      const queryProductSql: querySql = {
        select: 'id',
        from: optionTable,
        where: [
          {
            name: 'parent_id',
            opt: '=',
            val: DefaultOption.PRODUCT_NAME
          }
        ]
      }
      /** sql语句 end */

      const queryRes = await querySql(queryProductSql)
      for (let item of queryRes) {
        product_ids.push(item.id)
      }
      params.product_id = product_ids.join(',')
    }
    const res = await addCount({
      product_id: params.product_id,
      uid: uid
    })
    return {
      res: res.res,
      msg: res.msg,
    }
  } catch (error) {
    return {
      res: false,
      msg: error,
      code: ErrorCode.INSERT_FAIL
    }
  }

}

/**
 * 添加账户
 * @param params 
 */
export async function addCount(params: paramsType.addCount) {
  /** sql语句 start */
  let addSql: insertSql = {
    table: userCountTable,
    values: `(create_time,edit_time,edit_id,user_id,batch,product_id) VALUES `
  }
  let valueStr = [] as string[]
  const product_ids = params.product_id.split(',')
  product_ids.map((id: string) => {
    let itemStr = `('${new Date().toLocaleString()}','${new Date().toLocaleString()}',1,${params.uid},1,${Number(id)})`
    valueStr.push(itemStr)
  })
  addSql.values += valueStr.join(',') + ';'
  /** sql语句 end */

  try {
    await insertSql(addSql)
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
}

/**
 * 添加登录日志
 * @param params 
 */
export async function addLoginLog(params: paramsType.addLog) {
  /** 创建token start */
  const payload = { uid: params.uid }
  // TODO 更改加密密钥
  const searctKey = 'jwtSecret'
  // 时间戳的格式是错误的，因为它应该是秒（10位数字）而不是毫秒（13位数字）（请参阅RFC7519中的NumericDate）
  // const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7
  const tokenExpiresTime = 60 * 60 * 24 * 15
  const token = jwt.sign(payload, searctKey, {
    expiresIn: tokenExpiresTime
  })
  /** 创建token end */

  // TODO 前端接入ip获取接口
  /** sql语句 start */
  let addSql: insertSql = {
    table: userLogTable,
    values: [
      { key: 'user_id', value: params.uid },
      { key: 'ip', value: `192.168.0.13` },
      { key: 'product_id', value: Number(params.product_id) },
      { key: 'token', value: token },
      { key: 'device', value: params.device },
      { key: 'create_time', value: new Date().toLocaleString() }
    ]
  }
  /** sql语句 end */
  try {
    await insertSql(addSql,true,false)
    return {
      res: true,
      msg: "",
      data: token
    }
  } catch (error) {
    return {
      res: false,
      msg: error,
      code: ErrorCode.INSERT_FAIL
    }
  }

}
// TODO 编辑基本信息
// TODO 编辑重要信息
// TODO 编辑员工相关信息
// TODO 更改密码
// TODO 账户更改更新状态
// TODO 更改用户状态
