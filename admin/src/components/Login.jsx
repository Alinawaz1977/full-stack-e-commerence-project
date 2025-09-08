import React from 'react'
import { useState } from 'react'
import { backendUrl } from '../App'
import axios from "axios"
import { toast } from 'react-toastify'
const Login = ({settoken}) => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const handlesubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(backendUrl+"/api/user/admin",{email,password})
      if(response.data.success){
        settoken(response.data.token)
        setemail('')
        setpassword('')
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
    }
  }

  return (
    <div className='flex  justify-center items-center min-h-screen' >
      <div className='px-8  py-8 bg-white rounded-sm shadow-md w-full sm:w-96   ' >
        <p className='font-bold text-2xl' >Admin Panel</p>
        <form onSubmit={handlesubmit} >
          <div className='mt-3 min-w-72' >
            <p className='mt-3' >Email</p>
            <input value={email} onChange={(e) => setemail(e.target.value)} className=' mt-3 w-full border rounded-sm border-gray-400 p-2' type="email" placeholder='example@gmail.com' />
          </div>
          <div className='mt-3 min-w-72' >
            <p className='mt-4' >Password</p>
            <input onChange={(e) => setpassword(e.target.value)} value={password} className=' mt-3 w-full border rounded-sm border-gray-400 p-2' type="password" placeholder='example@gmail.com' />
          </div>
          <input className='hover:scale-105 transition-all duration-100 mt-5 cursor-pointer py-2 rounded-sm text-white w-full bg-black ' type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}

export default Login