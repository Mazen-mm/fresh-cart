import React from 'react'
import { Navigate } from 'react-router-dom'

export default function GuardRouting({children}) {
  //// if user is login ? open the app ////
  if (localStorage.getItem('userToken') != null) {
    return children
  }
  //// else ? go to Login ////
  else {
    return <Navigate to='/login'/>
  }
}
