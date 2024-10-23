import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();
export function CartContextProvider (props) {
  let [numOfCartItems , setNumOfCartItems] = useState();

  ///////// Wish State ///////////
  let [numOfWishItems , setNumOfWishItems] = useState();
  ///////// Wish State ///////////

  let head = { token:localStorage.getItem('userToken') };

  function addToCart (id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {productId : id} , { headers : head }
    ).then( (response) => response );
  }
  function getLoggedUserCart () {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
      headers : head
    }).then( (response) => response ).catch( (error) => error);
  }
  function removeCartItem (productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {headers : head}
    ).then( (response) => response ).catch( (error) => error);
  }
  function updateProductQuantity (productId , count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
    {count:count} , {headers : head}
    ).then( (response) => response ).catch( (error) => error);
  }
  function clearAllCart () {
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart' , { headers : head } )
  }
  function checkOutPayment (id , data) {
    let options = {
      headers : {
        token : localStorage.getItem('userToken')
      }
    }
    let body = { shippingAddress : data };
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000` , body , options)
  }

  ///////// Wish Functions /////////
  function addToWish (id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {productId : id} , { headers : head }
    ).then( (response) => response ).catch( (error) => error);
  }
  function getLoggedUserWish () {
    return axios.get('https://ecommerce.routemisr.com/api/v1/Wishlist' , { 
      headers : head 
    }).then( (response) => response ).catch( (error) => error);
  }
  function removeWishItem (productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/Wishlist/${productId}` , {headers : head}
    ).then( (response) => response ).catch((error) => error);
  }

////////// Orders Function //////////
function getUserOrders() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/orders' , {
    headers: head
  }).then( (response) => response).catch((error) => error);
}

  return <cartContext.Provider value={{ addToCart , numOfCartItems , setNumOfCartItems , getLoggedUserCart ,
  removeCartItem , clearAllCart , updateProductQuantity , checkOutPayment ,
  //////// Wish /////////
  addToWish , numOfWishItems , setNumOfWishItems , getLoggedUserWish , removeWishItem , getUserOrders}}>
    {props.children}
  </cartContext.Provider>
}