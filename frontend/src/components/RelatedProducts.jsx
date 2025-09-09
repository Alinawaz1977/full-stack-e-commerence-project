import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from './Title'
import Productsitem from './Productsitem'
import { useEffect } from 'react'

const RelatedProducts = ({category,subCategory}) => {
    const {products}=useContext(ShopContext)
    const [related, setrelated] = useState([])

    useEffect(() => {
       if(products.length>0){
       let productscopy=products.slice()
        productscopy=productscopy.filter(item=>category===item.category)
        productscopy=productscopy.filter(item=>subCategory===item.subCategory)
        setrelated(productscopy.slice(0,5))
        
    }
    }, [products])
    
   
  return (
    <div>
        <Title text1={"RELATED"} text2={"PRODUCTS"}  />
        <div className=' gap-5 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' >
                {
                   related.map((item,index)=>(
                    <Productsitem  image={item.image} id={item._id} key={index} name={item.name} price={item.price} />
                   ))
                }
        </div>
    </div>
  )
}

export default RelatedProducts