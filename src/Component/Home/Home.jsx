import { Helmet } from 'react-helmet';
import HomeProduct from '../HomeProduct/HomeProduct';
import HomeSlider from '../HomeSlider/HomeSlider';

export default function Home () {
  
  return <>
  <Helmet>
    <title>Fresh Cart</title>
  </Helmet>
  <HomeSlider/>
  <HomeProduct/>
  </>
}
