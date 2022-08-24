import * as React from 'react';
import { observer } from 'mobx-react-lite';
import useStore from '@/stores';
import { Link } from 'react-router-dom';

function Login() {
  const store = useStore()
  const storeLogin = store.data.user.login
  return (
    <div className='page__single__login'>
      <button onClick={()=>store.setLogin(!storeLogin)}>点击切换登录状态</button>
      {storeLogin ? '已登录' : '未登录'}
      <div>
        <Link to='/dashboard'>跳转至dashboard</Link>
      </div>
    </div>
  )
}

export default observer(Login);