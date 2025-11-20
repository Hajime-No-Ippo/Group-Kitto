import React from 'react'
import "../style/productGallery.css"


const ProductGallery = ({images = []}) => {
  const limitedPics = images.slice(0, 9);

  return (

  <div className="h-full rounded-2xl inset-0 overflow-hidden translate-x-[0px] shadow-md">
            {limitedPics.length === 0 ? (
                <p>No images available</p>
            ) : (
                limitedPics.map((ims, index) => (
                    <div key={index}>
                        <img
                        className="bg-white w-full h-full "
                        src={ims} 
                        alt={`Product Image ${index + 1}`} />
                    </div>
                ))
            )}
        </div>
        

  )
}

export default ProductGallery