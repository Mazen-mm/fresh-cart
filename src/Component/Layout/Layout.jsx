import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Statics/Navbar/Navbar'
import Footer from '../Statics/Footer/Footer'
import { UserContext } from '../../Context/userContext'
import { Offline } from "react-detect-offline";
import { cartContext } from '../../Context/cartContext'

export default function Layout() {
  let {setToken} = useContext(UserContext);
  let {getLoggedUserCart , setNumOfCartItems} = useContext(cartContext);
/////// Function to check if userToken existing ? get User cart data ///////
  useEffect(() => {
    if(localStorage.getItem('userToken') != null){
      setToken(localStorage.getItem('userToken'))
      getCartData()
    }
  } , [])
/////// Function to get user cart data ///////
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
      {/* //// Outlet or Children components //// */}
      <div className="container">
        <Outlet/>
      </div>
      {/* //// Outlet or Children components //// */}
      {/* ///// Library Component to alert if user offline ///// */}
      <div>
        <Offline><div className="network"><i className='fas fa-wifi'></i>You Are Offline !</div></Offline>
      </div>
      {/* ///// Library Component to alert if user offline ///// */}
      {/* //// Footer Fixed Component //// */}
      <Footer/>
    </div>
  )
}
