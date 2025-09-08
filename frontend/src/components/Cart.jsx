import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Cart = () => {
    const {delievery_fee,currency,totalcartamount}=useContext(ShopContext)
  return (
    <>
    <div className='w-full sm:w-[300px] lg:w-[500px]'>
        <div className='flex gap-3 items-center ' >
        <Title text1={"CART"} text2={"TOTAL"} />
        <div className='h-[2px] w-13 bg-black' ></div>
        </div>
        <div className='flex flex-col gap-3 mt-5 ' >
            <div className='flex justify-between' >
                <p>Subtotal</p>
                <p>{currency}{totalcartamount()}.00</p>
            </div>
        <div className='h-[1px] w-full bg-gray-300' ></div>
            <div className='flex justify-between' >
                <p>Shipping fee</p>
                <p>{currency}{delievery_fee}</p>
            </div>
        <div className='h-[1px] w-full bg-gray-300' ></div>
            <div className='flex justify-between' >
                <p className='font-medium' >total</p>
                <p  className='font-medium' >{currency}{totalcartamount()===0?null:totalcartamount()+delievery_fee}.00</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Cart