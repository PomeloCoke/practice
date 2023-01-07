import * as React from "react";
import { createFromIconfontCN } from '@ant-design/icons'

type props = {
  name: string,
  className?: string
}
const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3846552_xz17x8hyfha.js'
})

const iconFont = (prop: props) => {
  return <Icon type={prop.name} className={prop.className ? prop.className : ''} />
}

export default iconFont