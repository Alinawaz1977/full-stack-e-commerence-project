import React from 'react'
import assets from '../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { backendUrl } from '../App'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import Lootie from "lottie-react"
import loaderanimation from "../assets/loader.json"

const Add = ({ token }) => {
  const [sizes, setsizes] = useState([])
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  const [category, setCategory] = useState("Men")        // default value
  const [subcategory, setSubcategory] = useState("Topwear")



  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()


  const onSubmit = async (data) => {

    try {
      const formData = new FormData()
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("category", category)
      formData.append("subcategory", subcategory)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("price", data.price)
      formData.append("bestseller", data.bestseller)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
      console.log(response);
      if (response.data.success) {
        reset()
        setImage1("")
        setImage2("")
        setImage3("")
        setImage4("")
        setsizes([])
        toast.success("Product added")
      }
      else {
        toast.error(response.data.message)
      }


    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <>
      
      <form onSubmit={handleSubmit(onSubmit)} className='pt-5 pl-15' >
        <p className='pb-2' >Upload image</p>
        <div className='flex gap-2' >

          <label htmlFor="image1">
            <img
              className='w-20'
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload image"
            />
            <input
              id="image1"
              type="file"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>

          <label htmlFor="image2">
            <img
              className='w-20'
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload image"
            />
            <input
              id="image2"
              type="file"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>

          <label htmlFor="image3">
            <img
              className='w-20'
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload image"
            />
            <input
              id="image3"
              type="file"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>

          <label htmlFor="image4">
            <img
              className='w-20'
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload image"
            />
            <input
              id="image4"
              type="file"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>

        </div>
        {errors.image1 && <div className='text-red-600 text-sm' >{errors.image1.message}</div>}
        <p className='my-3' >Product name</p>
        <input  {...register("name", { required: { value: true, message: "This filed is requried" } }, {
          minLength: { value: 4, message: "Must be at least 4 characters" }
        })} className='w-full sm:w-[500px] border border-gray-400 px-2 py-1 rounded-sm' type="text" placeholder='Type here' />
        {errors.name && <div className='text-red-500 text-sm ' >{errors.name.message}</div>}
        <p className='mt-3' >Product Description</p>
        <textarea {...register("description", { required: { value: true, message: "This filed is requried" } }, { minLength: { value: 10, message: "Must atleast 10 charcters" } })} className='w-[500px] rounded-sm border border-gray-400 px-2 pt-0.5 resize-none h-20 ' placeholder='Enter product description here'></textarea>
        {errors.description && <div className='text-red-500 text-sm ' >{errors.description.message}</div>}
        <div className='flex gap-3.5' >
          <div className='mt-3' >
            <p className='pb-1.5' >Product Category</p>
            <select defaultValue={'Men'} onChange={(e) => setCategory(e.target.value)}
              className='px-2 w-30 py-2 border border-gray-400 rounded-sm'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className='mt-3' >
            <p className='pb-1.5' >Sub Category</p>
            <select defaultValue={"Topwear"} onChange={(e) => setSubcategory(e.target.value)} className='px-2 w-30 py-2 border border-gray-400 rounded-sm'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className='mt-3' >
            <p className='pb-1.5' >Price</p>
            <input {...register("price", { required: { value: true, message: "Required" } })} className='px-2 w-30 py-2 border border-gray-400 rounded-sm' type="number" placeholder='80' />
          </div>
        </div>
        <p className='mt-5' >Product sizes</p>
        <div className='flex gap-2 mt-2' >
          <p onClick={() => setsizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} className={`px-5 py-3 cursor-pointer  ${sizes.includes("S") ? "bg-green-700" : "bg-slate-100"} transition-all duration-500   `} >S</p>
          <p onClick={() => setsizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} className={`px-5 py-3 cursor-pointer ${sizes.includes("M") ? "bg-green-700" : "bg-slate-100"} transition-all duration-500   `} >M</p>
          <p onClick={() => setsizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} className={`px-5 py-3  cursor-pointer ${sizes.includes("L") ? "bg-green-700" : "bg-slate-100"} transition-all duration-500  `} >L</p>
          <p onClick={() => setsizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} className={`px-5 py-3 cursor-pointer ${sizes.includes("XL") ? "bg-green-700" : "bg-slate-100"} transition-all duration-500   `} >XL</p>
          <p onClick={() => setsizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])} className={`px-5 py-3 cursor-pointer ${sizes.includes("XXL") ? "bg-green-700" : "bg-slate-100"} transition-all duration-500  `} >XXL</p>
        </div>
        <div className='flex mt-5 gap-2' >
          <input {...register("bestseller",)} type="checkbox" />
          <p>Add to bestseller</p>
        </div>
        {isSubmitting ?<Lootie
        animationData={loaderanimation}
        loop
        autoplay
        className='w-30 '
        
      />:
        <button disabled={isSubmitting} className='px-10 py-2 cursor-pointer border  border-black transition-all duration-500 mt-3  bg-black text-white' type="submit">ADD</button>}
      </form>
    </>
  )
}

export default Add