import { ThemeConfig } from 'antd/es/config-provider/context'
import { ACTION, STATE } from "@/stores/types"
import { Router } from "@/routes/types"
import { FormInstance } from 'antd'
import './plugin'
export { }
declare global {
  interface Array<T> {
    remove(val: T): Array<T>
  }
  interface Window {
    className: Function,
    validFormValue: Function
  }

  type AntThemeConfig = ThemeConfig
  type AntFormInstance = FormInstance<any>

  type ROUTER = Router

  type STORE_STATE = STATE
  type STORE_ACTION = ACTION
  
  interface STORE extends STORE_ACTION {
    data: STORE_STATE
  }
}
