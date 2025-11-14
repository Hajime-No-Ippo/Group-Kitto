import React, { useState } from 'propreact'

const MyCart = (props) => {
  return (
    <div>MyCart
        <h2>Items in Cart: </h2>    
        <h2>You had selected: {props.cart.length} items</h2>
        {props.cart.length > 0 ? (
            <ul>
                {props.cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        ) : (
            <p>Your cart is empty.</p>
        )}
        <h2>Total Price: ${props.sumAllItems}</h2>
        <button>Proceed to Checkout</button>
        <button>Continue Shopping</button>
        <button onClick={props.clearCart}>Clear Cart</button>
    </div>
  )
}

export default MyCart