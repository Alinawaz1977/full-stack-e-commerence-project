import React from 'react'
import {NavLink} from "react-router-dom"
import assets from '../assets/assets'
const Sidebar = () => {
  return (
    <aside className='w-[20%]' >
        <NavLink className="flex rounded-md border my-3 p-2 border-gray-300 items-center gap-3" to={"/add"} >
        <p><img src={assets.add_icon} alt="addicons" /></p>
        <p>Add items</p>
        </NavLink>
        <NavLink className="flex rounded-md border my-3 p-2 border-gray-300 items-center gap-3" to={"/list"} >
        <p><img src={assets.order_icon} alt="addicons" /></p>
        <p>List items</p>
        </NavLink>
        <NavLink  className="flex rounded-md border my-3 p-2 border-gray-300 items-center gap-3" to={"/orders"} >
        <p><img src={assets.order_icon} alt="addicons" /></p>
        <p>Order items</p>
        </NavLink>
    </aside>
  )
}

export default Sidebar