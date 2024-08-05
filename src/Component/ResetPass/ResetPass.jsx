import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPass() {
  let nav = useNavigate()

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is Required').email('Enter Valid Email'),
    newPassword: Yup.string().required('newPassword is Required')
    .matches(/^[a-zA-Z!@#$%^*_0-9]{6,16}$/,'Enter Valid newPasword'),
  })
  let form = useFormik({
    initialValues : {
      email : "",
      newPassword : ""
    }, 
    onSubmit : ResetPasswordApi,
    validationSchema
  })


  async function ResetPasswordApi(value) {
    let req = await axios.put( 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , value)
    if(req.data.token){
      nav('/login')
    }
    console.log(req);
  }

  return (
    <div className='my-5 w-50 m-auto'>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <h1>Reset Password</h1>
      <form action="" onSubmit={form.handleSubmit}>
        <div className='my-2'>
          <label htmlFor="email">Email : </label>
          <input onBlur={form.handleBlur} onChange={form.handleChange} className='form-control mb-3' type="email"
          name='email' id='email'/>
          {(form.errors.email && form.touched.email) ? <div className='alert alert-danger'>{form.errors.email}</div> : '' }
        </div>

        <div className='my-2'>
          <label htmlFor="newPassword">New Password : </label>
          <input onBlur={form.handleBlur} onChange={form.handleChange} className='form-control mb-3' 
          type="password" name='newPassword'  id='newPassword' />
          {(form.errors.newPassword && form.touched.newPassword) ? <div className='alert alert-danger'>{form.errors.newPassword}</div> : '' }
        </div>

        <button disabled={!(form.isValid && form.dirty)} type='submit' 
        onClick={form.handleSubmit} className='btn bg-main text-white'>Update Password</button>
      </form>
    </div>
  )
}
