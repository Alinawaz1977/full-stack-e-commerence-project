import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext = createContext()
export const backendUrl = import.meta.env.VITE_BACKENDURL

const ShopContextprovider = (props) => {
    const currency = "$"
    const delievery_fee = 10
    const [search, setsearch] = useState('')
    const [products, setproducts] = useState([])
    const [showsearch, setshowsearch] = useState(false)
    const [cartitem, setcartitem] = useState({})
    const navigate = useNavigate()
    const [token, settoken] = useState(localStorage.getItem("token") || "")


    const addtocart = async (itemid, size) => {
        let cartdata = structuredClone(cartitem)
        if (!token) {
            toast.error("Please log in to access this feature.")
            return
        }
        if (!size) {
            toast.error("Select your size")
            return
        }
        if (cartdata[itemid]) {
            if (cartdata[itemid][size]) {
                cartdata[itemid][size] += 1
            }
            else {
                cartdata[itemid][size] = 1
            }
        }
        else {
            cartdata[itemid] = {}
            cartdata[itemid][size] = 1
        }
        setcartitem(cartdata)
        if (token) {
            try {
                const response = await axios.post(backendUrl + "/api/cart/add", { itemid, size }, { headers: { token } })
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const getcartcount = () => {
        let totalcount = 0;
        for (const items in cartitem) {
            for (const item in cartitem[items]) {
                try {
                    if (cartitem[items][item] > 0) {
                        totalcount += cartitem[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalcount;
    }

    const updatequantity = async (itemid, size, quantity) => {
        let cartdata = structuredClone(cartitem)
        cartdata[itemid][size] = quantity
        setcartitem(cartdata)
        if (token) {
            try {
                const response = await axios.post(backendUrl + "/api/cart/update", { itemid, size, quantity }, { headers: { token } })
            } catch (error) {

            }

        }

    }

    const totalcartamount = () => {
        let totalamount = 0;
        for (const items in cartitem) {
            let productinfo = products.find(product => product._id === items)
            for (const item in cartitem[items]) {
                if (cartitem[items][item] > 0) {
                    try {
                        totalamount += productinfo.price * cartitem[items][item]
                    } catch (error) {
                    }
                }
            }
        }
        return totalamount
    }

    const getproductdata = async () => {
        try {

            const response = await axios.get(backendUrl + "/api/product/list")
            if (response.data.success) {
                setproducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error)
        }

    }

    const getcaritem=async()=>{
        try {
            const response= await axios.post(backendUrl+"/api/cart/get",{},{headers:{token}})
            if(response.data.success){
                setcartitem(response.data.cartdata)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getproductdata()
        getcaritem()
    }, [])



    const value = {
        products, currency, delievery_fee, search, setsearch, showsearch, setshowsearch, cartitem, addtocart, getcartcount, updatequantity, totalcartamount, navigate, token, settoken,setcartitem
    }
    return (
        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextprovider