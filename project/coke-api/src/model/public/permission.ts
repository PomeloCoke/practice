import redis from "../../cache";
import { querySql, insertSql, updateSql, deleteSql } from "../../db";
import { getPageLimit } from "./select";
import * as paramsType from "../../types/permission_model_type";
import { ErrorCode } from "../../enum/errorCode";

const  userCountTable = "temp_public_user_countinfo"
const permissionTable = "temp_public_setting_permission"

/**
 * TODO
 * 1. 根据产品端获取对应的权限菜单列表
 * 2. 
 */

export async function validHasUser() {

}

export async function getPermissionList() {
  
}