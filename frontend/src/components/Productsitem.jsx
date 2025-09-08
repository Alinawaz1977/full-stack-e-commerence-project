import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const Productsitem = ({id,name,image,price}) => {
    const {currency}=useContext(ShopContext)
  return (
    <Link to={`/product/${id}`} >
    <div className='overflow-hidden ' >
        <img className='rounded-md hover:scale-110  transition-all ease-in-out' src={image[0]} alt="" />
        <p className='pt-3 pb-1 text-sm  ' >{name}</p>
        <p className='font-medium' >{currency}{price}</p>
    </div>
    </Link>
  )
}

export default Productsitem