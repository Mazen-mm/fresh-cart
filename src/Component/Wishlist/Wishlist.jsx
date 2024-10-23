import React, { useContext, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { cartContext } from '../../Context/cartContext';
import Swal from 'sweetalert2';

export default function Wishlist() {
  let [wishDetails , setWishDetails] = useState(null);
  let {addToCart , setNumOfCartItems , getLoggedUserWish , removeWishItem} = useContext(cartContext);

  useEffect( () => {
    getUserWishlist();
  } , []);
///// Function to get user wish list //////
  async function getUserWishlist () {
    let {data} = await getLoggedUserWish().catch( (err)=> {console.log(err);})
    if(data?.status === 'success'){
      setWishDetails(data);
    }
  }
///// Function to remove Wish item //////
  async function removeWish (id) {
    let {data} = await removeWishItem(id);
    if(data?.status === 'success'){
      getUserWishlist();
    }
  }
///// Function to add product to cart //////
  async function addProductToCart (id) {
    let req = await addToCart(id).catch( (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    })
////// Sweetalert library if product added to cart successfully ? set the number of cart items //////
    if(req?.data?.status === 'success') {
      setNumOfCartItems(req.data.numOfCartItems)
      Swal.fire({
        title: "Good job!",
        text: "Product added successfully to your cart",
        icon: "success"
      });
    }
  };

  return <>
  <div>
    <HelmetProvider>
      {/* /////// Helmet contains informations about Component /////// */}
      <Helmet>
        <title>Fresh Cart Wish List</title>
      </Helmet>
      <div className="text-center text-main mt-5"><h1>Wish List</h1></div>
      {wishDetails? <div className="w-75 mx-auto my-3 p-3 bg-main-light">
        {/* /////// Wish list Details /////// */}
        <h5 className='text-center'>Favourite Items : {wishDetails.count}</h5>
        {/* /////// Wish list items /////// */}
        {wishDetails?.data?.map( (el) => 
        <div key={el._id} className="row border-bottom align-items-center py-2 px-2">
          {/* /////// Wish list items imgs /////// */}
          <div className="col-md-2"><img className='w-100 ' src={el.imageCover} alt="" /></div>
          {/* /////// Wish list items details /////// */}
          <div className="col-md-10">
            <div className="d-flex justify-content-between">
              <div className='col-md-9'>
                <h6>{el.title}</h6>
                <h6 className='text-muted'>Price : {el.price} EGP</h6>
              </div>
              {/* /////// button to add product to cart //////// */}
              <div className='col-md-2'>
                <button onClick={()=> addProductToCart(el.id)} className='btn bg-main text-white btn-sm p-2'>Add To Cart</button>
              </div>
            </div>
            {/* /////// button to remove wish list item //////// */}
            <button onClick={()=> removeWish(el?._id)} className='btn'>
              <i className='text-danger fas fa-trash-can'></i> Remove</button>
          </div>
        </div>
        )}
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
