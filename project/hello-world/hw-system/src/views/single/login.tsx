import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react-lite';
import useStore from '@/stores';


function Login() {
  /*State Start*************************************************/
  const store = useStore()
  const state = useLocalStore(()=>({
    count: 0,
    layout: false,
    addCount() {
      state.count++
      console.log('getClick',state.count)
      
    },
    toggleLayout() {
      state.layout = !state.layout
      state.addCount()
    }
  }))
  /*State End***************************************************/
  const storeLogin = store.data.user.login

  return (
    <div className='page__single__login'>
      <button onClick={()=>store.setLogin(!storeLogin)}>点击切换登录状态</button>
      {storeLogin ? '已登录' : '未登录'}
      <div>
        <Link to='/dashboard'>跳转至dashboard</Link>
        {`——已点击${state.count}次`}
        </div>
    </div>
  )
}

export default observer(Login);