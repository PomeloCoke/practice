import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import useStore from '@/stores';
import 'antd/dist/antd.less'; 
import '/public/style/theme.css'
import '@/utils'
import ENUM from '@/settings/enums'

import Layout from '@/layout';

const App = observer(() => {
  // 进入app初始化store
  const store = useStore()
  store.getSystemInfo()
  
  return (
    <React.StrictMode>
      <Router>
      <Layout></Layout>
      </Router>
    </React.StrictMode>
  )
})

document.getElementsByTagName('html')[0].className = 'theme__light theme__vitality'
const root = createRoot(document.getElementById("layout__app__container"));
root.render(
  <App/>
);  