export enum STAFF {
  Admin = 0,        // 超级管理员
}

export enum USER {
  Visitor = 0,        // 游客
  Common = 1,        // 普通用户
  Vip = 2        // vip用户
}

export enum AUTHORITY {
  None = 0,        // 无任何权限
  Read = 1,        // 可阅读
  Edit = 2,        // 可编辑
  Add = 3,        // 可添加
  Delete = 4,        // 可删除
  Upload = 5,       // 可上传
  Download = 6       // 可下载
}

export default {
  STAFF,
  USER,
  AUTHORITY
}
