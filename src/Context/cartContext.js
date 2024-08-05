import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();


export function CartContextProvider (props) {
  let [numCart , setNumCart] = useState(0);
  let head = {
    token:localStorage.getItem('userToken')
  };
  function addToCart (id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {
    productId : id
  } , { headers : head }
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

  return <cartContext.Provider value={{addToCart , numCart , setNumCart , getLoggedUserCart , removeCartItem , updateProductQuantity}}>
    {props.children}
  </cartContext.Provider>
}