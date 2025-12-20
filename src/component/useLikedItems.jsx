import { useEffect, useState } from "react";
import { db } from "../firebase";
import { 
  collection, query, where, orderBy, getDocs 
} from "firebase/firestore";
import useFetchData from "../component/FetchData";

const useLikedItems = (userId) => {
  const [likedItems, setLikedItems] = useState([]);
  const products = useFetchData();

  useEffect(() => {
    if (!userId || products.length === 0) return;

    const fetchLikes = async () => {
      const q = query(
        collection(db, "likes"),
        where("userId", "==", userId),
        orderBy("likedAt", "desc")
      );

      const snapshot = await getDocs(q);
      const likes = snapshot.docs.map(doc => ({
        itemId: doc.data().itemId,
        likedAt: doc.data().likedAt
      }));

      // Match liked items to products
      const combined = likes
        .map(like => {
          const product = products.find(p => p.id === like.itemId);
          return product ? { ...product, likedAt: like.likedAt } : null;
        })
        .filter(Boolean);

      setLikedItems(combined);
    };

    fetchLikes();
  }, [userId, products]);

  return likedItems;
};

export default useLikedItems;
