import redis from "../../cache";
import { querySql, insertSql, updateSql, deleteSql } from "../../db";
import { getPageLimit } from "./select";
import * as paramsType from "../../types/permission_model_type";
import { ErrorCode } from "../../enum/errorCode";
import { ProductName } from "../../enum/defaultOption";

const userCountTable = "temp_public_user_countinfo"
const permissionTable = "temp_public_setting_permission"

/**
 * TODO
 * 1. 根据产品端获取对应的权限菜单列表
 * 2. 
 */

export async function validHasUser() {

}

// TODO 权限组列表细节优化
/**
 * 权限列表
 * @param params
 * @returns
 */
export async function getPermissionList(params: paramsType.list) {
  const { limitStr, limitCount } = getPageLimit(params.page, params.page_count);
  /** sql语句 start */
  const countSql: querySql = {
    select: [
      "SQL_CALC_FOUND_ROWS id",
      "create_time",
      "edit_time",
      "name_c",
      "name_e",
      "description",
      "product_id",
    ],
    from: permissionTable,
    where: [{ name: "is_del", opt: "=", val: 0 }],
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
  // 根据产品id查询
  if (params.product_id && countSql.where) {
    countSql.where.push({
      name: "product_id",
      opt: "=",
      val: params.product_id,
    });
  }
  /** sql语句 end */

  try {
    const data = await querySql(countSql);
    const total = await querySql(totalSql);

    const res = {
      data: data,
      total: total[0].total,
      page: params.page,
      page_count: params.page_count,
      page_total: Math.ceil(total[0].total / limitCount),
    };
    return {
      data: res,
      res: true,
      msg: "",
    };
  } catch (error) {
    return {
      code: ErrorCode.QUERY_FAIL,
      res: false,
      data: "",
      msg: error,
    };
  }
}

/**
 *  判断是否可以添加、编辑筛选项
 * @param params 
 * @returns 
 */
export async function editPermissionValid(params: paramsType.editValid) {
  /** sql语句 start */
  const vaildSql: querySql = {
    select: "*",
    from: permissionTable,
    where: [],
  };
  let whereArr = [
    { name: "is_del", opt: "=", val: 0 },
    { name: "name_c", opt: "=", val: params.name_c },
    { name: "product_id", opt: "=", val: params.product_id },
  ]as any[];
  if (params.id) {
    whereArr.push(
      { name: "id", opt: "<>", val: params.id },
    );
  }
  vaildSql.where = whereArr
  /** sql语句 end */

  const res = await querySql(vaildSql);
  return {
    res: res.length === 0 ? true : false,
    msg: res.length === 0 ? "可以添加" : "同名权限组已存在",
  };
}

/**
 * 添加权限组
 * @param params 
 * @returns 
 */
export async function addPermission(params: paramsType.add) {
  /** sql语句 start */
  const addSql: insertSql = {
    table: permissionTable,
    values: []
  }
  let valueArr = [
    { key: 'product_id', value: params.product_id },
    { key: 'name_c', value: params.name_c },
  ] as any[];
  if (params.name_e) {
    valueArr.push(
      { key: "name_e", value: params.name_e },
    );
  }
  if (params.description) {
    valueArr.push(
      { key: "description", value: params.description },
    );
  }
  addSql.values = valueArr;
  /** sql语句 end */
  if (!Object.values(ProductName).includes(params.product_id)) {
    return {
      res: false,
      msg: '产品id不存在',
    }
  }
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
    }
  }
}

/**
 * 编辑权限组
 * @param params 
 * @returns 
 */
export async function editPermission(params: paramsType.edit) {
  /** sql语句 start */
  const editSql: updateSql = {
    table: permissionTable,
    values: [],
    where: [
      { name: 'id', opt: '=', val: params.id }
    ]
  }
  let valueArr = [
    { key: 'name_e', value: params.name_e },
    { key: 'name_c', value: params.name_c },
  ] as any[];
  if (params.description) {
    valueArr.push(
      { key: "description", value: params.description },
    );
  }
  editSql.values = valueArr;
  /** sql语句 end */

  try {
    const res = await updateSql(editSql)
    return {
      res: true,
      msg: "",
    }
  } catch (error) {
    return {
      res: false,
      msg: error,
    }
  }
}

/**
 * 
 * @param params 
 * @returns 
 */
export async function editUsers(params: paramsType.editUser) {
  /** sql语句 start */
  const countSql: querySql = {
    select : [
      'user_ids'
    ],
    from: permissionTable,
    where: [
      { name: 'id', opt: '=', val: params.id }
    ]
  }
  const curIdSql: updateSql = {
    table: permissionTable,
    values: [
      { key: 'user_ids', value: params.cids }
    ],
    where: [
      { name: 'id', opt: '=', val: params.id }
    ]
  }
  
  /** sql语句 end */

  
  try {
    // 获取user_ids原始数据
    const curIds = params.cids.split(',')
    let cacheIds = [] as string[]    
    const cacheIdsRes = await querySql(countSql);
    if (cacheIdsRes[0].user_ids) {
      cacheIds = cacheIdsRes[0].user_ids.split(',')
    }
    // 获取两个数组中不重复的值
    const diffIds = cacheIds.filter(item => curIds.indexOf(item) === -1).concat(curIds.filter(item => cacheIds.indexOf(item) === -1));

    console.log(diffIds);  
    if (diffIds.length === 0) {
      return {
        res: true,
        msg: "",
      }
    }

    try {
      const editSql: updateSql = {
        table: userCountTable,
        values: [
          {
            key: 'permission_ids',
            value: `
            IF(
              FIND_IN_SET(${params.id}, permission_ids),
              TRIM(BOTH ',' FROM REPLACE(CONCAT(',', permission_ids, ','), CONCAT(',', ${params.id}, ','), ',')),
              IF(permission_ids = '' OR permission_ids IS NULL, ${params.id}, CONCAT(permission_ids, ',', ${params.id}))
            )
            `
          },
          {
            key: 'permission_names',
            value: `
            IF(
              FIND_IN_SET('${params.name_c}', permission_names),
              TRIM(BOTH ',' FROM REPLACE(CONCAT(',', permission_names, ','), CONCAT(',', '${params.name_c}', ','), ',')),
              IF(permission_names = '' OR permission_names IS NULL, '${params.name_c}', CONCAT(permission_names, ',', '${params.name_c}'))
            )
            `
          }
        ],
        where: [
          { name: `id IN (${diffIds.join(',')})`}
        ]
      }
      await updateSql(editSql)
      await updateSql(curIdSql)
      return {
        res: true,
        msg: "",
      }
    } catch (error) {
      return {
        res: false,
        msg: error,
      }
    }
  } catch (error) {
    return {
      res: false,
      msg: error,
    }
  }
}