import React from 'react'

const Toast = ({message}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="!border-[1px] !border-green-600 text-green-600 px-5 py-3 rounded-xl shadow-lg animate-slide">
        {message}
      </div>
    </div>
  );
}

export default Toast