import React, { useEffect, useState } from "react";
import UserInfoCard from "../component/UserInfoCard.jsx";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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

      {/* ------ New Buttons Area ------ */}
      <div className="flex gap-6 mt-6">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => navigate("/likeit")}
        >
          ⭐ Favorites
        </button>

        <button
          className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
          onClick={() => navigate("/chatbox")}
        >
          💬 Chatbox
        </button>

        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          onClick={() => navigate("/additem")}
        >
          ➕ Add Item
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
