import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Products from '../Data/ProductData'
import MyCart from '../component/MyCart'
import ProductInfo from '../component/ProductInfo'
import CommentList from '../component/CommentList'
import Toast from '../component/Toast';
import useFetchData from "../component/FetchData.jsx";

// ⭐ added
import LikeIt from "../component/likeItButton";  
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


/*
 ├── ProductDetail  ← adds to cart
 └── MyCart          ← reads from cart
*/
 
export const ProductDetail = () => {
    const [cart, setCart] = useState([]);
    const [Comments, setComments] = useState([]);
    const [toast, setToast] = useState("");
    const [clicked, setClicked] = useState(false);
    const Products = useFetchData();
    const { id } = useParams();
    // ⭐ get authenticated firebase user
    const [userId, setUserId] = useState(null);
    const[sellerName, setSellerName] = useState("");
    const[username, setUserName] = useState("");


    useEffect(() => { 
      const auth = getAuth(); 
      const unsubscribe = onAuthStateChanged(auth, (user) => { 
        if (user) { setUserId(user.uid); // logged in 
          } else { setUserId(null); // logged out 
          } 
        }); 
        return () => unsubscribe(); 
      }, []);


    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2500);
    };

    const navigate = (path) => {
        window.location.href = path;
    }

    const product = Products.find(p => p.id === id);


    useEffect(() => {
      async function getUser() {
        if(!product?.uid) return
        const ref = doc(db, "users",product.uid)
        const snap = await getDoc(ref)

        if(snap.exists()){
          setSellerName(snap.data().username)
        }else{
          setSellerName("Unknown")
        }
      }
      getUser();
    },[product?.uid]);

    useEffect(() => {
      async function getCommenter() {
        if(!userId) return
        const ref1 = doc(db, "users",userId)
        const snap1 = await getDoc(ref1)
        setUserName(snap1.data().username)
    }
    getCommenter();
    },[userId]);

    const addToCart = (item) => {
      if(cart.find(i => i.name === item.name)) {
        showToast(`${item.name} SOLD OUT!`);
        return;
      }else{
        setCart([...cart, item]);
        showToast(`${item.name} added to cart!`);
        setClicked(true);
      }
    }

    const handleComments = (newComment) => {
        setComments([...Comments, newComment]);
    }

    
  {/*Reduce the sum*/}
    const sumAllItems =
      cart.length===0?0 :cart.reduce((a, b) => a + Number(b.price), 0);

    const clearCart = () => {setCart([]); setClicked(false)}

  if (!product) {
  return <p>Loading product...</p>;
  }else
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
        userId = {userId}
        sellerName = {sellerName}
        
        />
      </section>
      


      <section className="border-b pb-10">
      <MyCart 
        cart = {cart}
        sumAllItems = {sumAllItems}
        clearCart = {clearCart}
        clicked = {clicked}
  
        />
      </section>

      

  
      <section className="pb-10">
      <CommentList 
        Comments = {Comments}
        handleComments = {handleComments}
        product = {product}
        username = {username}
      />     
      </section>
      </div>
    
    
    </>
  )
}
export default ProductDetail
