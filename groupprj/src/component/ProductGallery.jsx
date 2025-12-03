import React, { useState, useRef, useEffect } from 'react';

const ProductGallery = ({ images = [] }) => {
  const limitedPics = images.slice(0, 1);
  const imgRef = useRef(null);
  
  const [isHover, setIsHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  // NEW: State to store the actual rendered size of the main image
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 }); 

const BOX_SIZE = 180;
const ZOOM_WINDOW_SIZE = 600; 
const MAGNIFICATION = ZOOM_WINDOW_SIZE / BOX_SIZE; 

// NEW: Use useEffect to capture the image's dimensions after it mounts/loads
useEffect(() => {
    if (imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        setImgSize({ width: rect.width, height: rect.height });
    }
}, [limitedPics]); // Re-run if images change

  const handleMove = (e) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    
    // 1. Robust position reading relative to the image element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const half = BOX_SIZE / 2;

    // 2. Clamping: Ensure the center of the magnifier box stays within the image bounds
    const clampedX = Math.min(Math.max(x, half), rect.width - half);
    const clampedY = Math.min(Math.max(y, half), rect.height - half);

    setPos({ x: clampedX, y: clampedY });
  };


  return (

<div className="flex gap-4 relative scale-[1]">

  <div className="relative flex w-full h-full rounded-2xl inset-0 overflow-hidden border border-2 border-brand "
     onMouseEnter={() => setIsHover(true)}
     onMouseLeave={() => setIsHover(false)}
     // onMouseMove removed from here to prevent inconsistent events
>
            {limitedPics.length === 0 ? (
                <p>No images available</p>
            ) : (
                <div className="w-full h-full">
                    <img
                        ref = {imgRef}
                        // pointer-events-none REMOVED for onMouseMove to work
                        className="block bg-white w-full h-full object-cover" 
                        src={limitedPics[0]}
                        alt={`Product Image 1`}
                        onMouseMove={handleMove} // Attached directly to the image
                    /> 
                </div>
            )}
    </div>
    </div>
  )
}
export default ProductGallery;