import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <>
     <div className='h-[1px] bg-gray-300 mt-5 ' ></div>
    <div>
      <div className='flex gap-2 mt-15 text-3xl justify-center items-center ' >
        <Title text1={"ABOUT"} text2={"US"} />
        <div className='h-[2px] w-13 bg-black' ></div>
      </div>
      <div className='mt-15 flex flex-col md:flex-row gap-15 items-center' >
        <img className='w-[450px]' src={assets.about_img} alt="about_image" />
        <div className='text-gray-500' >
          <p className='mt-4' >Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p className='mt-4' >Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p className='mt-4 text-black font-medium ' >Our Mission</p>
          <p className='mt-4' >Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
      <div className='flex gap-2 mt-15 text-2xl  items-center ' >
        <Title text1={"Why"} text2={"CHOOSE US"} />
        <div className='h-[2px] w-13 bg-black' ></div>
      </div>
      <div className='flex mt-10 flex-col justify-center items-center sm:flex-row' >
        <div className='w-[350px] border-[1px] border-gray-200 p-17' >
          <p className='text-lg py-5 font-medium ' >Quality Assurance:</p>
          <p className='text-gray-500 text-sm' >We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='w-[350px] border-[1px] border-gray-200 p-17' >
          <p className='text-lg py-5 font-medium ' >Quality Assurance:</p>
          <p className='text-gray-500 text-sm' >We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='w-[350px] border-[1px] border-gray-200 p-17' >
          <p className='text-lg py-5 font-medium ' >Quality Assurance:</p>
          <p className='text-gray-500 text-sm' >We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default About
