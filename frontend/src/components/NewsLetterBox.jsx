import React from 'react'

const NewsLetterBox = () => {

    const handlesubmit=(event)=>{
        event.preventDefault()
    }
  return (
    <div className='flex flex-col gap-5 pt-20 justify-center text-center ' >
        <div>
        <p className='text-2xl font-bold' >Subcribe now & get 20% off</p>
        <p className='text-gray-500 text-sm' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ut?</p>
        </div>
        <form onSubmit={handlesubmit} className='flex justify-center ' action="">
            <input className='w-full  md:w-1/2 px-4 py-3 outline-none border-2 border-gray-200' type="email" placeholder='Enter your email' required />
            <input  className='py-[14px] cursor-pointer px-6 bg-black text-white' type="submit" value="Subcribe" />
        </form>
    </div>
  )
}

export default NewsLetterBox