import React, { useContext } from 'react'
import Title from '../components/Title'
import { backendUrl, ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
const Order = () => {
  const {  currency ,token} = useContext(ShopContext)
  const [orderdata, setorderdata] = useState([])


  const loadorderdata = async () => {
    if (!token) {
      return null
    }
    const response = await axios.post(backendUrl+"/api/order/userorders",{},{headers:{token}})
    if(response.data.success){
      let allorderitem=[]
      response.data.order.map((order)=>{
        order.items.map((item)=>{
          item["status"]=order.status
          item["paymentmethod"]=order.paymentmethod
          item["date"]=order.date
          allorderitem.push(item)
        })
      })
      setorderdata(allorderitem.reverse());
      
    }
    
  }

  useEffect(() => {
    loadorderdata()
  }, [token])
  

  return (
    <>
      <div className='h-[2px] bg-gray-300 w-full mt-5 ' ></div>
      <div className='' >
        <div className='text-3xl flex justify-start mt-12 gap-3 ' >
          <Title text1={"MY"} text2={"ORDERS"} />
          <div className='h-[2px] bg-black w-10 mt-5 ' ></div>
        </div>
        <div className='flex flex-col gap-3' >
          {
            orderdata.map((item) => (
              <div className='flex border-t border-b border-gray-300 mt-5 py-3 items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0 ' >
                <div className='flex gap-5  w-90' >
                  <img className='w-15 object-cover' src={item.image[0]} alt="" />
                  <div>
                    <div className='flex' >
                      <p className='font-medium' >{item.name}</p>
                    </div>
                    <div className='flex gap-3' >
                      <p className='font-medium' >{currency}{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size }</p>
                    </div>
                    <div className='flex items-center text-sm gap-0.5' >
                      <p className='font-medium' >Date:</p>
                      <p className='text-gray-700' >{new Date(item.date).toDateString()}</p>
                    </div>
                    <div className='flex items-center text-sm gap-0.5' >
                      <p className='font-medium' >Payment method:</p>
                      <p className='text-gray-700' >{item.paymentmethod}</p>
                    </div>
                      
                  </div>
                </div>
                <div className='flex gap-2 items-center' >
                  <p className='h-2.5 w-2.5 rounded-full bg-green-500' ></p>
                  <p>{item.status}</p>
                </div>
                <div className='border border-gray-300' >
                  <button onClick={loadorderdata} className='px-3 py-1' >track order</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Order
