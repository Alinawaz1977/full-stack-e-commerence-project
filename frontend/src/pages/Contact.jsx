import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const Contact = () => {
  return (
    <>
      <div className='h-[1px] bg-gray-300 mt-5 ' ></div>
      <div>
        <div className='flex gap-2 mt-15 text-2xl justify-center  items-center ' >
          <Title text1={"CONTACT"} text2={"US"} />
          <div className='h-[2px] w-13 bg-black' ></div>
        </div>
        <div className='flex gap-10 flex-col md:flex-row justify-normal md:items-center md:justify-center mt-10' >
          <img className='w-[400px]' src={assets.contact_img} alt="" />
          <div className='w-[35vw] ' >
            <p className='text-lg font-medium' >Our Store</p>
            <div className='my-5 text-gray-700 text-sm ' >
              <p>54709 Willms Station </p>
              <p>Suite 350, Washington, USA</p>
            </div>
            <div className='text-gray-700 text-sm ' >
              <p>Tel: (415) 555‑0132</p>
              <p>Email: greatstackdev@gmail.com</p>
            </div>
          <p className='mt-7' >Careers at Forever</p>
          <p className='mt-3 text-sm text-gray-700 ' >Learn more about our teams and job openings.</p>
          <button className='mt-6 cursor-pointer py-2 px-4 border-[1px] border-black hover:bg-black hover:text-white transition-all duration-500 ' >Explore Jobs</button>
          </div>
        </div>
        <div className='mt-20' >
        <NewsLetterBox/>
        </div>
      </div>
    </>
  )
}

export default Contact
