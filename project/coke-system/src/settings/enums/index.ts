import DATE from './date'
import CLIENT from './client'
import API from './api'

// TODO 枚举变量类型定义
let enumImportList: any = { DATE, CLIENT, API }
let enumExportList:any = {}

Object.keys(enumImportList).map(key=> {
  Object.keys(enumImportList[key]).map(itemKey=> {
    enumExportList[itemKey] = enumImportList[key][itemKey]
  })
})

const enumFiles = require.context('./', true, /.ts$/)
enumFiles.keys()
.filter((path) => path !== "./index.ts")
.forEach((path) => {
  
  const enumName = path.replace(/(.*\/)*([^.]+).*/ig, "$2").toUpperCase()
  // console.log('export path', enumName)
  //  eval(`import ${enumName} from '${path}'`)
  //  enumExportList[enumName] = eval(`${enumName}`)
});

export default {enumExportList}




