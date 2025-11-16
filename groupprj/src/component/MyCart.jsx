import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyCart = (props) => {

    const navigate = useNavigate();

  return (
    <>
      <h2 className="font-semibold m-4">My Cart:</h2>
    <div className="flex w-full mx-auto my-2 bg-white rounded-3xl shadow-xl flex-col overflow-hidden ">
        <div className="flex w-full m-4">
            {props.cart.length === 0 ? <h2 className="font-semibold">Your cart is Empty</h2> :
        <h2 className="font-semibold">You had selected: {props.cart.length} items</h2>   
            }
        <div className="flex w-full m-4 justify-end translate-y-[-20px] translate-x-[-25px]">
            <button className="bg-white border-1 border-blue-500 text-blue-500 py-2 !px-5 rounded-xl text-lg font-medium transition"
            onClick={props.clearCart}>
                Clear Cart</button>
        </div>
        </div>
        <div className="flex w-full">
            <div className="w-full bg-white p-6 space-y-8 ">

            {props.cart.map((item, index) => (
                <div key={index} className="flex w-full items-center border-b pb-6">

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
                <div className="text-right text-lg font-semibold h-10">
                    €{item.price}
                </div>
                </div>
            ))}
            </div>
        </div>
        
        <h2 className="text-left font-bold m-4 translate-y-[90px]">Subtotal ({props.cart.length} items): €{props.sumAllItems}</h2>
        

        <div className="flex justify-end space-x-1.5 m-6"> 
        <button className="bg-black text-white py-2 !px-5 rounded-xl text-lg font-medium shadow hover:!bg-green-700 transition">
            Proceed to Checkout</button>
        <button className="bg-black text-white py-2 !px-5 rounded-xl text-lg font-medium shadow hover:!bg-green-700 transition"
         onClick={() => navigate("/home")}>
            Continue Shopping</button>
        
        </div>
    </div>

    </>
  )
}

export default MyCart