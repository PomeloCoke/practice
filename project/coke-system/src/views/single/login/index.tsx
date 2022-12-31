import * as React from 'react';
import { observer } from 'mobx-react-lite';
import useStore from '@/stores';

import Styles from './index.module.less'
import IconFont from "@/components/iconfont";

function Login() {
  

  return (
    <div className={Styles.page__single__login}>
      <IconFont className={Styles.logo} name="icon-logo" />
      
    </div>
  )
}

export default observer(Login);