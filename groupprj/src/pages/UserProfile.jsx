import React, { useEffect, useState } from "react";
import UserInfoCard from "../component/UserInfoCard.jsx";
import LikeItList from "./LikeIt.jsx";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showLikes, setShowLikes] = useState(false);

  const navigate = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
          setUserId(currentUser.uid);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">My Profile</h1>

      <button
        className="self-start mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        onClick={() => navigate("/home")}
      >
        ← Back to Home
      </button>

      {user && (
        <div className="w-full max-w-4xl flex justify-center mb-6">
          <UserInfoCard user={user} />
        </div>
      )}

      {userId && (
        <button
          className="mb-6 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          onClick={() => setShowLikes(!showLikes)}
        >
          {showLikes ? "Hide Favorites" : "Show Favorites"}
        </button>
      )}

      {showLikes && userId && user && (
        <LikeItList userId={userId} username={user.username} />
      )}
    </div>
  );
};

export default UserProfile;
