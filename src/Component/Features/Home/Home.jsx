import HomeProduct from './HomeProduct/HomeProduct';
import HomeSlider from './HomeSlider/HomeSlider';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Home () {

  return <>
  <HelmetProvider>
    {/* /////// Helmet contains informations about Component /////// */}
    <Helmet>
      <title>Fresh Cart</title>
    </Helmet>
    {/* /////// Home Sliders Component /////// */}
    <HomeSlider/>
    {/* /////// Home Product Component /////// */}
    <HomeProduct/>

  </HelmetProvider>
  </>
}
