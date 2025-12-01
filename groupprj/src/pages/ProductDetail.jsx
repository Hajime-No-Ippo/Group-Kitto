import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Products from '../Data/ProductData'
import ProductInfo from '../component/ProductInfo'
import CommentList from '../component/CommentList'
import Toast from '../component/Toast';
import useFetchData from "../component/FetchData.jsx";

// ⭐ added
import LikeIt from "../component/likeItButton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

  // Declare variable for sending emails
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [username, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  const currentUser = {
  uid: userId,
  username: username,
  email: userEmail,
};

  //get uid
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // logged in
      } else {
        setUserId(null); // logged out
      }
    });
    return () => unsubscribe();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const product = Products.find((p) => p.id === id);

  //Get seller name from firebase to render
  useEffect(() => {
    async function getUser() {
      if (!product?.uid) return;
      const ref = doc(db, "users", product.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setSellerName(snap.data().username);
      } else {
        setSellerName("Unknown Seller");
      }
    }
    getUser();
  }, [product?.uid]);

  //Get seller email from firebase to parse it to child component to sending emails
  useEffect(() => {
    async function getSellerEmail(){
      if(!product?.uid) return;
      const ref = doc(db, "users", product.uid);
      const snap = await getDoc(ref);

      if(snap.exists()){
        setSellerEmail(snap.data().email);
      } else {
        setSellerEmail("Unknown Address");
      }
    }
    getSellerEmail();
  }, [product?.uid]);

  //Get username from firebase
  useEffect(() => {
    async function getCommenter() {
      if (!userId) return;
      const ref1 = doc(db, "users", userId);
      const snap1 = await getDoc(ref1);
      setUserName(snap1.data().username);
    }
    getCommenter();
  }, [userId]);

  //Get username from firebase
    useEffect(() => {
    async function getUserEmail() {
      if (!userId) return;
      const ref1 = doc(db, "users", userId);
      const snap1 = await getDoc(ref1);
      setUserEmail(snap1.data().email);
    }
    getUserEmail();
  }, [userId]);

  //function to add new comments to Comment List (firebase)
  async function addComment(productId, user, commentText){
  await addDoc(collection(db, "items", productId, "comments"), {
    uid: user.uid,
    username: user.username,
    email: user.email,
    message: commentText,
    commentAt: serverTimestamp(),
  });
}

//delete the comments
async function deleteComment(productId, commentId) {
  await deleteDoc(doc(db, "items", productId, "comments", commentId));
  console.log("Deleted:", commentId);
}


    

  if (!product) {
    return <p>Loading product...</p>;
  } else
    return (
      <>
        {/* RENDER THE TOAST HERE */}
        {toast && <Toast message={toast} />}


      <section className="border-b pb-10">
      <ProductInfo 
        product = {product}
        userId = {userId}
        sellerName = {sellerName}
        sellerEmail = {sellerEmail}
        />
      </section>

  
  
      <section className="border-b pb-10">
      <CommentList 
        Comments = {Comments}
        addComment = {addComment}
        product = {product}
        username = {username}
        currentUser={currentUser}
        deleteComment={deleteComment}
      />     
      </section>
    </>
  )
}
export default ProductDetail
