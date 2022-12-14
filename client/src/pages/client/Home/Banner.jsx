import React from 'react'
import HeaderSwiper from "../../../components/client/ui/swiper/HeaderSwiper";


const Banner = ({ headerArray }) => {
  return (
    // <div class="container-fluid">
    <section className='section pt-0'>
        <div className="row w-100 m-0 banner__img">
            <div className='col-5 p-0'>
  <img src="./images/shape-left.png" alt="Snow" className='w-100'/>
  </div>
    <div className='col-2 p-0'></div>
  <div className='col-5 p-0'>
  <img src="./images/shape-right.png" alt="Snow" className='w-100'/>
  </div>
  </div>
  <div className="banner__swiper">
  <HeaderSwiper headerArray={headerArray}/>
  </div>
  </section>

  )
}

export default Banner