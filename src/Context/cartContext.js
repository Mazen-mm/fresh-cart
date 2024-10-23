import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider (props) {
  let [numOfCartItems , setNumOfCartItems] = useState();
  let head = { token:localStorage.getItem('userToken') };

  ///////// Wish State ///////////
  let [numOfWishItems , setNumOfWishItems] = useState();
  ///////// Wish State ///////////


///////// Cart Functions /////////
////                        ////
  ///// Function Add To Cart /////
  function addToCart (id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {productId : id} , { headers : head }
    ).then( (response) => response );
  }
  ///// Function Get UserData Cart /////
  function getLoggedUserCart () {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
      headers : head
    }).then( (response) => response ).catch( (error) => error);
  }
  ///// Function remove item from Cart /////
  function removeCartItem (productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {headers : head}
    ).then( (response) => response ).catch( (error) => error);
  }
  ///// Function Update Cart Item Count /////
  function updateProductQuantity (productId , count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
    {count:count} , {headers : head}
    ).then( (response) => response ).catch( (error) => error);
  }
  ///// Function Clear Cart /////
  function clearAllCart () {
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart' , { headers : head } )
  }
  ///// Function go to CheckOut Payment link /////
  function checkOutPayment (id , data) {
    let options = {
      headers : {
        token : localStorage.getItem('userToken')
      }
    }
    let body = { shippingAddress : data };
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000` , body , options)
  }
///////// Cart Functions /////////




///////// Wish list Functions /////////
////                        ////
  ///// Function Add To Wish list /////
  function addToWish (id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {productId : id} , { headers : head }
    ).then( (response) => response ).catch( (error) => error);
  }
  ///// Function get user data Wish list /////
  function getLoggedUserWish () {
    return axios.get('https://ecommerce.routemisr.com/api/v1/Wishlist' , { 
      headers : head 
    }).then( (response) => response ).catch( (error) => error);
  }
  ///// Function remove item from Wish list /////
  function removeWishItem (productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/Wishlist/${productId}` , {headers : head}
    ).then( (response) => response ).catch((error) => error);
  }
///////// Wish list Functions /////////




////////// All Orders Function //////////
function getUserOrders() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/orders' , {
    headers: head
  }).then( (response) => response).catch((error) => error);
}
////////// All Orders Function //////////



  return <cartContext.Provider value={{ addToCart , numOfCartItems , setNumOfCartItems , getLoggedUserCart ,
  removeCartItem , clearAllCart , updateProductQuantity , checkOutPayment ,
  //////// Wish list and All Orders Context /////////
  addToWish , numOfWishItems , setNumOfWishItems , getLoggedUserWish , removeWishItem , getUserOrders}}>
    {props.children}
  </cartContext.Provider>
}