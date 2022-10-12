import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer, useLocalStore } from 'mobx-react-lite';
import useStore from '@/stores';


function Login() {
  /*State Start*************************************************/
  const store = useStore()
  const state = useLocalStore(()=>({

  }))
  /*State End***************************************************/
  const storeLogin = store.data.user.login

  return (
    <div className='page__single__login'>
      
    </div>
  )
}

export default observer(Login);