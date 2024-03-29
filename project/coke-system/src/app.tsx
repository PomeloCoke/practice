import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router } from 'react-router-dom';
import useStore from '@/stores';

import '@/assets/style/index.less'
import '/public/style/default.css'
import { ConfigProvider } from 'antd';
import '@/utils'
import * as StyleUtils from '@/utils/style'
import Layout from '@/layout';

const App = observer(() => {
  const Store = useStore()
  const StoreData = Store.data
  
  // 读取用户的缓存系统配置信息
  Store.getSystemInfo()

  // 初始化配置系统主体类名
  const { theme, theme_mod } = StoreData.layout
  document.getElementsByTagName('html')[0].className = `theme__${theme_mod} theme__${theme}`

  return (
    // <React.StrictMode>
      <Router>
      <ConfigProvider
      theme={StyleUtils.getThemeVariable(theme_mod, theme)}>
        <Layout></Layout>
      </ConfigProvider>
      
      </Router>
    // </React.StrictMode>
  )
})


const root = createRoot(document.getElementById("layout__app__container"));
root.render(
  <App/>
);  