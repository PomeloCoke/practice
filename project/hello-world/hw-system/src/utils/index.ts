/**
 * Array, Object, String, Number
 * api回参format
 * api入参format
 */
declare interface Array<T> {
  remove(T: any): void
}

Array.prototype.remove = function (val) {
  const index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}