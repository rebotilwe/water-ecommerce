import './Cart.css';
import React, { useContext } from 'react';
import { menu_list } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const { cartItems, food_list, removeFromCart , getTotalCartAmount} = useContext(StoreContext);

  const navigate = useNavigate();
  console.log(cartItems)



  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className='cart-items-title cart-items-item' key={index}>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
              </div>
            );
          }
        })}
      </div>
      <div className="cart-container">
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-totals-details">
                <p>Subtotal</p>
                <p>R{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-totals-details">
                <p>Delivery Fee</p>
                <p>R{getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-totals-details">
                <b>Total</b>
                <b>R{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
              <div />
              <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Cart;
