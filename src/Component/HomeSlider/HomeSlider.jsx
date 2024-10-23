import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'

export default function HomeSlider() {
  useEffect(() => {
    getCategories()
  } , [])
  let [categoryList , setCategory] = useState([]);
  async function getCategories () {
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategory(data.data)
  }
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
  <div className="first-slider mt-4">
    <div className="row g-0">
      <div className="col-md-9">
        <Slider {...settings}>
          <div><img className='w-100' src={img1} height={400} alt="" /></div>
          <div><img className='w-100' src={img2} height={400} alt="" /></div>
          <div><img className='w-100' src={img3} height={400} alt="" /></div>
        </Slider>
      </div>
      <div className="col-md-3">
        <img className='w-100' src={img1} height={200} alt="" />
        <img className='w-100' src={img2} height={200} alt="" />
      </div>
    </div>
  </div>

  <div className="second-slider mt-4">
    <h3 className='mb-3'>Shop Popular Categories</h3>
    <Slider {...settings2}>
      {categoryList.map( (element , index ) => {
        return <div className='item' key={index}>
        <img className='w-100' src={element.image} height={180} alt="" />
      </div>
      })}
    </Slider>
  </div>
</>
}
