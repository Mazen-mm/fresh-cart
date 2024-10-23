import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
import Swal from 'sweetalert2';

export default function HomeProduct () {
  let {addToCart , setNumOfCartItems , addToWish , setNumOfWishItems} = useContext(cartContext);
////// Function to add product to wish list //////
  async function addProductToWish (id) {
    let req = await addToWish(id).catch( (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    })
    if(req?.data?.status === 'success') {
      setNumOfWishItems(req.data.numOfWishItems)
      Swal.fire({
        title: "Good job!",
        text: "Product added successfully to your wish list",
        icon: "success"
      });
    }
  };
////// Function to add product to cart //////
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

  let [page , setPage] = useState(1)
  // Function to update the page number
  function getPageNumber(event) {
    let selectedPage = event.target.getAttribute('pagenum');
    setPage(selectedPage);
  }
////// Function to get Products //////
  function getProducts (queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Products/?page=${queryData.queryKey[1]}`)
  }
  let { isLoading , data } = useQuery(['productsApi' , page] , getProducts , {
    // cacheTime : 3000 ,
    // refetchOnMount : false ,
    // staleTime : 3000 ,
    // refetchInterval : 5000 ,
    // enabled : false 
  })

  return <>
  {/* ///// Loading until display products ///// */}
  {isLoading ? <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
      <span className="loader"></span>
    </div> :
    <div className='container my-5 m-auto'>
      <h2 className='text-center text-main mb-5'>All Products</h2>
      {/* ////// All Products ////// */}
      <div className='row d-flex justify-content-between g-0'>
        {data?.data.data.map( (element) => {
          return <div key={element.id} className='col-md-2 m-1'>
            <div className="product position-relative p-1">
              {/* ///// Link to navigate to product details component ///// */}
              <Link to={`/productdetails/${element.id}`}>
                <img className='w-100' src={element.imageCover} alt="" />
                <h6 className='text-main mt-2'>{element.category.name}</h6>
                <h6>{element.title.split(' ').slice(0,2).join(' ')}</h6>
                <div className='d-flex justify-content-between'>
                  <span>{element.price}EGP</span>
                  <span>{element.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></span>
                </div>
              </Link>
              {/* ////// button add to wish list ////// */}
              <i onClick={()=> addProductToWish(element.id)}
              className='fa-regular fa-heart fa-2x position-absolute text-danger top-0 end-0 m-2'></i>
              {/* ////// button add to cart ////// */}
              <button onClick={()=> addProductToCart(element.id)} className='btn bg-main text-white w-100'>Add Product</button>
            </div>
          </div>
          }
        )}
      </div>
      {/* ////// All Products ////// */}
        {/* Pagination: Assuming you have multiple pages */}
        <div className="pagination-controls text-center my-5">
          <button className='btn btn-secondary' onClick={getPageNumber} pagenum={page - 1} disabled={page <= 1}>
            Previous
          </button>
          <span className='mx-2'>Page {page}</span>
          <button className='btn btn-secondary' onClick={getPageNumber} pagenum={Number(page) + 1}>
            Next
          </button>
        </div>
        {/* Pagination: Assuming you have multiple pages */}
    </div>
  }
  </>
}
