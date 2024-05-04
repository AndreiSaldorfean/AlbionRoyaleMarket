import '../css/Banners.css';
import Banner from '../images/banner.png';

export default function Banners() {
  

  return (
    <>
    <div className='container-fluid position-absolute w-100 h-100'>
        <img className='banner-img-left ' src={Banner}/>
        <img className='banner-img-right' src={Banner}/>
    </div>
    </>
  )
}