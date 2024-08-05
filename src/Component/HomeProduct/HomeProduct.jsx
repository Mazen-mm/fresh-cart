import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
import Swal from 'sweetalert2';

export default function HomeProduct () {

  let {addToCart , setNumCart} = useContext(cartContext);
  async function addProductToCart (id) {
    let req = await addToCart(id).catch( (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    })
    if(req.data.status === 'success') {
      setNumCart(req.data.numOfCartItems)
      Swal.fire({
        title: "Good job!",
        text: "Product added successfully to your cart",
        icon: "success"
      });
    }
    console.log(req);
  }

  let [page , setPage] = useState(1)
  function getPageNumber (event){
    let page = event.target.getAttribute('pagenum')
    setPage(page)
  }

  function getProducts (queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Products/?page=${queryData.queryKey[1]}`)
  }
  let { isLoading , isError , isFetching , data } = useQuery(['productsApi' , page] , getProducts , {
    // cacheTime : 3000 ,
    // refetchOnMount : false ,
    // staleTime : 3000 ,
    // refetchInterval : 5000 ,
    // enabled : false 
  })

  return <>
  {isLoading ? <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
      <span className="loader"></span>
    </div> :
    <div className='container my-5 m-auto'>
    <h2 className='text-center mb-3'>All Products</h2>
    <div className='row g-5'>
      {data?.data.data.map( (element) => {
        return   <div key={element.id} className='col-md-2 product'>
          <Link to={`/productdetails/${element.id}`}>
              <img className='w-100' src={element.imageCover} alt="" />
              <h6 className='text-main'>{element.category.name}</h6>
              <h5>{element.title.split(' ').slice(0,2).join(' ')}</h5>
              <div className='d-flex justify-content-between'>
                <span>{element.price}EGP</span>
                <span>{element.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></span>
              </div>
          </Link>
          <button onClick={()=> addProductToCart(element.id)} className='btn bg-main text-white d-block w-100'>Add Product</button>
        </div>
      }
      )}
    </div>
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center my-5">
        <li className="page-item">
          <a className="page-link" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
        </li>
        <li className="page-item cursor-pointer"><a className="page-link" pagenum='1' onClick={getPageNumber} >1</a></li>
        <li className="page-item cursor-pointer"><a className="page-link" pagenum='2' onClick={getPageNumber} >2</a></li>
        <li className="page-item">
          <a className="page-link" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
        </li>
      </ul>
    </nav>
  </div>
  }
  </>
}
