import React from 'react'
import { assets } from "../assets/assets"
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'

const Navbar = () => {
    const [visible, setvisible] = useState(false)
    const { search, token, settoken, navigate, setsearch, showsearch, setshowsearch, getcartcount } = useContext(ShopContext)

    const handlelogout = () => {
        navigate("/login")
        localStorage.removeItem("token")
        settoken('')
    }

    return (
        <div className='flex justify-between item-center'>
            <Link to={"/"} >
                <img className='w-30 ' src={assets.logo} alt="brand_logo" />
            </Link>
            <ul className='hidden md:flex gap-7' >
                <NavLink to={"/"} >
                    <p>Home</p>
                    <hr className=' transition-all w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden ' />
                </NavLink>
                <NavLink to={"/collection"} >
                    <p>Collection</p>
                    <hr className=' transition-all w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden ' />
                </NavLink>
                <NavLink to={"/contact"} >
                    <p>Contact</p>
                    <hr className=' transition-all w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden ' />
                </NavLink>
                <NavLink to={"/about"} >
                    <p>About</p>
                    <hr className=' transition-all w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden ' />
                </NavLink>
            </ul>
            <div className='flex gap-4 items-center' >
                <img onClick={() => setshowsearch(true)} src={assets.search_icon} className='w-5 h-5' alt="" />
                <div className='group relative ' >
                    <Link to={"/login"} ><img className='w-5 h-5 cursor-pointer ' src={assets.profile_icon} alt="" /></Link>
                    <div className='group-hover:block hidden absolute transition-all ease-in-out dropdown-menu  md:right-[-60px] right-0 pt-4' >
                        {
                            token && <div className='flex flex-col w-36 bg-slate-100 px-5 py-3 text-gray-600 ' >
                                <p className='cursor-pointer font-medium transition-all hover:text-black' >My profile</p>
                                <p className='cursor-pointer font-medium transition-all hover:text-black' >Orders</p>
                                <p onClick={handlelogout} className='cursor-pointer font-medium transition-all hover:text-black' >Logout</p>
                            </div>
                        }

                    </div>
                </div>
                <Link to={"/cart"} className='relative' >
                    <img src={assets.cart_icon} className='w-5 ' alt="carticon" />
                    <p className='absolute right-[-2px] bottom-[-4px] text-white bg-black w-4  text-center rounded-full aspect-square text-[10px]' >{getcartcount()}</p>
                </Link>
                <img onClick={() => setvisible(true)} src={assets.menu_icon} className='w-6  md:hidden ' alt="menuicon" />
            </div>
            <div className={`absolute bottom-0 top-0 bg-white transition-all right-0 overflow-hidden ${visible ? "w-full" : "w-0"} `} >
                <div className='flex flex-col gap-4' >

                    <div onClick={() => setvisible(false)} className='flex p-3 gap-4' >
                        <img src={assets.dropdown_icon} className='w-4 rotate-180' alt="" />
                        <p className='text-xl font-medium' >back</p>
                    </div>
                    <div className='flex flex-col' >
                        <NavLink onClick={() => setvisible(false)} className="border border-gray-400 py-3 pl-4 " to={"/"} >
                            Home
                        </NavLink  >
                        <NavLink onClick={() => setvisible(false)} className="border border-gray-400 py-3 pl-4 " to={"/collection"} >
                            collection
                        </NavLink>
                        <NavLink onClick={() => setvisible(false)} className="border border-gray-400 py-3 pl-4 " to={"/about"} >
                            About
                        </NavLink>
                        <NavLink onClick={() => setvisible(false)} className="border border-gray-400 py-3 pl-4 " to={"/contact"} >
                            Contact
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
