import { Helmet, HelmetProvider } from 'react-helmet-async';

import React from 'react'

export default function Brands() {


  return <>
  <HelmetProvider>
    <Helmet>
      <title>Fresh Cart Brands</title>
    </Helmet>
    <h1>Brands</h1>
    <div className='container'>
        <div className='row'>
        </div>
    </div>
  </HelmetProvider> 
  </>
}
