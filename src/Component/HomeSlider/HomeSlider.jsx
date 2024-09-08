import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
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
  console.error = (function(error) {
    return function(...args) {
      if (typeof args[0] === 'string' && args[0].includes('UNSAFE_componentWillReceiveProps')) {
        return;
      }
      error.apply(console, args);
    };
  })(console.error);

  return <>
  <div className="first-slider mt-4">
    <div className="row g-0">
      <div className="col-md-9">
        <OwlCarousel className='owl-theme' items={1} loop autoplay autoplayTimeout={2000}>
          <div className='item'>
            <img className='w-100' src={img1} height={400} alt="" />
          </div>
          <div className='item'>
            <img className='w-100' src={img2} height={400} alt="" />
          </div>
          <div className='item'>
            <img className='w-100' src={img3} height={400} alt="" />
          </div>
        </OwlCarousel>
      </div>
      <div className="col-md-3">
        <img className='w-100' src={img1} height={200} alt="" />
        <img className='w-100' src={img2} height={200} alt="" />
      </div>
    </div>
  </div>

  <div className="second-slider mt-4">
    <h3 className='mb-3'>Shop Popular Categories</h3>
    <OwlCarousel className='owl-theme' items={7} loop autoplay autoplayTimeout={2000}>
      {categoryList.map( (element , index ) => {
        return <div className='item' key={index}>
        <img className='w-100' src={element.image} height={180} alt="" />
      </div>
      })}
    </OwlCarousel>
  </div>
</>
}
