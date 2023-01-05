import * as React from 'react';
import { observer } from 'mobx-react-lite';
import useStore from '@/stores';

import Styles from './index.module.less'
import { Button as AntButton, Form as AntForm, Input as AntInput, ConfigProvider } from 'antd';
import IconFont from "@/components/iconfont";

const formStyleConfig: AntThemeConfig = {
  token: {
    controlHeight: 54
  }
}

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
          <div className={Styles.mod_login_form_login}>
            <ConfigProvider theme={formStyleConfig}>
              <AntForm layout='vertical'>
                <AntForm.Item
                  label='账号'
                  name="count"
                  rules={[{ required: true, message: 'Please input your mobile!' }]}
                >
                  <AntInput placeholder="请输入手机号" prefix={<IconFont className={Styles.icon} name="icon-interfaces-user" />} />
                </AntForm.Item>

                <AntForm.Item
                  label='密码'
                  name="password"

                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <AntInput type='password' placeholder="请输入密码" prefix={<IconFont className={Styles.icon} name="icon-interfaces_password" />} />
                </AntForm.Item>

                <AntForm.Item>
                  <AntButton type='primary' shape='round' className={Styles.login_btn}>登录</AntButton>
                </AntForm.Item>
              </AntForm>
            </ConfigProvider>
          </div>
        </div>

      </div>
      <div className={Styles.slot__right}>
        <img src="https://pics.pomelode.com/admin/login-bg.png" alt="" className={Styles.background} />
        <div className={Styles.pic_ct}>
          <img src="https://pics.pomelode.com/admin/login-pic.png" alt="" className={Styles.pic} />
        </div>
      </div>
    </div>
  )
}

export default observer(Login);