import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Products from '../Data/ProductData'
import MyCart from '../component/MyCart'
import ProductInfo from '../component/ProductInfo'
import CommentList from '../component/CommentList'

/*
 ├── ProductDetail  ← adds to cart
 └── MyCart          ← reads from cart
*/
 
export const ProductDetail = () => {
    const { id } = useParams();
    const [cart, setCart] = useState([]);
    const [Comments, setComments] = useState([]);

    const product = Products.find((item) => item.id === parseInt(id));

    const addToCart = (item) => {
        setCart([...cart, item]);
        alert(`${item.name} added to cart!`);
    }

    const handleComments = (newComment) => {
        setComments([...Comments, newComment]);
    }

    const sumAllItems = cart.reduce((a, b) => a + b.price, 0);

    const clearCart = () => setCart([]);

    
  return (
    <>
      <ProductInfo 
        product = {product}
        addToCart = {addToCart}
        />
      <MyCart 
        cart = {cart}
        sumAllItems = {sumAllItems}
        clearCart = {clearCart}
        />
      <CommentList 
        Comments = {Comments}
        handleComments = {handleComments}
      />     

      <div className='buttons'>
        <button className = "" onClick={() => navigate("#")}>Back to Products</button>
        <button className = "" onClick={() => navigate("#")}>Seller's Profile</button>
      </div>
    </>
  )
}
export default ProductDetail
