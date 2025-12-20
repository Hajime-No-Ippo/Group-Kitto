import React, { useState, useRef, useEffect } from 'react';

const ProductGallery = ({ images = [] }) => {
  const limitedPics = images.slice(0, 1);

  return (

<div className="flex gap-4 relative scale-[1]">

  <div className="relative flex w-[680px] h-[520px] rounded-2xl inset-0 overflow-hidden border border-2 border-brand ">
            {limitedPics.length === 0 ? (
                <p>No images available</p>
            ) : (
                <div className="w-full h-full">
                    <img
                        className="block bg-white w-full h-full object-cover" 
                        src={limitedPics[0]}
                        alt={`Product Image 1`}
                        
                    /> 
                </div>
            )}
    </div>
    </div>
  )
}
export default ProductGallery;