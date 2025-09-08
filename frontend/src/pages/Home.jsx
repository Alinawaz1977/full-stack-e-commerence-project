import React from 'react'
import Hero from '../components/Hero'
import LatestCollectoin from '../components/LatestCollectoin'
import Title from '../components/Title'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollectoin/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home
