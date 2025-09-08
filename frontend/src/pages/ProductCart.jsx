import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState, useEffect } from 'react'
import Title from "../components/Title"
import { assets } from '../assets/assets'
import Cart from '../components/Cart'
const ProductCart = () => {
  const { products, currency, cartitem,updatequantity,navigate} = useContext(ShopContext)
  const [cartdata, setcartdata] = useState([])

  useEffect(() => {
    const tempdata = []
    for (const items in cartitem) {
      for (const item in cartitem[items]) {
        if (cartitem[items][item] > 0) {
          tempdata.push({
            _id: items,
            size: item,
            quantity: cartitem[items][item]
          })
        }
      }
    }
    setcartdata(tempdata)
  }, [cartitem])


  return (
    <>
      <div className='h-[2px] my-3 bg-gray-200 w-full ' ></div>
      <div className='' >
        <div className='flex pb-4 pt-20 items-center gap-3' >
          <Title text1={"YOUR"} text2={"CART"} />
          <div className='h-[2px] w-13 bg-black' ></div>
        </div>
          {
            cartdata.map((item, index) => {
              const productdata = products.find((products) => products._id == item._id)
              return(
                <div key={index} className='border-t border-b flex items-center justify-between  border-gray-200 ' >
                <div className='flex gap-5 px-2 py-3 ' >
            <img className='w-14' src={productdata.image[0]} alt="" />
            <div>
              <p className='font-medium text-sm sm:text-medium ' >{productdata.name}</p>
              <div className='flex gap-4 mt-3 ' >
                <p>{currency}{productdata.price}</p>
                <button className='border border-gray-200 px-2' >{item.size}</button>
              </div>
            </div>
          </div>
          <div>
            {/* <input min={1} onChange={(e)=>e.target.value===''||e.target.value===0?null:updatequantity(item._id,item.size,Number(e.target.value))} defaultValue={item.quantity} type="number" className='w-10 sm:w-20 p-1 border border-gray-300 rounded-md outline-none' /> */}
            <input min={1} onChange={(e)=>updatequantity(item._id,item.size,Number(e.target.value))} defaultValue={item.quantity} type="number" className='w-10 sm:w-20 p-1 border border-gray-300 rounded-md outline-none' />
          </div>
          <div>
            <img onClick={()=>updatequantity(item._id,item.size,0)} className='w-5 mx-2.5 ' src={assets.bin_icon} alt="" />
          </div>
        </div>
          )
        })
      }
      </div>
      <div className='flex justify-end my-13' >
        <Cart/>
      </div>
      <div className='flex justify-end' >
        <button onClick={()=>navigate("/placeorder")} className='text-sm py-2 px-4 cursor-pointer bg-black text-white' >PROCEED TO CHECHOUT</button>
      </div>
    </>
  )
}

export default ProductCart
