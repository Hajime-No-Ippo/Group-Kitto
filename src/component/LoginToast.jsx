import React from 'react'

const LoginToast = ({message}) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999999]">
      <div className="bg-white text-green-600 font-bold px-5 py-3 rounded-xl shadow-lg animate-slide">
        {message}
      </div>
    </div>
  );
}

export default LoginToast