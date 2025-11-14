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

    const navigate = (path) => {
        window.location.href = path;
    }

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
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-8 space-y-12">

      <section className="border-b pb-10">
      <ProductInfo 
        product = {product}
        addToCart = {addToCart}
        />
      </section>

      <section className="border-b pb-10">
      <MyCart 
        cart = {cart}
        sumAllItems = {sumAllItems}
        clearCart = {clearCart}
        />
      </section>

      <section className="pb-10">
      <CommentList 
        Comments = {Comments}
        handleComments = {handleComments}
      />     
      </section>

    
      <div className="flex justify-center gap-6 mt-10">
        <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition" onClick={() => navigate("/home")}>Continue Shopping</button>
        <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition" onClick={() => navigate("#")}>Seller's Profile</button>
      </div>
      </div>

      </div>
    
    </>
  )
}
export default ProductDetail
