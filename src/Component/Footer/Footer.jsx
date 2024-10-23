import { useFormik } from 'formik'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import * as Yup from 'yup'
import amazonImg from '../../assets/images/Amazon_Pay_logo.png'
import masterImg from '../../assets/images/MasterCard-Logo.png'
import payPalImg from '../../assets/images/PayPal.png'
import appStoreImg from '../../assets/images/App_Store.png'
import googlePlayImg from '../../assets/images/get-it-on-google-play.png'

export default function Footer() {

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is Required').email('Enter Valid Email'),
  });

  let formik = useFormik({
    initialValues : {
      email : '',
    },
    validationSchema 
  });

  return <>
  <HelmetProvider>
    <div className="mt-5 bg-main-light">
      <div className="container pt-5 pb-3">
        <h3>Get the FreshCart app</h3>
        <p>We will send you a link, open it on your phone to download the app</p>
        <div className="row pb-3 border-bottom">
          <div className="col-md-10">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Email..."
              className='form-control mb-3' type="email" name='email' id='email'/>
          </div>
          <div className="col-md-2 p-0">
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' 
            onClick={formik.handleSubmit} className='btn bg-main text-white w-100'>Share App Link</button>
          </div>
        </div>
        <div className="row border-bottom pb-2 my-4 d-flex justify-content-between">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-4"><h6>Payment Partners</h6></div>
              <div className="col-md-2"><img className='w-100' src={amazonImg} alt="" /></div>
              <div className="col-md-2"><img className='w-100' src={masterImg} alt="" /></div>
              <div className="col-md-2"><img className='w-100' src={payPalImg} alt="" /></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row p-0">
              <div className="col-md-6 d-flex align-items-center pe-0">
                <h6>Get deliveries with FreshCart</h6>
              </div>
              <div className="col-md-3 p-0">
                <img className='w-100' src={googlePlayImg} alt="" />
              </div>
              <div className="col-md-3 mb-1">
                <img className='w-100' src={appStoreImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </HelmetProvider>
  </>
}
