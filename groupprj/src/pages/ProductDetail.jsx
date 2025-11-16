import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Products from '../Data/ProductData'
import MyCart from '../component/MyCart'
import ProductInfo from '../component/ProductInfo'
import CommentList from '../component/CommentList'
import Toast from '../component/Toast';

/*
 ├── ProductDetail  ← adds to cart
 └── MyCart          ← reads from cart
*/
 
export const ProductDetail = () => {
    const { id } = useParams();
    const [cart, setCart] = useState([]);
    const [Comments, setComments] = useState([]);
    const [toast, setToast] = useState("");


    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2500);
    };

    const navigate = (path) => {
        window.location.href = path;
    }

    const product = Products.find((item) => item.id === parseInt(id));

    const addToCart = (item) => {
        setCart([...cart, item]);
        showToast(`${product.name} added to cart!`);
    }

    const handleComments = (newComment) => {
        setComments([...Comments, newComment]);
    }

    const sumAllItems = cart.reduce((a, b) => a + b.price, 0);

    const clearCart = () => setCart([]);

    
  return (
    <>
    {/* RENDER THE TOAST HERE */}
      {toast && <Toast message={toast} />}

    <div className="bg-gray-50 min-h-screen py-10 px-6">

      <div className="flex align-right gap-6 m-6">
        <button
        className="btn btn-outline-secondary mt-2 mb-4"
        onClick={() => navigate("/home")}
      >
        ← Back to Home
      </button>
      </div>

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
      

  <h2 className="font-semibold mt-4">Comments:</h2>
      <div className=" mx-auto my-12 bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">     
      <section className="pb-10">
      <CommentList 
        Comments = {Comments}
        handleComments = {handleComments}
        product = {product}
      />     
      </section>
      </div>
    </div>
    
    </>
  )
}
export default ProductDetail
