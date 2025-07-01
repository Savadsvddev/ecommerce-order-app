import React, { useState } from 'react'
import Slider from './Slider'
import CategoryList from './CategoryList'
import ProductList from './ProductList'
import Footer from '../../Layout/Footer'

const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState("")

  return (
     <div className="p-10 px-4 md:px-16 overflow-hidden">
        {/* Sliders */}
        <Slider />

        {/* CategoryList */}
        <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

        {/* Product List */}
        <ProductList  selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
    </div>
  )
}

export default Home