import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";


export default function LikeIt({ userId, itemId }) {
  const [liked, setLiked] = useState(false);
  const [likeDocId, setLikeDocId] = useState(null);

  // Check if this item is already liked by the user
  useEffect(() => {
    const checkLike = async () => {
      const q = query(
        collection(db, "likes"),
        where("userId", "==", userId),
        where("itemId", "==", itemId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLiked(true);
        setLikeDocId(querySnapshot.docs[0].id);
      }
    };
    checkLike();
  }, [userId, itemId]);

  const toggleLike = async () => {
    if (liked) {
      // UNLIKE
      await deleteDoc(doc(db, "likes", likeDocId));
      setLiked(false);
      setLikeDocId(null);
    } else {
      // LIKE
      const newDoc = await addDoc(collection(db, "likes"), {
        userId,
        itemId,
        likedAt: new Date(),
      });
      setLiked(true);
      setLikeDocId(newDoc.id);
    }
  };

  return (
    <div
      onClick={toggleLike}
      style={{
        cursor: "pointer",
        fontSize: "24px",
        color: liked ? "red" : "#ccc",
        transition: "0.3s",
      }}
    >
      ♥
    </div>
  );
}
