import React from 'react'
import { assets, products } from '../assets/assets'

const Footer = () => {
  return (
    <>
    <div className='flex flex-col  sm:grid sm:grid-cols-[1fr_1fr] md:gap-60 py-30  ' >
        <div>
            <img src={assets.logo} className='w-32 mx-auto md:mx-0' alt="" />
            <p className='text-gray-500 w-full md:w-[36vw] pt-6 ' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic quis facere asperiores aliquid, earum reprehenderit? Autem perspiciatis sit ipsa fuga temporibus vel, dolorem cum quos nihil eos. Eos blanditiis nostrum vel. Qui vitae iste, rerum beatae nisi a minima reiciendis eos amet ducimus autem incidunt.</p>
        </div>
        <div className='flex flex-col md:flex-row md:gap-15 mx-auto ' >
        <div className='pt-4 ' >
            <p className='font-medium text-xl ' >Company</p>
            <ul className='flex text-gray-500 sm:flex-col gap-2 pt-6 w-full md:w-25 ' >
                <li>Home</li>
                <li >About Us</li>
                <li>Delievery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className='pt-4' >
            <p className='font-medium text-xl' >GET IN TOUCH</p>
            <ul className='flex  text-gray-500 md:flex-col gap-6 md:gap-2 pt-6' >
                <li>03006008399</li>
                <li>ali0578600@gmail.com</li>
            </ul>
        </div>
        </div>
    </div>
        <div className='h-[2px] bg-gray-300' ></div>
        <div className='flex justify-center items-center h-15  ' >
        <p className='text-sm  text-center  text-gray-500' >Copyright 2024 © GreatStack.dev - All Right Reserved.</p>
        </div>
    </>
  )
}

export default Footer