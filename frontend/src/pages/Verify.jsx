import React from 'react'
import { useContext } from 'react'
import { backendUrl, ShopContext } from '../context/ShopContext'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const Verify = () => {
    const { token, setcartitem } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderid = searchParams.get("orderid")
    const navigate= useNavigate()


    const verifypayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + "/api/order/verifystripe", { success, orderid }, { headers: { token } })
            if (response.data.success) {
                setcartitem({})
                navigate("/order")
            }
            else {
                navigate("/cart")
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    useEffect(() => {
        verifypayment()
    }, [token])


    return (
        <div>
        </div>
    )
}

export default Verify