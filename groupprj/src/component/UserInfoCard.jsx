import React from 'react'
import user from '../Data/user'


const UserInfoCard = () => {
  
  const currentUser = user[0]; // Replace with actual user data retrieval logic


  return (
    <div className="bg-red-500 text-yellow-200 text-4xl font-bold p-10 rounded-xl shadow-lg">
      <h1>This is user info</h1>
      <h1>
        User Info Card Component
        <img 
                src={currentUser.avatar} 
                alt="avatar" 
                className="w-32 rounded-full mt-4" 
            />

        <p>Username: {currentUser.username}</p>
            <p>Email: {currentUser.email}</p>
            <p>Joined: {currentUser.joined}</p>

      </h1>
      </div>
  )
}

export default UserInfoCard