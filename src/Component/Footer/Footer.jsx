import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'

export default function Footer() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : false ,
    autoplaySpeed : 2000 ,
    autoplay : true
  };


  return <>
  <HelmetProvider>
    <Helmet>
      <title>Fresh Cart Footer</title>
    </Helmet>
    <div className="container text-center">
      {/* <Slider {...settings}>
      <div>
        <img className='w-100' src={img1} height={400} alt="" />
      </div>
      <div>
        <img className='w-100' src={img2} height={400} alt="" />
      </div>
      <div>
        <img className='w-100' src={img3} height={400} alt="" />
      </div>
    </Slider> */}
    </div>
  </HelmetProvider>
  
  
  </>
}
