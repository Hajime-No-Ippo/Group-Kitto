import React from 'react'
import "../style/productGallery.css"

const ProductGallery = ({images = []}) => {
  const limitedPics = images.slice(0, 9);

  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden 
                    max-w-sm mx-auto my-6 hover:shadow-lg transition duration-300">
        <div className="w-full flex justify-center items-center p-4 bg-gray-100">
        <div className= "text-gray-500 text-sm">
            {limitedPics.length === 0 ? (
                <p>No images available</p>
            ) : (
                limitedPics.map((ims, index) => (
                    <div key={index} className="gallery-item w-full max-w-[500px] h-[700px] flex justify-center items-center">
                        <img className="object-contain w-full h-full rounded-xl"
                        src={ims} alt={`Product Image ${index + 1}`} />
                    </div>
                ))
            )}
        </div>
        </div>
    </div>
  )
}

export default ProductGallery