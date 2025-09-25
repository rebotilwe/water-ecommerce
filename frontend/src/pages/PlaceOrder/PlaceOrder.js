import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import {loadStripe} from '@stripe/stripe-js';
import { food_list, menu_list } from '../../assets/assets';



const PlaceOrder = () => {

    // payment integration
  const makePayment = async (e) => {
  e.preventDefault();

const amountKobo = (getTotalCartAmount() + 2) * 100;

  const email = "customer@example.com"; // collect from your form

  const res = await fetch("http://localhost:8085/api/paystack/initialize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount: amountKobo })
  });

  const data = await res.json();

  if (data.authorization_url) {
    window.location.href = data.authorization_url; // redirect to Paystack hosted page
  } else {
    console.error("Paystack error:", data);
  }
};


  const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email address'/>
        <input type="text" placeholder='Street'/>
        </div>
        <div className="multi-fields">
        <input type="text" placeholder='City' />

          <input type="text" placeholder='State' />
      </div>
      <div className="multi-fields">
          <input type="text" placeholder='Zip Code' />
          <input type="text" placeholder='Country' />
          </div>
          <input type="text" placeholder='Phone'/>
      <div className="place-order-right">
      <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
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
              <button onClick={makePayment}>PROCEED TO PAYMENT</button>

            </div>
            </div>

      </div>

    </form>
 
  )
}

export default PlaceOrder