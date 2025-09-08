import React, { useContext } from 'react'
import Title from '../components/Title'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import { data } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const { token, settoken, navigate } = useContext(ShopContext)
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [currentstate, setcurrentstate] = useState("Login")
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentstate === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", { email, password, name })
        if (response.data.success) {
          settoken(response.data.token)
          localStorage.setItem("token",response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
      else {
        const response = await axios.post(backendUrl + "/api/user/login", { email, password })
        if (response.data.success) {
          settoken(response.data.token)
          localStorage.setItem("token",response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    if(token){
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    const token = localStorage.getItem("token")
    settoken(token)
  }, [])
  
  

  return (
    <>
      <div className='h-[1px] bg-gray-300 mt-5 ' ></div>
      <form onSubmit={handlesubmit} className=' h-[90vh] mt-48 ' action="">
        <div className='flex gap-2 justify-center items-center' >
          <p className='text-4xl prata-regular ' >{currentstate}</p>
          <div className='h-[2px] w-12 mt-3 bg-black' ></div>
        </div>
        <div className=' w-full flex flex-col  items-center mx-auto mt-5 gap-5 sm:w-[400px]' >
          {currentstate === "Sign Up" ? <input onChange={(e) => setname(e.target.value)} value={name} className='w-full border border-black  px-2 py-1' type="text" placeholder='Name' required /> : ""}
          <input onChange={(e) => setemail(e.target.value)} value={email} className='w-full border border-black  px-2 py-1' type="email" placeholder='email' required />
          <input onChange={(e) => setpassword(e.target.value)} value={password} className='w-full border border-black  px-2 py-1' type="password" placeholder='password' required />
        </div>
        <div className='flex justify-center items-center flex-col' >
          <div onClick={() => setcurrentstate(currentstate === "Sign Up" ? "Login" : "Sign Up")} className='text-sm mt-1 text-center cursor-pointer' >{currentstate === "Sign Up" ? <p>Login here</p> : <p>create an account</p>}</div>
          <button className='py-2 mt-10 w-40 cursor-pointer  text-center px-8 bg-black text-white ' type="submit">{currentstate === "Sign Up" ? "Sign Up" : "Log in"}</button>
        </div>
      </form>
    </>
  )
}

export default Login
