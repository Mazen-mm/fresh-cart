import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserContext } from '../../Context/userContext'
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  let {setToken} = useContext(UserContext)
  useEffect(() => {
    if(localStorage.getItem('userToken') != null){
      setToken(localStorage.getItem('userToken'))
    }
  })

  return (
    <div>
      <Navbar/>
      <div className="container">
        <Outlet/>
      </div>
      <div>
        <Offline>
          <div className="network"><i className='fas fa-wifi'></i>You Are Offline !</div>
        </Offline>
      </div>
      <Footer/>
    </div>
  )
}
