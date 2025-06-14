import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../../../../assets/images/slider-image-1.jpeg'
import img2 from '../../../../assets/images/slider-image-2.jpeg'
import img3 from '../../../../assets/images/slider-image-3.jpeg'

export default function HomeSlider() {
  let [categoryList , setCategory] = useState([]);

  useEffect(() => {
    getCategories()
  } , []);
////// Function to get All Categories //////
  async function getCategories () {
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategory(data.data)
  }
////// First Slider (3 images) //////
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : false ,
    autoplaySpeed : 2000 ,
    autoplay : true
  };
////// Second Slider (Api images) //////
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1 ,
    arrows : false ,
    autoplaySpeed : 2000 ,
    autoplay : true ,
  };


  return <>
  {/* //// First Slider //// */}
  <div className="first-slider mt-4">
    <div className="row g-0">
      {/* ////// First React Sliders Auto play /////// */}
      <div className="col-md-9">
        <Slider {...settings}>
          <div><img className='w-100' src={img1} height={400} alt="" /></div>
          <div><img className='w-100' src={img2} height={400} alt="" /></div>
          <div><img className='w-100' src={img3} height={400} alt="" /></div>
        </Slider>
      </div>
      {/* ///// Fixed imgs in react Slider ///// */}
      <div className="col-md-3">
        <img className='w-100' src={img1} height={200} alt="" />
        <img className='w-100' src={img2} height={200} alt="" />
      </div>
    </div>
  </div>
  {/* //// First Slider //// */}

  {/* //// Second Slider //// */}
  <div className="second-slider mt-4">
    <h3 className='mb-3'>Shop Popular Categories</h3>
    {/* ////// Second React Sliders Auto play from Api /////// */}
    <Slider {...settings2}>
      {categoryList.map( (element , index ) => {
        return <div className='item' key={index}>
        <img className='w-100' src={element.image} height={170} alt="" />
        </div>
      })}
    </Slider>
  </div>
  {/* //// Second Slider //// */}
</>
}
