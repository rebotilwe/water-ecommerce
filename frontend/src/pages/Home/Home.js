import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreProducts/ExploreProducts'
import FoodDisplay from '../../components/ProductDisplay/ProductDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import ExploreProduct from '../../components/ExploreProducts/ExploreProducts'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'

const Home = () => {

  const [category,setCategory] = useState("All");
  return (
    <div>
        <Header/>
        <ExploreProduct category={category} setCategory={setCategory}/>
        <ProductDisplay category={category}/>
        <AppDownload/>
            </div>
  )
}

export default Home