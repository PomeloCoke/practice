import DATE from './date'
import CLIENT from './client'
import API from './api'

// TODO 枚举变量类型定义
const enumImportList: any = { DATE, CLIENT }
let enumExportList:any = {}

Object.keys(enumImportList).map(key=> {
  Object.keys(enumImportList[key]).map(itemKey=> {
    enumExportList[itemKey] = enumImportList[key][itemKey]
  })
})

function exportEnumItem(item: any) {

}

export default enumExportList




