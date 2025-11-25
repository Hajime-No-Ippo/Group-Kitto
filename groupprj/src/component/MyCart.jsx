import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SpotlightCard from "@components/SpotlightCard.jsx";
import '../style/SpotlightCard.css';

const MyCart = (props) => {
    const [showDetail, setShowDetail] = useState(false);

    const navigate = useNavigate();

    const handleDetailToggle = () => {
        setShowDetail(!showDetail);
    }

    if(!showDetail) {
        return (
            <SpotlightCard
                
                spotlightColor="rgba(0, 0, 0, 0.27)"
                className="flex w-full mx-auto justify-between p-4 rounded-2xl shadow-lg cursor-pointer m-4"
                >
            <>
            <div onClick={handleDetailToggle}>
                <h2 className="font-semibold">My Cart: {props.cart.length} items</h2>
                <span className="text-blue-600 align-center underline" >View Details</span>
            </div>
            </>
            </SpotlightCard>
        )
    }
    
  return (
    <>
      <h2 className="font-semibold m-4">My Cart:</h2>
    <div className="flex w-full mx-auto my-2 bg-white rounded-2xl shadow-xl flex-col"  >
      <SpotlightCard
                
                spotlightColor="rgba(0, 0, 0, 0.27)"
                className=" bg-transparent">
        <div className="flex w-full h-full m-4" >
            {props.cart.length === 0 ?  <div className="flex item-center justify-center rounded-2xl bg-white p-4 w-full h-full border-2 border-dashed">
                      <h2 className="text-sm text-gray-500 w-full justify-center text-center">
                          "Your cart is empty."
                      </h2>
                    </div> :
        <h2 className="font-semibold">You had selected: {props.cart.length} items</h2>   
    }
        <div className="flex w-full m-4 justify-end translate-y-[-20px] translate-x-[-25px]">
            <button className="bg-opacity-0 text-blue-600 border-1 border-blue-600 py-2 !px-5 rounded-xl text-lg font-medium hover:bg-blue-600 hover:text-white transition"
            onClick={handleDetailToggle}>
                Show Less</button>
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
            
            <button className="bg-opacity-0 text-blue-600 border-1 border-blue-600 py-2 !px-5 rounded-xl text-lg font-medium hover:bg-blue-600 hover:text-white transition"
            onClick={props.clearCart}>
                Clear Cart
            </button>
            <button className="bg-black text-white py-2 !px-5 rounded-xl text-lg font-medium shadow hover:!bg-blue-600 transition">
            Proceed to Checkout</button>
            <button className="bg-black text-white py-2 !px-5 rounded-xl text-lg font-medium shadow hover:!bg-blue-600 transition"
         onClick={() => navigate("/home")}>
            Continue Shopping</button>
        
        </div>
        </SpotlightCard>
    </div>

    </>
  )
}



export default MyCart