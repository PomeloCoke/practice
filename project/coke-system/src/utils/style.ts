
import antdConst from '@/assets/style/antdConst'
import {ThemeConfig} from 'antd/es/config-provider/context'
window.className = function className(styleList: string[]): string {
  return styleList.filter(item=>item).join(" ")
}

export const getThemeVariable = (theme_mod: string, theme: string):ThemeConfig => {
  type themeType = keyof typeof antdConst
  const themeItem = antdConst[theme as themeType]
  type modType = keyof typeof themeItem
  const modItem = themeItem[theme_mod as modType]
  console.log('getFileData', modItem)
  


  const config:ThemeConfig = {
    token: {
      colorBgBase: '#FEFCF5',
      colorPrimary: '#75825F'
    }
  }
  return config
}

const getWinHeight = () => {
  let height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0

  return height
}
export default {
  getThemeVariable
}