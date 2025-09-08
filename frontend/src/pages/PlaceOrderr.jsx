import React from 'react'
import Title from '../components/Title'
import Cart from '../components/Cart'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { backendUrl, ShopContext } from '../context/ShopContext'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrderr = () => {
    const [method, setmethod] = useState("cod")
    const { products, cartitem, totalcartamount, delievery_fee, setcartitem, token, navigate } = useContext(ShopContext)
    const navgate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        try {
            const orderdata = []
            for (const items in cartitem) {
                for (const item in cartitem[items]) {
                    if (cartitem[items][item] > 0) {
                        const productinfo = structuredClone(products.find(product => product._id === items))
                        if (productinfo) {
                            productinfo.size = item
                            productinfo.quantity = cartitem[items][item]
                            orderdata.push(productinfo)
                        }
                    }
                }
            }
            console.log(orderdata);
            const frontdata = {
                address: data,
                items: orderdata,
                amount: totalcartamount() + delievery_fee
            }

            switch (method) {
                case "cod":
                    const response = await axios.post(backendUrl + "/api/order/place", frontdata, { headers: { token } })
                    if (response.data.success) {
                        setcartitem({})
                        navigate("/order")
                    }
                    else {
                        toast.error(errors.message)
                    }
                    break;
                case "stripe":
                    const responsestripe = await axios.post(backendUrl + "/api/order/stripe", frontdata , { headers: { token } })
                    if(responsestripe.data.success){
                        const {session_url}=responsestripe.data
                        window.location.replace(session_url)
                    }
                    else{
                        toast.error(responsestripe.data.message)
                    }
                    break

                default:
                    break;
            }

        } catch (error) {
            toast.error(error.message)
        }

    }





    return (
        <>
            <div className='h-[2px] bg-gray-300 w-full mt-5 ' ></div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col sm:flex-row gap-10 lg:justify-between ' >
                {/* --------------------------left---------------------------- */}
                <div className='w-full sm:w-[50vw]   ' >
                    <div className='flex gap-2 items-center text-2xl mt-20 ' >
                        <Title text1={"DELIEVERY"} text2={"IMFORMATION"} />
                        <div className='h-[2px] w-13 bg-black' ></div>
                    </div>
                    <div className='flex gap-2 my-5  ' >
                        <input {...register("firstname")} className='border-2 border-gray-200 w-1/2 px-2.5  rounded-sm py-1' type="text" placeholder='firstname' />
                        <input {...register("last name")} className='border-2 border-gray-200 w-1/2 px-2.5  rounded-sm py-1' type="text" placeholder='lastname' />
                    </div>
                    <input {...register("email")} className='border-2 border-gray-200 w-full px-2.5  rounded-sm py-1' type="email" placeholder='Email adress' />
                    <input {...register("street")} className='border-2 border-gray-200 mt-6 w-full px-2.5  rounded-sm py-1' type="text" placeholder='Street' />
                    <div className='flex gap-2 my-5 ' >
                        <input {...register("city")} className='border-2 border-gray-200 w-1/2 px-2.5  rounded-sm py-1' type="text" placeholder='City' />
                        <input {...register("state")} className='border-2 border-gray-200 w-1/2 px-2.5  rounded-sm py-1' type="text" placeholder='State' />
                    </div>
                    <div className='flex gap-2 my-5 ' >
                        <input {...register("zipcode")} className='border-2 border-gray-200 w-1/2 px-2.5  rounded-sm py-1' type="number" placeholder='Zipcode' />
                        <input {...register("country")} className='border-2 border-gray-200 w-1/2 px-2.5  rounded-sm py-1' type="text" placeholder='Country' />
                    </div>
                    <input {...register("phone")} className='border-2 border-gray-200  w-full px-2.5  rounded-sm py-1' type="text" placeholder='Phone' />
                </div>
                {/* --------------------------------------Right--------------------------------------- */}
                <div className='w-full flex flex-col sm:w-[40vw] my-30 ' >
                    <div className='' >
                        <Cart />
                    </div>
                    <div className='justify-center lg:justify-normal flex gap-2  items-center text-lg mt-20 ' >
                        <Title text1={"PAYMENT"} text2={"METHOD"} />
                        <div className='h-[2px] w-13 bg-black' ></div>
                    </div>
                    <div className='flex  flex-col lg:flex-row gap-2 mt-4 cursor-pointer items-center ' >
                        <div className='flex gap-2 w-50 h-10 justify-center items-center border border-gray-500 py-1.5 px-5 ' >
                            <div className='flex justify-center items-center gap-2   ' >
                                <p className={`h-3.5 w-3.5 border border-gray-400 ${method === "stripe" ? "bg-green-500" : ""} rounded-full`} > </p>
                                <img onClick={() => setmethod("stripe")} className='w-12' src={assets.stripe_logo} alt="stripe_logo" />
                            </div>
                        </div>
                        <div className='flex gap-2 w-50 h-10 justify-center items-center border border-gray-500 py-1.5 px-5 ' >
                            <div className='flex justify-center items-center gap-2   ' >
                                <p className={`${method === "razorpay" ? "bg-green-500" : ""} h-3.5 w-3.5 border border-gray-400  rounded-full`} > </p>
                                <img onClick={() => setmethod("razorpay")} className={`w-20 `} src={assets.razorpay_logo} alt="stripe_logo" />
                            </div>
                        </div>
                        <div className='flex gap-2 w-50 h-10 justify-center items-center border border-gray-500 py-1.5 px-5 ' >
                            <div className='flex justify-center items-center gap-2   ' >
                                <p className={`h-3.5 w-3.5 border border-gray-400 rounded-full ${method === "cod" ? "bg-green-500" : ""} `}> </p>
                                <p onClick={() => setmethod("cod")} className={`text-sm w-[130px] tracking-tighter `} >CASH ON DELIEVERY</p>
                            </div>
                        </div>
                    </div>
                    <div className='text-center lg:text-end mt-5' >
                        <button type='submit' className='bg-black text-white text-sm  px-13 py-2'>PLACE ORDER</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PlaceOrderr