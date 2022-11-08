import { querySql } from "../../db";
import { getPageLimit } from "./select";

const optionTableName = "t_public_setting_option";
type listParamsType = {
  id?: number;
  parent_id?: number;
  name_c?: string;
  side?: 0 | 1 | 2;
  page?: number;
  page_count?: number;
};

export async function getOptionList(params: listParamsType) {
  let resArr = [] as any[];
  const { limitStr, limitCount } = getPageLimit(params.page, params.page_count);
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
      {
        name: "is_del",
        opt: "=",
        val: 0,
      },
      {
        name: "parent_id",
        opt: "IS",
        val: "NULL",
      },
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

  const res = await querySql(countSql);
  const total = await querySql(totalSql);
  for (let parent of res) {
    const children = await getOptionChildren(parent.id);
    resArr.push({
      ...parent,
      children,
    });
  }
  return {
    data: resArr,
    total: total[0].total,
    page: params.page,
    page_count: params.page_count,
    page_total: Math.ceil(total[0].total / limitCount),
  };
}

type detailParamsType = {
  id: number;
};

// 获取筛选项子项
async function getOptionChildren(parent_id: number): Promise<any> {
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
      {
        name: "is_del",
        opt: "=",
        val: 0,
      },
      {
        name: "parent_id",
        opt: "=",
        val: parent_id,
      },
    ],
  };
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

export async function getOptionDetail(params: detailParamsType) {
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
      {
        name: "is_del",
        opt: "=",
        val: 0,
      },
      {
        name: "id",
        opt: "=",
        val: params.id,
      },
    ],
  };

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

type editVaildType = {
  parent_id?: number;
  name_c: string;
  side: number;
};
// 判断是否可以添加、编辑筛选项
export async function editOptionValid(params: editVaildType) {
  const vaildSql: querySql = {
    select: "*",
    from: optionTableName,
    where: [
      {
        name: "is_del",
        opt: "=",
        val: 0,
      },
      {
        name: "name_c",
        opt: "=",
        val: params.name_c,
      },
      {
        name: "side",
        opt: "=",
        val: params.side,
      },
      {
        name: "parent_id",
        opt: params.parent_id ? "=" : "IS",
        val: params.parent_id ? params.parent_id : "NULL",
      },
    ],
  };
  const res = await querySql(vaildSql);
  return {
    res: res.length === 0 ? true : false,
    msg: res.length === 0 ? "可以添加" : "同名筛选项已存在",
  };
}
