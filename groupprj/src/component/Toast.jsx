import React from 'react'

const Toast = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="!border-[4px] !border-black text-black px-5 py-3 rounded-xl shadow-lg animate-slide">
        Item added to cart!
      </div>
    </div>
  );
}

export default Toast