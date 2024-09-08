import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { cartContext } from '../../Context/cartContext';

export default function Login () {
let {setToken , setUserData} = useContext(UserContext);
let {setNumOfCartItems , getLoggedUserCart} = useContext(cartContext);
let navg = useNavigate()
let navForget = useNavigate()
let [errMsg,setErr] = useState('')
let [loading,setLoading] = useState(true)

let validationSchema = Yup.object({
  email: Yup.string().required('Email is Required').email('Enter Valid Email'),
  password: Yup.string().required('Password is Required')
  .matches(/^[a-zA-Z!@#$%^*_0-9]{6,16}$/,'Enter Valid Pasword'),
})

  let formik = useFormik({
    initialValues : {
      email : '',
      password : '',
    },
    onSubmit : loginUser,
    validationSchema 
  })

  async function loginUser (value){
    setLoading(false)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',value)
    .catch( function (errorr){
    setErr(errorr.response.data.message)
    setLoading(true)
  })
  if (req?.data?.message === 'success') {
    setLoading(true)
    localStorage.setItem('userToken' , req.data.token )
    setToken(req?.data?.token);
    setUserData(req?.data?.user)
    getCartData();
    navg('/')
  }
}
async function getCartData () {
  let req = await getLoggedUserCart().catch((err)=>{console.log(err)});
  if(req?.data?.status === 'success'){
    setNumOfCartItems(req.data.numOfCartItems);
  }
}
let handleForgetPassword = () => {
  navForget('/forgetPass');
};

  return <>
  <div className='my-5 w-50 m-auto'>
    <HelmetProvider>
    <Helmet>
      <title>Fresh Cart Login</title>
    </Helmet>
    <h1 className='text-center'>Login Now ....</h1>
    {errMsg !== '' ? <div className='alert alert-danger'>{errMsg}</div> : ''}
    <form action="" onSubmit={formik.handleSubmit}>
      <div className='my-2'>
        <label htmlFor="email">Email : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' type="email"
        name='email' id='email'/>
        {(formik.errors.email && formik.touched.email) ? <div className='alert alert-danger'>{formik.errors.email}</div> : '' }
      </div>
      <div className='my-2'>
        <label htmlFor="password">Password : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' 
        type="password" name='password'  id='password' />
        {(formik.errors.password && formik.touched.password) ? <div className='alert alert-danger'>{formik.errors.password}</div> : '' }
      </div>
      {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' 
      onClick={formik.handleSubmit} className='btn bg-main text-white'>Login</button> : <button type='button' className='btn text-white bg-success'>
      <i className='fa-solid fa-circle-notch fa-spin'></i></button>}
      <button type='button' className='btn' onClick={handleForgetPassword}>Forget Password .... ?</button>
    </form>
    </HelmetProvider>
  </div>
  </>
}
