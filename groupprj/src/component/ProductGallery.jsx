import React, { useState, useRef } from 'react';
import "../style/productGallery.css"

const ProductGallery = ({ images = [] }) => {
  const limitedPics = images.slice(0, 9);
  const imgRef = useRef(null);
  
  
  const [isHover, setIsHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

const BOX_SIZE = 180;
const ZOOM_SIZE = 400;   // zoom window size
const ZOOM_SCALE = 2;    // magnification (2x or 3x)

  const handleMove = (e) => {
  if (!imgRef.current) return;

  const rect = imgRef.current.getBoundingClientRect();
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;

  const half = BOX_SIZE / 2;

  const clampedX = Math.min(Math.max(x, half), rect.width - half);
  const clampedY = Math.min(Math.max(y, half), rect.height - half);

  setPos({ x: clampedX, y: clampedY });
};


  return (

<div className="flex gap-4 relative scale-[1]">

  <div className="relative flex w-full h-full rounded-2xl inset-0 overflow-hidden border border-2 border-brand "
     onMouseEnter={() => setIsHover(true)}
     onMouseLeave={() => setIsHover(false)}
     onMouseMove={handleMove}
>
            {limitedPics.length === 0 ? (
                <p>No images available</p>
            ) : (
                limitedPics.map((ims, index) => (
                    <div key={index}>
                        <img
                        ref = {imgRef}
                        className="block bg-white w-full h-full object-cover pointer-events-none "
                        src={ims} 
                        alt={`Product Image ${index + 1}`}
                        /> 
                    </div>
                ))
            )}
    
    {/* YELLOW SQUARE FOLLOWING MOUSE */}
      {isHover && (
        <div
          className="pointer-events-none absolute border-2 border-yellow-500 bg-yellow-500/20 rounded-xl"
          style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
            left: pos.x - BOX_SIZE / 2,
            top: pos.y - BOX_SIZE / 2,
          }}
        />
        )}
    </div>
        {/* RIGHT: big square showing covered area */}
      {isHover && (
        <div
          className="
            absolute
            top-0
            left-[720px]  /* adjust if needed to fit layout */
            w-[400px]
            h-[400px]
            overflow-hidden
            rounded-2xl
            border-2
            border-brand
            bg-white
            shadow-lg
            z-20
          "
        >
        <img
      src={limitedPics[0]}
      className="pointer-events-none"
      style={{
        position: "absolute",
        width: `calc(100% * ${400 / BOX_SIZE})`,
        height: `calc(100% * ${400 / BOX_SIZE})`,
        left: -(pos.x - BOX_SIZE / 2) * (400 / BOX_SIZE),
        top:  -(pos.y - BOX_SIZE / 2) * (400 / BOX_SIZE),
        objectFit: "cover"
      }}
        />
        </div>
      )}
    </div>
    
    
    
        

  )
}
