import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout';
import ENUM from '@/settings/enums'
import 'antd/dist/antd.less'; 

const root = createRoot(document.getElementById("root"));
console.log('getEnumList', ENUM)

root.render(
  <React.StrictMode>
    <Router>
      <Layout LOGIN></Layout>
    </Router>
  </React.StrictMode>
);  