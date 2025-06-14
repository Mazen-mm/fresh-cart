import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Register() {
let navg = useNavigate();
let [errMsg,setErr] = useState('')
let [loading,setLoading] = useState(true)
////// ValidationSchema Yup to handle regEX ///////
let validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is Required').min(3, 'Min Words 3').max(20, 'Max Words 20'),
  email: Yup.string().required('Email is Required').email('Enter Valid Email'),
  password: Yup.string().required('Password is Required')
  .matches(/^[a-zA-Z!@#$%^*_0-9]{6,16}$/,'Enter Valid Pasword'),
  rePassword: Yup.string().required('rePassword is Required')
  .oneOf([Yup.ref('password')],'rePassword Not Matches'),
  phone: Yup.string().required('phone is Required')
  .matches(/^01[1250][0-9]{8}$/,'Enter Valid Phone'),
})
////// UseFormik to handle the form ///////
  let formik = useFormik({
    initialValues : {
      name:'',
      email : '',
      password : '',
      rePassword : '',
      phone : ''
    },
    onSubmit : RegisterApi,
    validationSchema 
  })
///// Function to Register and SignUp Account //////
  async function RegisterApi (value){
    setLoading(false)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',value)
    .catch( function (errorr){
    setErr(errorr.response.data.message)
    setLoading(true)
  })
  ////// if user registered Successfully ? Navigate To Login Component ///////
  if (req?.data.message === 'success') {
    setLoading(true)
    navg('/login')
  }
  console.log(req);
  }
///// Function to navigate to Login Component /////
  let handleLogIn = () => {
    navg('/login');
  };

  return <>
  <HelmetProvider>
  <div className='my-5 w-50 m-auto'>
    {/* /////// Helmet contains informations about Component /////// */}
    <Helmet>
      <title>Fresh Cart Register</title>
    </Helmet>
    <h1 className='text-center'>Register Now ....</h1>
    {/* ///// Display The error messages ///// */}
    {errMsg !== '' ? <div className='alert alert-danger'>{errMsg}</div> : ''}
    {/* ///// Formik to handle The Form ///// */}
    <form action="" onSubmit={formik.handleSubmit}>
      {/* ////// enter name /////// */}
      <div className='my-2'>
        <label htmlFor="name">Name : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' type="text" 
        name='name' id='name' />
      
      {(formik.errors.name && formik.touched.name) ? <div className='alert alert-danger'>{formik.errors.name}</div> : '' }
      </div>
      {/* ////// enter email /////// */}
      <div className='my-2'>
        <label htmlFor="email">Email : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' type="email"
        name='email' id='email'/>
        {(formik.errors.email && formik.touched.email) ? <div className='alert alert-danger'>{formik.errors.email}</div> : '' }
      </div>
      {/* ////// enter Password /////// */}
      <div className='my-2'>
        <label htmlFor="password">Password : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' 
        type="password" name='password'  id='password' />
        {(formik.errors.password && formik.touched.password) ? <div className='alert alert-danger'>{formik.errors.password}</div> : '' }
      </div>
      {/* ////// enter rePassword /////// */}
      <div className='my-2'>
        <label htmlFor="rePassword">rePassword : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' 
        type="password" name='rePassword' id='rePassword' />
        {(formik.errors.rePassword && formik.touched.rePassword) ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : '' }
      </div>
      {/* ////// enter Phone /////// */}
      <div className='my-2'>
        <label htmlFor="phone">Phone : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' type="tel" name='phone' id='phone'/>
        {(formik.errors.phone && formik.touched.phone) ? <div className='alert alert-danger'>{formik.errors.phone}</div> : '' }
      </div>
      {/* //// Loading until checks out the login process successfully /// */}
      {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' 
      onClick={formik.handleSubmit} className='btn bg-main text-white'>Register</button> : <button type='button' className='btn text-white bg-success'>
      <i className='fa-solid fa-circle-notch fa-spin'></i></button>}
      {/* ///// button to navigate to Login Component if user have Already Account ///// */}
      <p>If Tou Have Already Account..?<button type='button' className='btn' onClick={handleLogIn}>
        Log In Now. ?</button>
      </p>
    </form>
  </div>
  </HelmetProvider>
</>
}
