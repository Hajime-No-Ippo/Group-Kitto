import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { 
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";

export default function LikeItList({ userId }) {
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    console.log("Fetching likes for userId:", userId);
    const fetchLikes = async () => {
      // 1. Get all likes by this user
      const q = query(
        collection(db, "likes"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      const likes = snapshot.docs.map(d => d.data());  // [{ itemId, userId }, ...]
      
      console.log("Likes snapshot:", snapshot.docs.map(d => d.data()));

      // If no likes, stop early
      if (likes.length === 0) {
        setLikedItems([]);
        return;
      }

      // 2. Fetch each actual product
      const itemFetches = likes.map(async like => {
        const itemRef = doc(db, "items", like.itemId);
        const itemSnap = await getDoc(itemRef);

        return {
          id: itemSnap.id,
          ...itemSnap.data()
        };
      });

      const items = await Promise.all(itemFetches);

      setLikedItems(items);
    };

    fetchLikes();
  }, [userId]);

    
  return (
    <div style={{ padding: 20 }}>
      <h2>{userId} – Liked Items</h2>

      {likedItems.length === 0 ? (
        <p>No liked items found.</p>
      ) : (
        <ul>
          {likedItems.map(item => (
            <li key={item.id}>
              <strong>{item.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}