import React from "react"
import { Routes,Route } from "react-router-dom"
import Collectoin from "./pages/Collectoin"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Order from "./pages/Order"
import Product from "./pages/Product"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"
import { ToastContainer, toast } from 'react-toastify';
import ProductCard from "./pages/ProductCart"
import PlaceOrderr from "./pages/PlaceOrderr"
import Login from "./pages/Login"
import Verify from "./pages/Verify"

function App() {
  return (
    <>
    <div className="px-3 pt-6 sm:px-[3vw] md:px-[5vw] lg:px-[7vw]" >
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
    <Routes>
      <Route path="/cart" element={<ProductCard/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/collection" element={<Collectoin/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/product/:productid" element={<Product/>} />
      <Route path="/order" element={<Order/>} />
      <Route path="/placeorder" element={<PlaceOrderr/>} />
      <Route path="/login" element={<Login/>}  />
      <Route path="/verify" element={<Verify/>} />
    </Routes>
    <Footer/>
    </div>
    </>
  )
}

export default App
