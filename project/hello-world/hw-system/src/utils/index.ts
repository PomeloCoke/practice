/**
 * Array, Object, String, Number
 * api回参format
 * api入参format
 */
declare interface Array<T> {
  remove(T: any): void
}

// Array.prototype.remove = function (val) {
//   const index = this.indexOf(val)
//   if (index > -1) {
//     this.splice(index, 1)
//   }
// }

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
    value == null ||
    Number.isNaN(value)
  )
}

/**
 * 判断值是否为object
 * @param {any}value
 * @returns {boolean}
 */
export function isObject(value: any): boolean {
  const type = value = typeof value
  return value != null && (type === 'object' || type === 'function')
}
/**
 * 对象数据深拷贝
 */
export function deepClone(value: any) {
  if (isPrimitiveValue(value)) {
    return value == null ? '' : value
  }
  let result
  if (typeof value === 'function') {
    result = eval(`(${value.toString()})`)
  } else if (Array.isArray(value)) {
    result = []
  } else if (value instanceof RegExp) {
    result = new RegExp(value)
  } else if (value instanceof Date) {
    result = new Date(value)
  } else if (value instanceof Number) {
    result = new Number(value)
  } else if (value instanceof String) {
    result = new String(value)
  } else if (value instanceof Boolean) {
    result = new Boolean(value)
  } else if (typeof value === 'object') {
    result = new Object()
  }

  for (let key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      try {
        result[key] = deepClone(value[key])

      } catch (error) {
        console.error(error)
      }
    }
  }

  return result
}

export default {
  isObject,
}