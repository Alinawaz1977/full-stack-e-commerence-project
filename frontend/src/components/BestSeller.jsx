import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useState } from 'react'
import Productsitem from './Productsitem'

const BestSeller = () => {
    const {products}=useContext(ShopContext)
    const [bestseller, setbestseller] = useState([])

    useEffect(() => {
    const bestproducts=products.filter((item)=>(item.bestseller))
    setbestseller(bestproducts.slice(0,5))
    }, [products])
    
  return (
    <div>
      <div className='flex items-center justify-center flex-col ' >
        <div className='flex justify-center text-lg md:text-3xl items-center gap-3' >
      <Title  text1={"Best"} text2={"SELLER"} />
      <div className='h-[2px] w-13 bg-black' ></div>
        </div>
      <p className='text-sm pt-4 ' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ipsam.</p>
      </div>
      <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 py-10 ' >
       {
        bestseller.map((item,index)=>{
        return <Productsitem key={index} image={item.image} price={item.price} name={item.name} id={item._id} />
        })
       }
      </div>
    </div>
  )
}

export default BestSeller