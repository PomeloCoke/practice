import * as React from 'react';
import { observer } from 'mobx-react-lite';
import useStore from '@/stores';

import Styles from './index.module.less'
import IconFont from "@/components/iconfont";

const getBgStyle = () => {

}

function Login() {
  

  return (
    <div className={Styles.page__single__login}>
      <IconFont className={Styles.logo} name="icon-logo" />
      <div className={Styles.slot__left}></div>
      <div className={Styles.slot__right}>
        <img src="https://pics.pomelode.com/admin/login-bg.png" alt="" className={Styles.background} />
      </div>
    </div>
  )
}

export default observer(Login);