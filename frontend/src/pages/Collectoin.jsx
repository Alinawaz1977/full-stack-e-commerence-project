import React, { useContext,useState } from 'react'
import Title from "../components/Title"
import { ShopContext } from '../context/ShopContext'
import Productsitem from '../components/Productsitem'
import { useEffect } from 'react'
import { assets, products } from '../assets/assets'

const Collectoin = () => {
  const {products,search,showsearch}=useContext(ShopContext)
  const [showfilter, setshowfilter] = useState(true)
  const [filterproducts, setfilterproducts] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sorttype, setsorttype] = useState("revalent")
  console.log(subcategory);
  

  const tooglecategory=(e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setcategory(prev=>[...prev,e.target.value])
    }
  }
  const togglesubcategory=(e)=>{
    if(subcategory.includes(e.target.value)){
      setsubcategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setsubcategory(prev=>[...prev,e.target.value])
    }
  }

  const applyfilter=()=>{
    let productscopy=products.slice();

    if(search && showsearch){
      productscopy=productscopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length>0){
     productscopy=productscopy.filter(item=>category.includes(item.category))
    }
     if(subcategory.length>0){
     productscopy=productscopy.filter(item=>subcategory.includes(item.subcategory))
    }
    setfilterproducts(productscopy)  
  }

  const sortproducts=()=>{
    const fpcopy=filterproducts.slice()
    switch (sorttype) {
      case "low-high":
        setfilterproducts(fpcopy.sort((a,b)=>(a.price-b.price)))
        break;
        case "high-low":
          setfilterproducts(fpcopy.sort((a,b)=>(b.price-a.price)))
          break;
      default:
        applyfilter()
        break;
    }
  }

  useEffect(() => {
  setfilterproducts(products)
  }, [])

  useEffect(() => {
    applyfilter()
  }, [category,subcategory,search,showsearch,products])
  
  useEffect(() => {
    sortproducts()
  }, [sorttype])
  
  
  return (
    <>
      <div className='h-[1px] bg-gray-300 mt-5 ' ></div>
    <div className='py-10 flex flex-col sm:flex-row ' >
      <div>
      <p onClick={()=>setshowfilter(!showfilter)} className='text-xl flex gap-3 items-center font-medium ' >FILTERS <span><img className={`w-2 md:w-0 ${showfilter?"rotate-90":""}`} src={assets.dropdown_icon} alt="" /></span></p>
      <div className={` transtion-all sm:block min-w-60 pl-4 border-2 my-4 border-gray-200 ${showfilter?"hidden":"block"}`}>
        <p className='text-xl font-medium pt-2 ' >Category</p>
        <div className='flex flex-col gap-2 py-3 w-60 ' >

        <div className='flex gap-3 ' >
          <input type="checkbox"  value={"Men"} onChange={tooglecategory}  />
          <p>Men</p>
        </div>
        <div className='flex gap-3 ' >
          <input type="checkbox" value={"Women"} onChange={tooglecategory} />
          <p>Women</p>
        </div>
        <div className='flex gap-3 ' >
          <input type="checkbox"  value={"Kids"} onChange={tooglecategory} />
          <p>Kids</p>
        </div>
        </div>
      </div>
      <div className={` transtion-all sm:block min-w-60 pl-4 border-2 my-4 border-gray-200 ${showfilter?"hidden":"block"}`} >
        <p className='text-xl font-medium pt-2  ' >Sub category</p>
        <div className='flex flex-col gap-2 py-3' >

        <div className='flex gap-3'   >
          <input type="checkbox" value={"Topwear"} onChange={togglesubcategory} />
          <p>Topwear</p>
        </div>
        <div className='flex gap-3'   >
          <input type="checkbox" value={"Bottomwear"} onChange={togglesubcategory} />
          <p>Bottomwear</p>
        </div>
        <div className='flex gap-3'   >
          <input type="checkbox" value={"Winterwear"} onChange={togglesubcategory} />
          <p>Winterwear</p>
        </div>
        </div>
      </div>
    </div>
    <div className=' sm:pl-10 w-full ' >
      <div className='flex justify-between ' >
      <Title className="text-3xl" text1={"ALL"} text2={"COLLECTIONS"} />
      <select onChange={(e)=>setsorttype(e.target.value)} className='border-2 border-gray-300 w-fit sm:py-1 sm:px-3 ' >
        <option value="revalent">Sort by : relavent</option>
        <option value="low-high">Sort by:low to high</option>
        <option value="high-low">Sort by:high to low</option>
      </select>
      </div>
      <div className='grid grid-cols-2 gap-10 pt-5 md:grid-cols-3 lg:grid-cols-4' >
        {
          filterproducts.map((item,index)=>(
            <Productsitem image={item.image } id={item._id} price={item.price} name={item.name} key={index} />
          ))
        }
      </div>
    </div>
      </div>
    </>
  )
}


export default Collectoin
