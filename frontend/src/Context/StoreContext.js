import { createContext } from "react";
import React, { useState } from 'react'
import { food_list } from "../assets/assets";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart= (itemId) => {
      
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        }

        const getTotalCartAmount = () => {
            let totalAmount = 0;
            for (const itemId in cartItems) {
                if (cartItems.hasOwnProperty(itemId)) {
                    const quantity = cartItems[itemId];
                    const item = food_list.find(product => product._id === itemId);
                    if (item) {
                        totalAmount += item.price * quantity;
                    }
                }
            }
            return totalAmount;
        };
        

    const contextValue ={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount


    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children }
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;