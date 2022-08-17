export {}
declare global {
  interface Array<T> {
    remove(val: T): Array<T>
  }
}