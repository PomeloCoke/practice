import { ErrorCode } from "../../enum/errorCode";
import { querySql, insertSql, updateSql, deleteSql } from "../../db";
import * as paramsType from '../../types/option_model_type'
import { getPageLimit } from "./select";

const optionTableName = "t_public_setting_option";

/**
 * 获取筛选项子项
 * @param parent_id 
 * @returns 
 */
async function getOptionChildren(parent_id: number): Promise<any> {
  /** sql语句 start */
  const childSql: querySql = {
    select: [
      "id",
      "create_time",
      "edit_time",
      "parent_id",
      "name_c",
      "name_e",
      "side",
    ],
    from: optionTableName,
    where: [
      { name: "is_del", opt: "=", val: 0 },
      { name: "parent_id", opt: "=", val: parent_id }
    ],
  };
  /** sql语句 end */

  const res = await querySql(childSql);
  if (res.length === 0) {
    return res;
  } else {
    let childrenArr = [];
    for (let child of res) {
      const children = await getOptionChildren(child.id);
      childrenArr.push({
        ...child,
        children,
      });
    }
    return childrenArr;
  }
}

/**
 * 获取筛选项列表
 * @param params 
 * @returns 
 */
export async function getOptionList(params: paramsType.list) {
  let resArr = [] as any[];
  const { limitStr, limitCount } = getPageLimit(params.page, params.page_count);
  /** sql语句 start */
  const countSql: querySql = {
    select: [
      "SQL_CALC_FOUND_ROWS id",
      "create_time",
      "edit_time",
      "parent_id",
      "name_c",
      "name_e",
      "side",
    ],
    from: optionTableName,
    where: [
      { name: "is_del", opt: "=", val: 0 },
      { name: "parent_id", opt: "IS", val: "NULL" }
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

  // 一级筛选框名称模糊查询
  if (params.name_c && countSql.where) {
    countSql.where.push({
      name: "name_c",
      opt: "LIKE",
      val: `%${params.name_c}%`,
    });
  }

  // 筛选框所属端查询
  if (params.side && countSql.where) {
    countSql.where.push({
      name: "side",
      opt: "=",
      val: params.side,
    });
  }
  /** sql语句 end */

  try {
    const data = await querySql(countSql);
    const total = await querySql(totalSql);
    for (let parent of data) {
      const children = await getOptionChildren(parent.id);
      resArr.push({
        ...parent,
        children,
      });
    }

    const res = {
      data: resArr,
      total: total[0].total,
      page: params.page,
      page_count: params.page_count,
      page_total: Math.ceil(total[0].total / limitCount),
    }
    return {
      data: res,
      res: true,
      msg: ''
    };
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
 * 获取筛选项详情
 * @param params 
 * @returns 
 */
export async function getOptionDetail(params: paramsType.detail) {
  /** sql语句 start */
  const detailSql: querySql = {
    select: [
      "id",
      "create_time",
      "edit_time",
      "parent_id",
      "name_c",
      "name_e",
      "side",
    ],
    from: optionTableName,
    where: [
      { name: "is_del", opt: "=", val: 0 },
      { name: "id", opt: "=", val: params.id }
    ],
  };
  /** sql语句 end */

  const res = await querySql(detailSql);
  if (res.length === 0) {
    return res;
  }
  const children = await getOptionChildren(params.id);
  return {
    ...res[0],
    children,
  };
}

/**
 *  判断是否可以添加、编辑筛选项
 * @param params 
 * @returns 
 */
export async function editOptionValid(params: paramsType.editValid) {
  /** sql语句 start */
  const vaildSql: querySql = {
    select: "*",
    from: optionTableName,
    where: [
      { name: "is_del", opt: "=", val: 0 },
      { name: "name_c", opt: "=", val: params.name_c },
      { name: "side", opt: "=", val: params.side },
      {
        name: "parent_id",
        opt: params.parent_id ? "=" : "IS",
        val: params.parent_id ? params.parent_id : "NULL"
      },
    ],
  };
  /** sql语句 end */

  // TODO 当有parent_id时，先判断是否存在父筛选项
  const res = await querySql(vaildSql);
  return {
    res: res.length === 0 ? true : false,
    msg: res.length === 0 ? "可以添加" : "同名筛选项已存在",
  };
}

/**
 * 添加筛选项
 * @param params 
 * @returns 
 */
export async function addOptionItem(params: paramsType.add) {
  /** sql语句 start */
  const addSql: insertSql = {
    table: optionTableName,
    values: [
      { key: 'parent_id', value: params.parent_id },
      { key: 'name_e', value: params.name_e },
      { key: 'name_c', value: params.name_c },
      { key: 'side', value: params.side },
    ]
  }
  /** sql语句 end */

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
 * 编辑筛选项
 * @param params 
 * @returns 
 */
export async function editOptionItem(params: paramsType.edit) {
  /** sql语句 start */
  const editSql: updateSql = {
    table: optionTableName,
    values: [
      { key: 'parent_id', value: params.parent_id },
      { key: 'name_e', value: params.name_e },
      { key: 'name_c', value: params.name_c },
      { key: 'side', value: params.side },
    ],
    where: [
      { name: 'id', opt: '=', val: params.id }
    ]
  }
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
 * 判断筛选项是否可删除
 * @param params 
 * @returns 
 */
export async function delOptionValid(params: paramsType.delValid) {
  /** sql语句 start */
  const vaildSql: querySql = {
    select: "*",
    from: optionTableName,
    where: [
      {
        name: "parent_id",
        opt: "=",
        val: params.id,
      },
    ],
  };
  /** sql语句 end */

  const res = await querySql(vaildSql);
  return {
    res: res.length === 0 ? true : false,
    msg: res.length === 0 ? "可以删除" : "请先删除子筛选项",
  };
}

/**
 * 删除筛选项
 * @param params 
 * @returns 
 */
export async function delOptionItem(params: paramsType.del) {
  /** sql语句 start */
  const editSql: deleteSql = {
    table: optionTableName,
    where: [
      { name: 'id', opt: '=', val: params.id }
    ]
  }
  /** sql语句 end */

  try {
    const res = await deleteSql(editSql)
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
