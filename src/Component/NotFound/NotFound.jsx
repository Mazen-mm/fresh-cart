import React from 'react'
import notFound from '../../assets/error404.svg'

export default function NotFound() {
  return (
    <div className='my-5 w-50 m-auto'>
      <h1 className='text-center'>Not Found</h1>
      <img className='w-100' src={notFound} alt="" />
    </div>
  )
}
