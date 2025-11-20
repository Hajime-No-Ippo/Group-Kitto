import { db } from "../firebase.js"; 
import dummyPics from "../Data/itemPic.js";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";


import React from 'react'

const useFetchData = () => {
    const [products, setProducts] = React.useState([]);
  
    useEffect(() => {
    // Fetch products from database (simulated here with static data)
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "items"));
      const list = snapshot.docs.map(doc => {
        const item = {id: doc.id, ...doc.data()};

        const match = dummyPics.find(pic => pic.productID === item.productId);
        item.img = match ? match.img[0] : "/img/placeholder.jpg";


        return item;
      })

      setProducts(list);
    };

    fetchProducts();

    } , []);

  return products;
}

export default useFetchData