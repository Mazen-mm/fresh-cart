import axios from 'axios';
import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';


export default function Categories() {
  function getAllCategories () {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { data } = useQuery('categoriesApi', getAllCategories)
  return <>
  <HelmetProvider>
    <Helmet>
      <title>Fresh Cart Categories</title>
    </Helmet>
    <div className="container">
      <h1 className='my-5 text-main text-center'>All Categories</h1>
      <div className="row my-5 g-4 card-group">
        {data?.data?.data.map( (element) => {
          return <div key={element._id} className='col-md-4'>
            <div className="card product position-relative">
              <Link to={`/subcategory/${element._id}`}>
                <img className='w-100' src={element.image} alt="" style={{height : '300px' , objectFit : 'cover' }} />
                <div className="card-footer">
                  <h4 className='text-main text-center fw-bolder mt-2'>{element.name}</h4>
                </div>
              </Link>
            </div>
          </div>
          }
        )}
      </div>
    </div>
  </HelmetProvider>
  </>
}
