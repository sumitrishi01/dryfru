import React from 'react'
import Hero from '../../components/Hero/Hero'
import ProductCard from '../../components/ProductCard/ProductCard'
import ProductShow from '../../components/ProductShow/ProductShow'
import Testimonial from '../../components/Testinonial/Testimonial'

const Home = () => {
  return (
    <>
      <Hero />
      <ProductCard/>
      <ProductShow/>
      <Testimonial />
    </>
  )
}

export default Home
