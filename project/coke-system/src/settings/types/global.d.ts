import { ACTION, STATE } from "@/stores/types"
import { Router } from "@/routes/types"
export { }
declare global {
  interface Array<T> {
    remove(val: T): Array<T>
  }
  interface Window {
    className: Function
  }

  type ROUTER = Router

  type STORE_STATE = STATE
  type STORE_ACTION = ACTION
  
  interface STORE extends STORE_ACTION {
    data: STORE_STATE
  }
}
