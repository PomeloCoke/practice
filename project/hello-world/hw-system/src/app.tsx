import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 

import App from "@/views/index/index";
import Layout from './layout';
import ENUM from '@/settings/enums'
import 'antd/dist/antd.less'; 

const root = createRoot(document.getElementById("root"));
console.log('getEnumList', ENUM)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
      <Layout LOGIN={false}></Layout>
    </BrowserRouter>
  </React.StrictMode>
);  