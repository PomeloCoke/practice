import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import useStore from '@/stores';
import 'antd/dist/antd.less'; 
import '/public/style/theme.css'
import '@/utils'
import '@/utils/style'
import ENUM from '@/settings/enums'

import Layout from '@/layout';

const App = observer(() => {
  // 进入app初始化store
  const store = useStore()
  const { theme, theme_mod } = store.data.layout

  store.getSystemInfo()
  document.getElementsByTagName('html')[0].className = `theme__${theme_mod} theme__${theme}`

  return (
    <React.StrictMode>
      <Router>
      <Layout></Layout>
      </Router>
    </React.StrictMode>
  )
})


const root = createRoot(document.getElementById("layout__app__container"));
root.render(
  <App/>
);  