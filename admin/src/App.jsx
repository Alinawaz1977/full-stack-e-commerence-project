import { useState, useEffect } from 'react'
import "./index.css"
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from ".//components/Add.jsx"
import List from ".//components/List"
import Login from './components/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import Order from './components/Order.jsx'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const [token, settoken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])


  return (
    <div className='px-3 mt-2 sm:px[3vw] md:px-[5vw] lg:[7vw] ' >
      <ToastContainer />
      {
        token === '' ? <Login settoken={settoken} /> : <>
          <Navbar settoken={settoken} />
          <div className='flex w-full' >
            <Sidebar />
            <div className='w-[70vw] border-l border-gray-300 ' >
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/login' element={<Login token={token} />} />
                <Route path='/orders' element={<Order token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }

    </div>
  )
}

export default App
