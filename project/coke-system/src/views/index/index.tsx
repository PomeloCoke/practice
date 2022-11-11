import * as React from 'react';
import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Public from '../../apis/public';
import instance from '@/apis'

async function resData() {
  const res = await Public.getOptionList()
  return res
}

const App = () => {
  useEffect( () => {
    
  },[])
  const res = resData()
    console.log('getRes', res)
  
  return (
    <div className='app'>
      <h1>Hello World </h1>
    </div>
  )
}



export default App;