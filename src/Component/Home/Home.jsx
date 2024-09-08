import HomeProduct from '../HomeProduct/HomeProduct';
import HomeSlider from '../HomeSlider/HomeSlider';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Home () {

  return <>
  <HelmetProvider>
    <Helmet>
      <title>Fresh Cart</title>
    </Helmet>
    <HomeSlider/>
    <HomeProduct/>
  </HelmetProvider>
  </>
}
