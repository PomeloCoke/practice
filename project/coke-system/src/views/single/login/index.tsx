import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react-lite';
import useStore from '@/stores';

import styles from './index.module.less'

function Login() {
  /*State Start*************************************************/
  const store = useStore()
  const state = useLocalStore(()=>({

  }))
  /*State End***************************************************/
  const storeLogin = store.data.user.login

  return (
    <div className={styles.page__single__login}>
      <input className={styles.text} placeholder="啦啦啦"/>
    </div>
  )
}

export default observer(Login);