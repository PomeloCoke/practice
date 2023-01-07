export enum STAFF {
  Admin = 0,        // 超级管理员
}

export enum USER {
  Visitor = 0,        // 游客
  Common,        // 普通用户
  Vip        // vip用户
}

export enum AUTHORITY {
  None = 0,        // 无任何权限
  Read,        // 可阅读
  Edit,        // 可编辑
  Add,        // 可添加
  Delete,        // 可删除
  Upload,       // 可上传
  Download      // 可下载
}

export default {
  STAFF,
  USER,
  AUTHORITY
}
