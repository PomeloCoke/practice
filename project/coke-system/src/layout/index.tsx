import * as React from 'react'; 
import { routes } from '@/routes';
import { observer } from 'mobx-react-lite';
import useStore from '@/stores';

import RouterView from '@/routes/view_util';
import DefaultLayout from './layout_default'

const Layout = () => {
  const store = useStore()
  const storeLogin = store.data.user.login
  return (
    <>
      {/* 默认布局
      --------------------------------------------------- */}
      {storeLogin && <DefaultLayout />}
      {/* 单页布局
      --------------------------------------------------- */}
      {!storeLogin && (
        <div className='layout__single__container'>
          <RouterView routes={routes}/>
        </div>
      )}
    </>
  )
}

export default observer(Layout)