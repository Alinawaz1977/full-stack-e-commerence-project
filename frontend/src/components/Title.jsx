import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='flex  gap-3 justify-center items-center ' >
        <div className='text-gray-500' >{text1} <span className=' text-gray-700 font-medium ' >{text2}</span></div>
    </div>
  )
}

export default Title