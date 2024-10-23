import React, { useContext, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { cartContext } from '../../Context/cartContext'
import { NavLink } from 'react-router-dom';

export default function Cart() {
  let [cartDetails , setCartDetails] = useState();
  let {getLoggedUserCart , removeCartItem , updateProductQuantity , setNumOfCartItems} = useContext(cartContext);

  useEffect( () => {
    getUserCart();
  } , []);
///// Function to get user cart items //////
  async function getUserCart () {
    let {data} = await getLoggedUserCart().catch( (err)=> {console.log(err);})
    if(data?.status === 'success'){
      setCartDetails(data);
    }
  }
///// Function to remove cart item //////
  async function removeItem (id) {
    let {data} = await removeCartItem(id);
    if(data?.status === 'success'){
      setCartDetails(data);
      setNumOfCartItems(data.numOfCartItems);
      updateProductQuantity(data?.setNumOfCartItems);
    }
  }
///// Function to update count cart //////
  async function updateCount (id , count) {
    let {data} = await updateProductQuantity(id , count);
    setCartDetails(data);
  }

  return <>
    <div>
    <HelmetProvider>
      {/* /////// Helmet contains informations about Component /////// */}
      <Helmet>
        <title>Fresh Cart</title>
      </Helmet>
      <div className="text-center text-main mt-5"><h1>Cart Details</h1></div>
      {cartDetails? <div className="w-75 mx-auto my-3 p-3 bg-main-light">
        {/* /////// Cart Details /////// */}
        <h6 className='text-center text-main'>Cart Items : {cartDetails.numOfCartItems}</h6>
        {/* /////// Cart items /////// */}
        {cartDetails.data.products.map( (el) => 
        <div key={el._id} className="row border-bottom align-items-center py-2 px-2">
          {/* /////// Cart items imgs /////// */}
          <div className="col-md-2"><img className='w-100 ' src={el.product.imageCover} alt="" /></div>
          {/* /////// Cart items details /////// */}
          <div className="col-md-10">
            <div className="d-flex justify-content-between">
              <div>
                <h6>{el.product.title.split(' ').slice(0,3).join(' ')}</h6>
                <h6 className='text-muted'>Price : {el.price} EGP</h6>
              </div>
              {/* /////// buttons to update the count of items /////// */}
              <div>
                <button onClick={()=> updateCount(el.product.id , el.count + 1)} 
                className='btn btn-success btn-sm p-2'><i className='fa-solid fa-plus'></i></button>
                <span className='mx-2'>{el.count}</span>
                <button onClick={()=> updateCount(el.product.id , el.count - 1)}
                className='btn btn-danger btn-sm p-2'><i className='fa-solid fa-minus'></i></button>
              </div>
            </div>
            {/* /////// button to remove cart item //////// */}
            <button onClick={()=> removeItem(el.product._id)} className='btn'>
              <i className='text-danger fas fa-trash-can'></i> Remove</button>
          </div>
        </div>
        )}
        <div>
          <div className="row">
            <h6 className='my-3 text-main'>Total Price : {cartDetails.data.totalCartPrice} EGP</h6>
            {/* ///// Button to navigate to Checkout Component ////// */}
            <NavLink to={'/checkout/'+cartDetails.data._id} className='btn w-25 btn-success'>Check Out Payment ?</NavLink>
          </div>
        </div>
      </div> : 
      ///// Loading /////
      <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
          <span className="loader"></span>
      </div>
      }
    </HelmetProvider>
    </div>
  </>
}
