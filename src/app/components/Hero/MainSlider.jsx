'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { HeroData } from '../../../../utility/HeroData';


const MainSlider = () => {
  const settings = {
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: true,
    dots: true,
  };

  return (
    <div className="my-5">
  <div className="overflow-hidden hidden sm:block">
    <Slider {...settings}>
      {HeroData.map((ele, index) => (
        <div key={index} className="relative flex items-center justify-center h-[300px] sm:h-[450px] md:h-[260px] lg:h-[450px]" >
          <Image src={ele.img} alt={`Banner Image ${index + 1}`} width={1200} height={600} loading="lazy" 
            className="rounded-md object-cover w-full h-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw" />
        </div>
      ))}
    </Slider>
  </div>
</div>
  );
};

export default MainSlider;
