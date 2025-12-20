import React, { useEffect, useState } from "react";
import UserInfoCard from "../component/UserInfoCard.jsx";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  // save user data
  const [user, setUser] = useState(null);
  // save user ID
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Run when page loads: check if someone is logged in
  useEffect(() => {
    // This listens for login status changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // get user's document from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        // if user data exists, save it to state
        if (userSnap.exists()) {
          setUser(userSnap.data());
          setUserId(currentUser.uid);
        }
      }
    });

    // clean up the listener when leaving page
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-soft)] flex flex-col items-center py-12 px-6 font-brand">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-[var(--primary)] tracking-wide mb-10">
        My Profile
      </h1>

      {/* Show user info if user exists */}
      {user && (
        <div className="w-full max-w-3xl flex justify-center mb-10">
          <UserInfoCard user={user} />
        </div>
      )}

      {/* Buttons for user actions */}
      <div className="flex flex-wrap gap-6 mt-6 justify-center">
        {/* Go to favorites page */}
        <button
          className="px-6 py-3 bg-[var(--accent-btn)] text-[var(--primary)] font-semibold rounded-xl shadow hover:shadow-md transition"
          onClick={() => navigate("/likeit")}
        >
          ❤️ Favorites
        </button>

        {/* Go to add new item page */}
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
