
import antdConst from '@/assets/style/antdConst'
window.className = function className(styleList: string[]): string {
  return styleList.filter(item=>item).join(" ")
}

export const getThemeVariable = (theme_mod: string, theme: string):AntThemeConfig => {
  type themeType = keyof typeof antdConst
  const themeItem = antdConst[theme as themeType]
  type modType = keyof typeof themeItem
  const modItem = themeItem[theme_mod as modType]
  console.log('getFileData', modItem)

  const {
    theme_primary,
    theme_warning,
    theme_error,
    theme_success,

    warning_container,
    error_container,
    success_container,

    basic_background,
    basic_border
  } = modItem
  


  const config:AntThemeConfig = {
    token: {
      colorPrimary: theme_primary,
      colorWarning: theme_warning,
      colorError: theme_error,
      colorSuccess: theme_success,
      colorBgBase: basic_background,
      colorBorder: basic_border
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