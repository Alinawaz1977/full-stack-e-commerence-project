import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-12 md:gap-2 justify-around py-20  ' >
    <div className='flex flex-col justify-center items-center ' >
        <img src={assets.exchange_icon} className='w-12 pb-6 '  alt="" />
        <p className='text-center font-medium ' >Easy Exchange Policy.</p>
        <p className=' pt-2 text-center text-gray-500 ' >We offer hassle free  exchange policy.</p>
    </div>
    <div className='flex flex-col justify-center items-center ' >
        <img src={assets.quality_icon} className='w-12 pb-6 '   alt="" />
        <p className='text-center font-medium ' >7 Days return Policy.</p>
        <p className=' pt-2 text-center text-gray-500 ' >We provide 7 days free return policy .</p>
    </div>
    <div className='flex flex-col justify-center items-center ' >
        <img src={assets.support_img} className='w-12 pb-6 '   alt="" />
        <p className='text-center font-medium ' >Best customer support.</p>
        <p className=' pt-2 text-center text-gray-500 ' >We provide 24/7 customer support.</p>
    </div>

    </div>
  )
}

export default OurPolicy