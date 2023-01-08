import * as React from "react";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import useStore from "@/stores";

import { RES_STATUS } from "@/settings/enums/api";
import { STATE_USER } from "@/stores/types";
import Public from "@/apis/public";
import Styles from "./index.module.less";
import {
  Button as AntButton,
  Form as AntForm,
  Input as AntInput,
  message as AntMessage,
  ConfigProvider,
} from "antd";
import IconFont from "@/components/iconfont";

const formStyleConfig: AntThemeConfig = {
  token: {
    controlHeight: 54,
  },
};

const Login = () => {
  const Store = useStore();

  const formRef = React.useRef(null);
  const [form] = AntForm.useForm();
  const [messageApi, contextHolder] = AntMessage.useMessage();
  const state = useLocalObservable(() => ({
    loading: false,
    passwordVisible: false,
    loginValid: false,
    formData: {
      count: "",
      password: "",
    },
  }));

  const loginValid = () => {
    runInAction(() => {
      state.loginValid = !(
        !form.getFieldValue("count") || !form.getFieldValue("password")
      );
    });
  };

  // 登录按钮
  const loginSubmit = async () => {
    const validRes = await window.validFormValue(form);
    if (!validRes) {
      return;
    } else if (validRes && !state.loading) {
      runInAction(() => {
        state.loading = true;
      });
      const sendData = {
        area_code: 86,
        mobile: form.getFieldValue("count"),
        password: form.getFieldValue("password"),
        product_id: "14",
      };
      try {
        const res = await Public.loginAdmin(sendData);
        if (res.code === RES_STATUS.Success) {
          const {
            token,
            id,
            nickname,
            avatar,
            birthday,
            sex,
            description,
            count_info,
            email,
            area_code,
            mobile,
            id_number,
          } = res.data;
          const userInfo: STATE_USER = {
            login: true,
            uid: id,
            token,
            nickname,
            avatar,
            birthday,
            sex,
            description,
            count_info,
            advance_info: {
              email,
              area_code,
              mobile,
              id_number,
            },
          };
          messageApi.success(res.msg);
          Store.setLogin(true, userInfo);
        } else {
          messageApi.error(res.msg);
        }
      } catch (error) {
        messageApi.error(error);
      }

      runInAction(() => {
        state.loading = false;
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className={Styles.page__single__login}>
        <div className={Styles.slot__left}>
          <IconFont className={Styles.logo} name="icon-logo" />
          <div className={Styles.form__login}>
            <div className={Styles.header_main}>
              <div className={Styles.header_main_cname}>登录</div>
              <div className={Styles.header_main_ename}>LOGIN</div>
            </div>
            <div className={Styles.header_sub}>
              欢迎使用 Pomelode 工作室管理系统
            </div>

            <div className={Styles.mod_login_form_login}>
              <ConfigProvider theme={formStyleConfig}>
                <AntForm
                  ref={formRef}
                  layout="vertical"
                  form={form}
                  initialValues={state.formData}
                  onValuesChange={loginValid}
                >
                  <AntForm.Item
                    label="账号"
                    name="count"
                    rules={[{ required: true, message: "请输入手机号" }]}
                  >
                    <AntInput
                      placeholder="请输入手机号"
                      prefix={
                        <IconFont
                          className={Styles.icon}
                          name="icon-interfaces-user"
                        />
                      }
                    />
                  </AntForm.Item>
                  <AntForm.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: "请输入密码" }]}
                  >
                    <AntInput.Password
                      placeholder="请输入密码"
                      prefix={
                        <IconFont
                          className={Styles.icon}
                          name="icon-interfaces_password"
                        />
                      }
                      iconRender={(visible) => (
                        <div
                          onClick={() => {
                            state.passwordVisible = !visible;
                          }}
                        >
                          <IconFont
                            className={Styles.icon}
                            name={`icon-interfaces-eye${
                              !visible ? "-slash" : ""
                            }`}
                          />
                        </div>
                      )}
                      visibilityToggle={{ visible: state.passwordVisible }}
                    />
                  </AntForm.Item>
                  <AntForm.Item>
                    <AntButton
                      type="primary"
                      shape="round"
                      icon={<div className={Styles.icon}></div>}
                      className={Styles.login_btn}
                      // disabled={!state.loginValid}
                      onClick={loginSubmit}
                      loading={state.loading}
                    >
                      登录
                    </AntButton>
                  </AntForm.Item>
                </AntForm>
              </ConfigProvider>
            </div>
          </div>
        </div>
        <div className={Styles.slot__right}>
          <img
            src="https://pics.pomelode.com/admin/login-bg.png"
            alt=""
            className={Styles.background}
          />
          <div className={Styles.pic_ct}>
            <img
              src="https://pics.pomelode.com/admin/login-pic.png"
              alt=""
              className={Styles.pic}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Login);
