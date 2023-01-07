import {
  cloneDeep
} from 'lodash'
/**
 * Array, Object, String, Number
 * api回参format
 * api入参format
 */

/*Array Extend Start**********************************************/
/**
 * 删除元素
 * @return 返回删除元素后的原数组
 */
Array.prototype.remove = function<T>(this: T[], val: T): T[] {
  return this.filter(el => el !== val)
}
/*Array Extend End************************************************/

/*Data Extend Start***********************************************/
const localStorge = window.localStorage
const sessionStorge = window.sessionStorage

window._cloneDeep = function _cloneDeep(value: any) {
  return cloneDeep(value)
}
/**
 * 判断值是否为object
 * @param {any}val
 * @returns {boolean}
 */
 export function isObject(val: any): boolean {
  const type = val = typeof val
  return val != null && (type === 'object' || type === 'function')
}
/*Data Extend End*************************************************/

/**
 * 判断是否是基本数据类型
 * @param value 数据值
 * @returns {boolean}
 */
function isPrimitiveValue(value: any): boolean {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol' ||
    value === null ||
    Number.isNaN(value)
  )
}


window.validFormValue = (form:AntFormInstance) =>{
  return new Promise<any>((resolve, reject) => {
    form.validateFields().then(values => {
      resolve(true)
    }).catch(error => {
      resolve(false)
    })
  })
}


export default {}