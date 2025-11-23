import React from "react";

const UserInfoCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-gray-800 transition transform hover:scale-105 hover:shadow-2xl">
      <img
        src="/img/UserAvatar.jpg"
        alt="avatar"
        className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md"
      />

      <h2 className="mt-4 text-3xl font-extrabold">{user.username}</h2>

      <p className="mt-2 text-gray-600 text-lg">Email: {user.email}</p>

      <p className="mt-1 text-gray-500 text-sm">
        Joined: {user.joinedAt?.toDate().toLocaleDateString()}
      </p>
    </div>
  );
};

export default UserInfoCard;
