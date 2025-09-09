import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import ScrollTotop from './ScrollTotop'

const Productsitem = ({id,name,image,price}) => {
    const {currency}=useContext(ShopContext)
  return (
    <Link onClick={ScrollTotop()} to={`/product/${id}`} >
    <div className='overflow-hidden ' >
        <img loading='lazy' className=' rounded-md hover:scale-110  transition-all ease-in-out' src={image[0]} alt="" />
        <p className='pt-3 pb-1 text-sm  ' >{name}</p>
        <p className=' text-base font-medium' >{currency}{price}</p>
    </div>
    </Link>
  )
}

export default Productsitem