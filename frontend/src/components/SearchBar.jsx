import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { useState } from 'react'


const SearchBar = () => {
  const [visible, setvisible] = useState(false)
  const {search,setsearch,showsearch,setshowsearch}=useContext(ShopContext)
  const location=useLocation()

useEffect(() => {
  if(location.pathname.includes("/collection")){
    setvisible(true)
  }
  else(
    setvisible(false)
  )
}, [location])

  

  return showsearch && visible ? (
    <div className=' bg-gray-50 my-6 ' >
       <div className='flex justify-center items-center  ' >
        <div className=" w-1/2 border rounded-full py-1 border-gray-500 flex items-center px-3" >
        <input onChange={(e)=>setsearch(e.target.value)} value={search} placeholder='search' className=' px-3 w-full outline-none  ' type="text" name="" id="" />
        <img className='w-4 h-4 ' src={assets.search_icon} alt="seachbaricon" />
        </div>
        <img onClick={()=>setshowsearch(false)}  className='w-4 ml-3 ' src={assets.cross_icon} alt="cross icon" />
       </div>
    </div>
  ):null
}

export default SearchBar