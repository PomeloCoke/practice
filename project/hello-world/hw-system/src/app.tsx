import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import 'antd/dist/antd.less'; 
import '@/utils'
import ENUM from '@/settings/enums'

import Layout from '@/layout';

const App = observer(() => {
  return (
    <React.StrictMode>
      <Router>
      <Layout></Layout>
      </Router>
    </React.StrictMode>
  )
})

const root = createRoot(document.getElementById("root"));
root.render(
  <App/>
);  