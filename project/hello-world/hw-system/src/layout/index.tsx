import * as React from 'react'; 
import { routes } from '@/routes';
import { observer } from 'mobx-react-lite';
import RouterView from '@/routes/view_util';
import useStore from '@/stores';

const Layout = () => {
  const store = useStore()
  const storeLogin = store.data.user.login
  return (
    <div className='layout__app__container'>
      
      {/* 默认布局
      --------------------------------------------------- */}
      {storeLogin && (
        <div className='layout__default__container'>
          <div className='layout__slot__left'>

          </div>
          <div className='layout__slot__mid'>
          <RouterView routes={routes}/>
          </div>
        </div>
      )}
      {/* 单页布局
      --------------------------------------------------- */}
      {!storeLogin && (
        <div className='layout__single__container'>
          <RouterView routes={routes}/>
        </div>
      )}
      <button onClick={()=>store.setLogin(!storeLogin)}>点击切换登录状态</button>
      {storeLogin ? '已登录' : '未登录'}
    </div>
  )
}

export default observer(Layout)