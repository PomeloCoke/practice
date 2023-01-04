import * as React from 'react';
import { observer } from 'mobx-react-lite';
import useStore from '@/stores';

import Styles from './index.module.less'
import { Input as AntInput } from 'antd';
import IconFont from "@/components/iconfont";

function Login() {


  return (
    <div className={Styles.page__single__login}>
      <div className={Styles.slot__left}>
        <IconFont className={Styles.logo} name="icon-logo" />
        <div className={Styles.form__login}>
          <div className={Styles.header_main}>
            <div className={Styles.header_main_cname}>登录</div>
            <div className={Styles.header_main_ename}>LOGIN</div>
          </div>
          <div className={Styles.header_sub}>欢迎登录 Pomelode 工作室管理系统</div>
        </div>
        <div className="">
          <AntInput placeholder="Basic usage" prefix={<IconFont className={Styles.icon} name="icon-interfaces-user" />} />
        </div>
      </div>
      <div className={Styles.slot__right}>
        <img src="https://pics.pomelode.com/admin/login-bg.png" alt="" className={Styles.background} />
      </div>
    </div>
  )
}

export default observer(Login);