import React from 'react'
import ProductGallery from './ProductGallery.jsx';

const ProductInfo = (props) => {
  const {product, addToCart} = props;
  if (!product) return <p>No product selected.</p>;

  return (
    <>
    <h2>ProductDetail:</h2>
      <div className="max-w-5xl mx-auto my-12 bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-6">
            <div key={product.id} className="w-full max-w-sm h-64 md:h-80 flex items-center justify-center">
              {/* LEFT: Product Image */}
              <ProductGallery images={product.img || [product.img]}/> 
            </div>
        </div>


            {/* RIGHT: PRODUCT DETAILS */}
            <div className="flex-1 p-10 space-y-6">
              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

              {/* RIGHT: Product Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

                {/* RIGHT: Product Details */}
              <div className="space-y-1 text-gray-800">
              <ul>
                <li className="font-semibold">Category: {product.category}</li>
                <li className="font-semibold">Price: ${product.price}</li> 
                <li className="font-semibold">Seller: {product.seller}</li>
                <li className="font-semibold">Condition: {product.condition}</li>
                <li className="font-semibold">Exchange For: {product.exchangeFor}</li>
              </ul>
              <button 
                className="bg-black text-white py-2 !px-5 rounded-xl text-lg font-medium shadow hover:bg-gray-900 transition"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
              </div>
            </div>
      </div>
      </>
  )
}

export default ProductInfo