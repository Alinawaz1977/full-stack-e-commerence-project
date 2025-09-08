import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

import { useState } from 'react'
import { useEffect } from 'react'
import Productsitem from './Productsitem'


const LatestCollectoin = () => {
    const {products}=useContext(ShopContext)
    const [latestproducts, setlatestproducts] = useState([])

    useEffect(() => {
        setlatestproducts(products.slice(0,10))
    }, [products])
    
  return (
    <>
    <div className='my-10  ' >
        <div className=' py-10 text-xl md:text-3xl text-center  ' >
            <div className='flex justify-center items-center gap-3' >

            <Title className="" text1={"LATEST"} text2={"COLLECTION"} />
            <div className='h-[2px] w-13 bg-black' ></div>
            </div>
            <p className='text-gray-600 w-3/4 mx-auto text-sm py-2 ' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. In praesentium voluptatem dolorem minus sunt. Dolore aliquid praesentium vel similique optio.</p>
        </div>
        <div className='  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 ' > 
        {
            latestproducts.map((item,index)=>{ 
               return <Productsitem key={index} image={item.image} price={item.price} id={item._id} name={item.name} />           
            })
        }
        </div>
    </div>
    </>
  )
}

export default LatestCollectoin