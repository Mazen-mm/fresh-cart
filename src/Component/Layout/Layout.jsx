import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserContext } from '../../Context/userContext'
import { Offline } from "react-detect-offline";
import { cartContext } from '../../Context/cartContext'

export default function Layout() {
  let {setToken} = useContext(UserContext)
  let {getLoggedUserCart , setNumOfCartItems} = useContext(cartContext)
  useEffect(() => {
    if(localStorage.getItem('userToken') != null){
      setToken(localStorage.getItem('userToken'))
      getCartData()
    }
  } , [])

  async function getCartData () {
    let {data} = await getLoggedUserCart().catch( (err)=> {
      console.log(err);
    } );
    if(data?.status === 'success'){
      setNumOfCartItems(data?.numOfCartItems)
    }
  }

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
