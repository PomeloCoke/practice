export interface componentFn<T> {
  (props: T) : void
}

export type ROUTER = {
  path: string,
  component: componentFn<any>
}