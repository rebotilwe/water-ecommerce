import React, { useContext } from 'react'
import './ProductDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const ProductDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
  return (
    <div className='product-display' id='product-display'>
         <h2>Our Water Collection</h2>
      <p>Choose from a range of premium Thirsti bottled water — still, sparkling, or flavoured.</p>
        <div className="product-display-list">
            {food_list.map((item,index)=>{
                if(category==="All" || category===item.category){
                    return(
                        <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                     )
                }
               
            })}
        </div>
    </div>
  )
}

export default ProductDisplay