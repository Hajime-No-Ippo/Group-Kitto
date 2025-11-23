import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export default function LikeItList({ userId, username }) {
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    console.log("Fetching likes for userId:", userId);
    const fetchLikes = async () => {
      // 1. Get all likes by this user
      const q = query(collection(db, "likes"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const likes = snapshot.docs.map((d) => d.data()); // [{ itemId, userId }, ...]

      console.log(
        "Likes snapshot:",
        snapshot.docs.map((d) => d.data())
      );

      // If no likes, stop early
      if (likes.length === 0) {
        setLikedItems([]);
        return;
      }

      // 2. Fetch each actual product
      const itemFetches = likes.map(async (like) => {
        const itemRef = doc(db, "items", like.itemId);
        const itemSnap = await getDoc(itemRef);

        return {
          id: itemSnap.id,
          ...itemSnap.data(),
        };
      });

      const items = await Promise.all(itemFetches);

      setLikedItems(items);
    };

    fetchLikes();
  }, [userId]);

  return (
    <div className="w-full max-w-4xl p-4">
      {/* 显示用户名而不是 UID */}
      <h2 className="text-2xl font-bold mb-4">
        {username || userId}'s Favorites
      </h2>

      {likedItems.length === 0 ? (
        <p>No liked items found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {likedItems.map((item) => (
            <li key={item.id} className="bg-white shadow-md p-4 rounded-lg">
              <strong className="text-lg">{item.name}</strong>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
