import React, { useContext } from 'react'
import { UserContext } from '../../Context/userContext'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  let {userData} = useContext(UserContext);
  let nav = useNavigate();

  function navToMyCart () {
    nav('/cart')
  }
  
  return <>
    <div className="container text-center my-5">
      <h1 className='text-main mt-5'>Hello : {userData?.name}</h1>
      <h5>Your Email is : {userData?.email}</h5>
      <button className='btn bg-main text-white my-5 w-25' onClick={navToMyCart}>My Cart</button>
    </div>
  </>
}
