import React, { useEffect, useState } from "react";
import UserInfoCard from "../component/UserInfoCard.jsx";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import BackToHome from "../component/BackToHome.jsx";

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
    <div className="min-h-screen bg-[var(--bg-soft)] flex flex-col items-center py-12 px-6 font-brand">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-[var(--primary)] tracking-wide mb-10">
        My Profile
      </h1>

      {/* Back Button */}
      <div className="self-start mb-8">
        <BackToHome />
      </div>

      {/* User Info */}
      {user && (
        <div className="w-full max-w-3xl flex justify-center mb-10">
          <UserInfoCard user={user} />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-6 mt-6 justify-center">
        <button
          className="px-6 py-3 bg-[var(--accent-btn)] text-[var(--primary)] font-semibold rounded-xl shadow hover:shadow-md transition"
          onClick={() => navigate("/likeit")}
        >
          ❤️ Favorites
        </button>

        <button
          className="px-6 py-3 bg-[var(--accent-btn)] text-[var(--primary)] font-semibold rounded-xl shadow hover:shadow-md transition"
          onClick={() => navigate("/additem")}
        >
          ➕ Add Item
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
