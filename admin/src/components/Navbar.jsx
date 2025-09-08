import React from 'react'
import assets from '../assets/assets'

const Navbar = ({settoken}) => {
  return (
    <header>
      <nav className='flex justify-between items-center px-4' >
        <img className='w-40' src={assets.logo} alt="forever_logo" />
        <div>
          <button onClick={()=>settoken('')} className=' bg-gray-700 py-2 cursor-pointer px-6 text-white rounded-full' >Logout</button>
        </div>
      </nav>
      <div className='w-full h-[1px] bg-gray-200 mt-3 ' ></div>
    </header>
  )
}

export default Navbar