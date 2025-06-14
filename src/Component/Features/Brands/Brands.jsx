import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Brands() {
  let [page , setPage] = useState(1)
  // Function to update the page number
  function getPageNumber(event) {
    let selectedPage = event.target.getAttribute('pagenum');
    setPage(selectedPage);
  }
  /////// Function to get all Brands ////////
  function getAllBrands (queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/?page=${queryData.queryKey[1]}`)
  }
  let { data } = useQuery(['brandsApi' , page], getAllBrands);
  
  return <>
  <HelmetProvider>
    {/* /////// Helmet contains informations about Component /////// */}
    <Helmet>
      <title>Fresh Cart Brands</title>
    </Helmet>
    <div>
    <h1 className='text-main text-center my-5'>All Brands</h1>
      <div className='row my-5 g-3'>
        {/* ////// All Brands /////// */}
        {data?.data?.data.map( (element) => {
          return <div key={element._id} className='col-md-3'>
            <div className="card product position-relative">
              {/* /////// Link to specific Brand //////// */}
              <Link to={`/spebrand/${element._id}`}>
                <img className='w-100' src={element.image} alt=""/>
                <h4 className='text-center fw-bolder my-4'>{element.name}</h4>
              </Link>
            </div>
          </div>
          }
        )}
      </div>
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
    </div>
  </HelmetProvider> 
  </>
}
