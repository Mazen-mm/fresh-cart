import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function Categories() {
  return <>
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Fresh Cart Categories</title>
        </Helmet>
        <h1>Categories</h1>
      </HelmetProvider>
    </div>
    </>
}
