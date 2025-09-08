import React from 'react'
import axios from "axios"
import { backendUrl } from '../App'
import { useState, useEffect } from 'react'
import assets from '../assets/assets'
import { useContext } from 'react'
import { toast } from 'react-toastify'

const Order = ({ token }) => {
    const [orders, setorders] = useState([])
    const fetchallorders = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } })
            if (response.data.success) {
                setorders(response.data.order)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const statuschange = async (e,orderid) => {
        try {
            const response = await axios.post(backendUrl + "/api/order/update", {orderid,status:e.target.value }, { headers: { token } })
            if(response.data.success){
                await fetchallorders()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        fetchallorders()
    }, [token])


    return (
        <div className='ml-15 my-8' >
            <p className='mb-2' >Order page</p>
            {
                orders.map((order, index) => (
                    <div key={index} className='border-2 border-gray-200 text-[12px] lg:text-normal grid grid-cols-1 md:grid-cols-[0.5fr_1fr_1fr_1fr_1fr] px-5 gap-5 my-2 py-10 lg:grid-cols-[1fr_4fr_2fr_2fr_2fr]' >
                        <img className='w-12' src={assets.parcel_icon} alt="parcelicon" />
                        <div >
                            {order.items.map((item, index) => (
                                <p key={index} >
                                    {item.name} x {item.quantity}{item.size}{index === order.items.length - 1 ? '' : ','}
                                </p>
                            ))}
                            <p>{order.address.firstname}</p>
                            <p>{order.address.street}</p>
                            <p>{order.address.city}{order.address.state}{order.address.country}{order.address.zipcode}</p>
                            <p>{order.address.phone}</p>
                        </div>
                        <div>
                            <p>items: {order.items.length}</p>
                            <p>method: {order.paymentmethod}</p>
                            <p>payment:{order.payment ? "Done" : "Pending"}</p>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p>${order.amount}</p>
                        </div>
                        <div>

                            <select onChange={(e) => statuschange(e,order._id)} value={order.status} className='py-1 px-3 border border-gray-200 w-fit' >
                                <option value="Order placed">Order placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shiped">Shiped</option>
                                <option value="Out for delievery">Out for delievery</option>
                                <option value="Delieverd">Delieverd</option>
                            </select>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Order