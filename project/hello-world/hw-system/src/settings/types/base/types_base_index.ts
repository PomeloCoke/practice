export type ROUTER = {
  path: string,
  redirect?: string,
  component?: any
  meta?: {
    title?: string,
    authority?: boolean,
  },
  children?: ROUTER[]
}