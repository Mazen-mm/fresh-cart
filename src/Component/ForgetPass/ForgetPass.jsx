
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function ForgetPass () {
let navReset = useNavigate()
let [errMsg,setErr] = useState('')
let [formStatus , setFormStatus] = useState(true)

let validationSchema = Yup.object({
  email: Yup.string().required('Email is Required').email('Enter Valid Email'),
})
let validationSchema2 = Yup.object({
  resetCode: Yup.string().required('Reset Code is Required').matches(/^[0-9]{5,6}$/ , 'Enter Valid Code')
})

  let formik = useFormik({
    initialValues : {
      email : '',
    },
    onSubmit : ForgetPassApi,
    validationSchema 
  })

  let formik2 = useFormik({
    initialValues : {
      resetCode : ''
    },
    onSubmit : verifyResetCode,
    validationSchema : validationSchema2
  })

  async function ForgetPassApi (value){
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',value)
    .catch( (errorr) => {
    setErr(errorr.response.data.message)
  })
  if (req.data.statusMsg === 'success') {
    setFormStatus(false)
  }
}

  async function verifyResetCode (value) {
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value)
    .catch(  (errorr) => {
      setErr(errorr.response.data.message)
    })
    if(req.data.status === 'Success' ){
      navReset('/resetPass')
    }
  }

  return <>
  <div className='my-5 w-50 m-auto'>
    <HelmetProvider>
    <Helmet>
      <title>Forget Password</title>
    </Helmet>
    <h1 className='text-center'>Login Now ....</h1>
    {errMsg !== '' ? <div className='alert alert-danger'>{errMsg}</div> : ''}

    {formStatus ? <form onSubmit={formik.handleSubmit}>
      <div className='my-2'>
        <label htmlFor="email">Enter Your Email</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' type="email"
        name='email' id='email'/>
        <button type='submit' className='btn bg-main text-white'>Send</button>
      </div>
    </form>  :  

    <form onSubmit={formik2.handleSubmit}>
      <div className='my-2'>
        <label htmlFor="resetCode">Enter Reset Code</label>
        <input 
        // value={formik2.values.resetCode}
        onBlur={formik2.handleBlur} onChange={formik2.handleChange} className='form-control mb-3' type="resetCode"
        name='resetCode' id='resetCode'/>
        {formik2.errors.resetCode && formik2.touched.resetCode ?<div className='alert alert-danger'>{formik2.errors.resetCode}</div>:''}
        <button type='submit' className='btn bg-main text-white'>Confirm Code</button>
      </div>
    </form>
    }
    </HelmetProvider>
  </div>
  </>
}
