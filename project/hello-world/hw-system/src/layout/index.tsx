import * as React from 'react'; 
import { STATUS_LAYOUT } from '@/settings/types';
import { routes } from '@/routes';
import RouterView from '@/routes/view_util';

const Layout = (props: STATUS_LAYOUT) => {
  return (
    <div className='layout__app__container'>
      
      {/* 默认布局
      --------------------------------------------------- */}
      {props?.LOGIN && (
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
      {!props?.LOGIN && (
        <div className='layout__single__container'>
          <RouterView routes={routes}/>
        </div>
      )}
    </div>
  )
}

export default Layout