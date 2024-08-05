import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { cartContext } from '../../Context/cartContext';
import Swal from 'sweetalert2';

export default function ProductDetails() {
  let {addToCart , setNumCart} = useContext(cartContext);
  async function addCart (id) {
    let req = await addToCart(id).catch( (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    })
    if (req.data.status === 'success') {
      Swal.fire({
        title: "Good job!",
        text: "Product added successfully to your cart",
        icon: "success"
      });
      setNumCart(req.data.numOfCartItems)
    }
  }
  let params = useParams ();
  function getProductDetails (id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`) }
  let { data } = useQuery(['prodductDetails' , params.id] , () => getProductDetails (params.id) , {
    enabled : !!params.id
  });

  return <>
  {data?.data.data ?  <div className="row align-items-center">
    <Helmet>
      <title>{data?.data.data.title}</title>
    </Helmet>
    <h1 className='text-center my-5'>Product Details</h1>
    <div className="col-md-4">
        <OwlCarousel className='owl-theme' items={1} autoplay autoplayTimeout={10000}>
          {data?.data.data.images.map((image , index) => (
            <div className='item' key={index}>
              <img className='w-100' src={image} alt={data?.data.data.title} />
            </div>
          ))}
        </OwlCarousel>
    </div>
    <div className="col-md-8">
      <h2 className='h5'>{data?.data.data.title}</h2>
      <p>{data?.data.data.descrption}</p>
      <h6 className='text-main'>{data?.data.data.category?.name}</h6>
      <h6>Price : {data?.data.data.price} EGP</h6>
      <div className="d-flex justify-content-between">
        <span>Rating Quantity : {data?.data.data.ratingsQuantity}</span>
        <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
      </div>
      <button onClick={ ()=> addCart(params.id)} className='btn bg-main text-white w-100 mt-3'>Add To Cart</button>
    </div>
  </div> : ''}
  </>
}
