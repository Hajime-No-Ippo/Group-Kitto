import React from 'react'
import "../style/productGallery.css"


const ProductGallery = ({images = []}) => {
  const limitedPics = images.slice(0, 9);

  return (
 <div className="h-full ">
  <div className="absolute inset-0 overflow-hidden translate-x-[0px] shadow-md">
            {limitedPics.length === 0 ? (
                <p>No images available</p>
            ) : (
                limitedPics.map((ims, index) => (
                    <div key={index}>
                        <img
                        className="w-full h-full translate-y-[-100px] translate-x-[0px]"
                        src={ims} 
                        alt={`Product Image ${index + 1}`} />
                    </div>
                ))
            )}
        </div>
        
    </div>
  )
}

export default ProductGallery