import React from 'react'
import "../style/productGallery.css"

const ProductGallery = ({images = []}) => {
  const limitedPics = images.slice(0, 9);

  return (
    <div>
        <div className='gallery-container'>
            {limitedPics.length === 0 ? (
                <p>No images available</p>
            ) : (
                limitedPics.map((ims, index) => (
                    <div key={index} className='gallery-item'>
                        <img src={ims} alt={`Product Image ${index + 1}`} />
                    </div>
                ))
            )}
        </div>
    </div>
  )
}

export default ProductGallery