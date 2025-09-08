import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets, products } from '../assets/assets'
import { useState, useEffect } from 'react'
import Title from '../components/Title'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { currency } = useContext(ShopContext)
  const { productid } = useParams()
  const { products,addtocart } = useContext(ShopContext)
  const [productdata, setproductdata] = useState()
  const [image, setimage] = useState('')
  const [size, setsize] = useState(false)
  const [visble, setvisble] = useState(false)

  const fetchproducts = async () => {
    products.map((item) => {
      if (item._id == productid) {
        setproductdata(item)
        setimage(item.image[0])
        console.log(productdata);
      }
    })
  }

  useEffect(() => {
    fetchproducts()
  }, [productid])
  useEffect(() => {
    setTimeout(() => {
      setvisble(true)
    }, 50);
  }, [])


  return productdata ? (
    <>
      <div className='h-[2px] bg-gray-300 my-5  '> </div>
      <div className={`transition-opacity ease-in duration-500 opacity-0 sm:flex gap-30   my-10 ${visble?"opacity-100":"opacity-0"} `} >
        <div className='flex gap-3 flex-col-reverse sm:flex-row' >
          <div className='flex flex-row sm:flex-col gap-2 shrink-0 overflow-y-scroll ' >
            {
              productdata.image.map((item, index) => (
                <img onClick={() => setimage(item)} className='w-21' key={index} src={item} alt="productimage" />
              ))
            }
          </div>
          <img className=' w-full sm:w-[28vw]  mb-15 object-contain shrink-0 ' src={image} alt="productimage" />
        </div>
        <div className="right flex flex-col gap-3  ">
          <div className=' ' >
            <p className='text-black text-2xl font-medium ' >Men Round Neck Pure Cotton T-shirt</p>
            <div className="image flex gap-1.5 h-5 items-center ">
              <img className='w-4 h-4 mt-1'  src={assets.star_icon} alt="starstimages" />
              <img className='w-4 h-4 mt-1'  src={assets.star_icon} alt="starstimages" />
              <img className='w-4 h-4 mt-1'  src={assets.star_icon} alt="starstimages" />
              <img className='w-4 h-4 mt-1'  src={assets.star_icon} alt="starstimages" />
              <img className='w-4 h-4 mt-1'  src={assets.star_dull_icon} alt="starstimages" />
              <div className='mt-1' >(122)</div>
            </div>
            <div className='py-5 font-bold text-xl' >{currency}{productdata.price}</div>
            <p className='mb-4' >{productdata.description}</p>
            <p className='py-5 font-medium text-lg text-gray-500' >Select Size</p>
            <div className='flex gap-3' >
              {
                productdata.sizes.map((item,index)=>(
                  <button onClick={()=>{setsize(item)}} key={index} className={`w-10 ${item===size?"border-2 border-orange-500":""} h-10 bg-slate-100 cursor-pointer`} >{item}</button>
                ))
              }
            </div>
            <button onClick={()=>addtocart(productdata._id,size)} className='px-6 py-2.5 my-7 bg-black text-white active:bg-zinc-700' >ADD TO CART</button>
            <div className='h-[1px] bg-gray-300 mb-2 ' ></div>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className='py-20' >
      <div className='flex' >
          <div className='font-medium border w-30 h-10 flex justify-center items-center text-center border-gray-300' >Description</div>
          <div className=' border w-30 h-10 flex justify-center items-center text-center border-gray-300' >Reviews(122)</div>
        </div>
        <div className='border border-gray-300 flex justify-center items-center p-6' >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem soluta optio quo officia, distinctio debitis, at eum quam praesentium consequatur harum. Hic molestias incidunt non molestiae minus tenetur voluptatibus consectetur earum doloremque ipsam distinctio odit facilis minima tempore reiciendis nostrum quibusdam aliquid fugiat excepturi aut unde, harum perspiciatis ipsa fugit! Debitis velit facere tempore non alias enim dolorum fuga unde, laborum aperiam perspiciatis, quae dolores animi. Sunt aut, consequatur nemo eaque modi iste neque, molestias amet a et asperiores saepe debitis, veniam ducimus porro dolorum reiciendis? Consequatur possimus quia laudantium vitae expedita atque omnis, eum veniam nisi, magni facere mollitia.
        </div>
      </div>
      <div className='md:text-3xl text-lg' >
        <RelatedProducts category={productdata.category} subCategory={productdata.subCategory}  />
      </div>
    </>
  ) : <div className='opacity-0' ></div>
}

export default Product