import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { cartContext } from '../../Context/cartContext'

export default function Cart() {
  let {getLoggedUserCart , removeCartItem , updateProductQuantity} = useContext(cartContext);
  let [cartDetails , setCartDetails] = useState(null);
  async function getCart () {
    let {data} = await getLoggedUserCart();
    setCartDetails(data);
  }
  async function removeItem (id) {
    let {data} = await removeCartItem(id);
    setCartDetails(data);
  }
  async function updateCount (id , count) {
    let {data} = await updateProductQuantity(id , count);
    setCartDetails(data);
  }
  useEffect( () => {
    getCart();
  } , [])
  
  return <>
    <div>
      <Helmet>
        <title>Fresh Cart</title>
      </Helmet>
      {cartDetails? <div className="w-75 mx-auto my-3 p-3 bg-main-light">
        <h3 className='text-center'>Shop Cart :</h3>
        <h6 className='text-center text-main'>Cart Items : {cartDetails.numOfCartItems}</h6>
        {cartDetails.data.products.map( (product) => 
        <div key={product.product.id} className="row border-bottom py-2 px-2">
          <div className="col-md-1"><img className='w-100 ' src={product.product.imageCover} alt="" />
          </div>
          <div className="col-md-11">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>{product.product.title.split(' ').slice(0,3).join(' ')}</h6>
                <h6 className='text-main'>Price : {product.price} EGP</h6>
              </div>
              <div>
                <button onClick={()=> updateCount(product.product.id , product.count + 1)} className='btn btn-success brd-main p-2'>+</button>
                <span className='mx-2'>{product.count}</span>
                <button onClick={()=> updateCount(product.product.id , product.count - 1)} className='btn btn-danger brd-main p-2'>-</button>
              </div>
            </div>
            <button onClick={()=> removeItem(product.product.id)} className='btn'><i className='text-danger fas fa-trash-can'></i> Remove</button>
          </div>
        </div>
        )}
        <div>
          <div className="row">
            <div className="col-md-6">
              <h6 className='my-3 text-main'>Total Price : {cartDetails.data.totalCartPrice} EGP</h6>
              <button className='btn btn-success'>Check Out Payment ?</button>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-end">
              <button className='btn btn-danger'>Clear Cart</button>
            </div>
          </div>
        </div>
      </div> : 
      <div className='loading bg-white position-fixed d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0'>
          <span className="loader"></span>
      </div>}
    </div>
  </>
}
