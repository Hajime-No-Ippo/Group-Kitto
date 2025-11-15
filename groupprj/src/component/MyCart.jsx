import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyCart = (props) => {

    const navigate = useNavigate();
    const [toast, setToast] = useState("");

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2500);
    };

  return (
    <div className="m-8">
        <h2>Items in Cart: </h2>    
        {props.cart.length > 0 ? (
            <div>  </div>   
        ) : (
            <p>Your cart is empty.</p>
        )}

<div className="w-full bg-white rounded-2xl shadow-xl p-6 space-y-8">

  {props.cart.map((item, index) => (
    <div key={index} className="flex w-full border-b pb-6">

      {/* LEFT — Product Image */}
      <img 
        src={item.img}
        alt={item.name}
        className="w-32 h-32 object-cover rounded-lg mr-6"
      />

      {/* CENTER — Main Info */}
      <div className="flex-1 space-y-2">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">
          {item.name}
        </h3>

        {/* Small info row */}
        <p className="text-green-600 text-sm font-medium">In stock</p>
        <p className="text-gray-500 text-sm">Eligible for free shipping</p>

        {/* Quantity + actions */}
        <div className="flex items-center space-x-4 mt-3">

          {/* Quantity selector */}
          <div className="flex items-center border rounded-full px-3 py-1">
            <button 
              onClick={() => decreaseQty(item)}
              className="px-2 text-lg font-bold"
            >−</button>

            <span className="px-2">{item.quantity}</span>

            <button 
              onClick={() => increaseQty(item)}
              className="px-2 text-lg font-bold"
            >+</button>
          </div>

          {/* Action buttons */}
          <button className="text-blue-500" onClick={() => remove(item)}>
            Delete
          </button>

          <button className="text-blue-500">Save for later</button>
          <button className="text-blue-500">Share</button>

        </div>
      </div>

      {/* RIGHT — Price */}
      <div className="text-right text-lg font-semibold w-24">
        €{item.price}
      </div>
    </div>
  ))}

  {/* SUBTOTAL */}
  <div className="text-right text-xl font-bold mt-4">
    Subtotal ({props.cart.length} items): €{props.sumAllItems}
  </div>

</div>

        <h2>You had selected: {props.cart.length} items</h2>
        <h2>Total Price: ${props.sumAllItems}</h2>        <button>Proceed to Checkout</button>
        <button onClick={() => navigate("/home")} className=''>Continue Shopping</button>
        <button onClick={props.clearCart}>Clear Cart</button>
    </div>
  )
}

export default MyCart