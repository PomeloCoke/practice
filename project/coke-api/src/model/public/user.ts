import { query } from "@/types/sql";
import { querySql, insertSql, updateSql, deleteSql } from "../../db";
import { getPageLimit } from "./select";

const userBaseTable = 'temp_public_user_baseinfo';
const userCountTable = 'temp_public_user_countinfo';
const userLogTable = 'temp_public_user_loginlog'
/**
  * TODO
  * 校验信息、数据处理
  * 1. 根据手机号/邮箱/uid 判断数据库内是否有该用户
  * 2. 登录：根据手机号/邮箱/uid和密码 判断是否为该用户
  * 3. 注册：根据邮箱验证码 校验注册数据安全性（待完善）
  * 4. 请求接口：已登录用户token是否过期（中间件）
  * 5. 请求接口：判断是否需要登录、是否拥有权限（中间件）
  * 6. 明文密码转为加密密码
  * 7. 生成token
 */

type validUserType = {
  mobile?: string,
  email?: string,
  uid?: number,
  passward?: string
}
export async function validHasUser(params: validUserType) {
  const { mobile, email, uid } = params
  if (!mobile && !email && !uid) {
    return {
      res: false,
      msg: '手机号/邮箱/uid至少传入一个'
    }
  }

  const totalSql:querySql = {
    select: [
      {
        name: 'COUNT(*)',
        alias: 'total'
      }
    ],
    from: userBaseTable,
    where: []
  }
  if (mobile) {
    totalSql.where?.push({
      name: 'mobile',
      opt: '=',
      val: mobile
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
    if (total[0].total === 1) {
      return {
        res: true,
        msg: '存在该用户'
      }
    } else {
      return {
        res: false,
        msg: '不存在该用户'
      }
    }
  } catch (error) {
    return {
      res: false,
      msg: error
    }
  }
  
}

// 用户列表
// 用户详情
// 登录、注册
// 添加用户
// 添加账户
// 添加登录日志
// 编辑基本信息
// 编辑重要信息
// 编辑员工相关信息
// 更改密码
// 账户更改更新状态
// 更改用户状态