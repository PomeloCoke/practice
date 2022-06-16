import * as React from 'react'; 
import { STATUS__LAYOUT } from '@/settings/types';
import SettingList from './setting-list';


const Layout = (props: STATUS__LAYOUT) => {
  return (
    <div className="layout__app__container">
      {
        props?.LOGIN &&
        <div className="layout__slot__left">

        </div>
      }
      <div className="layout__slot__mid">

      </div>
      <SettingList></SettingList>
    </div>
  )
}

export default Layout