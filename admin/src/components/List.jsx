import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setlist] = useState([])
  console.log(list);
  

  const fetchproducts=async()=>{
    const response= await axios.get(backendUrl+"/api/product/list")
    setlist(response.data.products)
  }
 
  useEffect(() => {
   fetchproducts()
  }, [])

  const handledelete=async(id) => { 
    try {
      const response= await axios.post(backendUrl+"/api/product/remove",{id},{headers:{token}})
      if(response.data.success){
        toast.success("Product removed")
        await fetchproducts()
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
   await fetchproducts()
   }
  

  return (
    <div>
      <p className='ml-12  mt-5 flex flex-col gap-2 ' >All Product list</p>
      <div className='grid py-1 px-2.5 mt-2.5 bg-slate-100 grid-cols-[1fr_3fr_1fr_1fr_1fr] ml-12 ' >
        <b>Image</b>
        <b>Name</b>
        <b>Catergory</b>
        <b>Price</b>
        <b className='text-center' >Action</b>
        </div>
        {
          list.map((item)=>(
            <div className=' border border-gray-200 ml-12 items-center grid py-1 px-2.5 mt-2.5 bg-slate-100 grid-cols-[1fr_3fr_1fr_1fr_1fr] ' >
          <img className='w-15' src={item.image[0]} alt="productimage" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.price}</p>
          <p onClick={()=>handledelete(item._id)} className='text-center cursor-pointer ' >X</p>
        </div>
          ))
      }
    </div>
  )
}

export default List