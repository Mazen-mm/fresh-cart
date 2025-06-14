import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/userContext';
import { jwtDecode } from 'jwt-decode';
import logo from '../../../assets/freshcart-logo.svg'
import { cartContext } from '../../../Context/cartContext';

export default function Navbar() {
  let navLogin = useNavigate();
  let navCart = useNavigate();
  let navPro = useNavigate();
  let {userToken , setToken} = useContext(UserContext);
  let {numOfCartItems} = useContext(cartContext);


  useEffect(() => {
    if ( userToken != null ){
      jwtDecode(userToken);
    }
  } , [userToken] );


//// Function navigate to Profle component /////
  function navProfile () {
    navPro('/profile')
  }
//// Function navigate to Cart component /////
  function navigateToCart () {
    navCart('/cart')
  }
//// Function to Log Out /////
  function logOut () {
    localStorage.removeItem('userToken')
    setToken(null)
    navLogin('/login')
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid container">
          {/* /////// Fresh Cart logo /////// */}
          <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link>
          {/* /////// toggler button /////// */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* /////// Navbar Content /////// */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken ?  <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {/* /////// Navbar list components /////// */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="cart">Cart</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="wishlist">Wish List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="brands">Brands</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="allorders">All Orders</NavLink>
              </li>
            </ul>  : ''}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* /////// Navbar list icons /////// */}
              <li className='nav-item d-flex align-items-center'>
                <i style={{color : '#1877F2'}} className='fa-brands fa-facebook mx-2'></i>
                <i style={{color : '#00acee'}} className='fa-brands fa-twitter mx-2'></i>
                <i style={{color : '#c13584'}} className='fa-brands fa-instagram mx-2'></i>
                <i style={{color : '#FF0000'}} className='fa-brands fa-youtube mx-2'></i>
                <i style={{color : '#cc0000'}} className='fa-brands fa-pinterest mx-2'></i>
              </li>
              {userToken != null ? <li className='nav-item d-flex justify-content-between'>
                {/* /////// Navbar cart icon /////// */}
                <div className='position-relative d-flex align-items-center'>
                  <button onClick={navigateToCart} className='btn p-0'>
                  <i className='fa-solid fa-xl fa-cart-shopping text-main p-2'></i>
                  <span className='cart-num position-absolute end-0 translate-middle-y'>{numOfCartItems}</span>
                  </button>
                </div>
                {/* /////// Navbar Profile button /////// */}
                <span className='nav-link cursor-pointer' onClick={navProfile}><i className="text-primary fa-xl fa-solid fa-user"></i></span>
                {/* /////// Navbar Logout button /////// */}
                <span className='nav-link cursor-pointer' onClick={logOut}>Log Out</span>
              </li>  : <>
              {/* /////// Navbar Login button /////// */}
              <li className='nav-item'>
                <NavLink className='text-main nav-link' to='login'>Login</NavLink>
              </li>
                {/* /////// Navbar Register button /////// */}
              <li className='nav-item'>
                <NavLink className='nav-link' to='register'>Register</NavLink>
              </li>
              </> }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
