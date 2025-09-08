import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex transition-all flex-col  mt-6 md:flex-row border border-gray-700 ' >
      <div className=" py-10 left w-full md:w-1/2 flex justify-center items-center ">
        <div className="first">
          <div className='flex gap-3 items-center' >
            <div className='h-[2px]  w-10 bg-black' ></div>
            <h2 className='font-medium' >OUR BEST SELLERS</h2>
          </div>
          <div className="medium">
            <h2 className='prata-regular text-3xl lg:text-5xl' >Latest Arrivals</h2>
          </div>
          <div className='flex items-center gap-3 pt-3 ' >
            <h2 className='font-medium' >SHOP NOW</h2>
            <div className='h-[2px] w-10 bg-black ' ></div>
          </div>
        </div>
      </div>
      <div className="right w-full md:w-1/2 ">
        <img src={assets.hero_img} className='w-full ' alt="" />
      </div>
    </div>
  )
}

export default Hero
